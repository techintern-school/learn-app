const { Command } = require('commander');
const yaml = require('js-yaml');
const fs = require('fs');
const ncp = require('ncp').ncp;
const shortid = require('shortid');
const child_process = require('child_process')
const path = require('path')
var md = require('markdown-it')();

const configPath = "./config.json"
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

ncp.limit = 16;

const program = new Command();
program.version('0.0.1');

const curicDirectory = `${__dirname}${config.cDirectory}`;
const projectsDirectory = `${curicDirectory}/${config.currentCurriculumVersion}`;
const templateDirectory = `${__dirname}${config.templateDirectory}/`;
const buildDirectory = `${__dirname}${config.buildDirectory}/`;
const frontendDirectory = path.join(__dirname, config.frontendDirectory)

// insert dynamic information into a YAML string
function processMacros(text, values = {}) {
    const { name, index } = values;
    if (name) {
        text = text.replace(/%%NAME%%/g, name)
    }
    if (typeof (index) !== undefined) {
        text = text.replace(/%%INDEX%%/g, index)
    }

    // replace all ID macros with unique short UUIDs
    text = text.replace(/%%ID%%/g, function () {
        return shortid.generate()
    });

    return text;

}

program.command('make-version')
    .alias('mv')
    .description('generate the next version of the curriculum')
    .action((name) => {
        //create new directory
        const curicPathBase = `${__dirname}${config.cDirectory}/`
        const currentCurriculumPath = `${curicPathBase}${currentCurriculumVersion}`
        const newCurriculumVersion = currentCurriculumVersion + 1
        const newCurriculumPath = `${curicPathBase}${newCurriculumVersion}`
        // make the new curriculum directory
        if (!fs.existsSync(newCurriculumPath)) {
            fs.mkdirSync(newCurriculumPath);
        }
        // copy existing curriculum as starting point
        if (fs.existsSync(currentCurriculumPath)) {

            ncp(currentCurriculumPath, newCurriculumPath, function (err) {
                if (err) {
                    return console.error(err);
                }
                console.log('done!');
            });
        }
        // write updated config to JSON sile
        fs.writeFileSync(configPath, JSON.stringify(Object.assign({}, config, { currentCurriculumVersion: newCurriculumVersion }), null, 4))
    });

program.command('make-project <name>')
    .alias('mp')
    .description('generate the next project with the specified name')
    .action((name) => {
        // TODO maybe enforce name uniqueness and check to make sure in file-friendly-format
        fs.readdir(projectsDirectory, (err, files) => {
            let nextProjectIndex;
            if (files.length) {
                // get indexes of current projects
                const currentProjects = files.map(fileName => fileName.split('-')[0])
                const lastProjectIndex = currentProjects.sort().reverse()[0]
                nextProjectIndex = parseInt(lastProjectIndex) + 1;
            } else {
                nextProjectIndex = 0
            }
            const newProjectFileName = `${nextProjectIndex}-${name}.yml`
            const newProjectPath = `${projectsDirectory}/${newProjectFileName}`
            const templateFile = `${templateDirectory}/project.yml`
            const template = fs.readFileSync(templateFile, 'utf8');
            const macrosReplacedTemplate = processMacros(template, { name, index: nextProjectIndex });

            fs.writeFileSync(newProjectPath, macrosReplacedTemplate);
        });
    });

program.command('make-section <type>')
    .alias('ms')
    .description('add a new section to a project')
    .option('-i, --index [index]', 'Index Number', undefined)
    .action((type, args) => {
        const { index } = args
        if (typeof (index) === undefined) {
            throw new Error('no project specified');
            return;
        }
        fs.readdir(projectsDirectory, (err, files) => {
            let projectPath = `${projectsDirectory}/${files[index]}`;
            const template = fs.readFileSync(`${templateDirectory}/${type}.yml`, 'utf8');
            fs.appendFileSync(projectPath, processMacros(template));
        });
    });

program.command('make-json')
    .alias('mj')
    .description('make a json of the curriculum')
    .action(() => {
        fs.readdir(curicDirectory, (err, versions) => {
            versions.forEach((v) => {
                versionDirectory = `${curicDirectory}/${v}`
                let curicVersion = {
                    version: v,
                    gitHash: child_process.execSync('git rev-parse HEAD').toString().trim(),
                    content: []
                }
                fs.readdir(versionDirectory, (err, files) => {
                    files.forEach((fileName) => {
                        const filePath = `${versionDirectory}/${fileName}`
                        const doc = yaml.safeLoad(fs.readFileSync(filePath, 'utf8'));
                        curicVersion.content.push(doc)
                    })
                    // remplace all paths to markdown with actual markdown
                    curicVersion.content = curicVersion.content.map(function (project) {
                        return {
                            ...project,
                            sections: project.sections.map(function (section) {
                                // section with no external markdown, return unchanged
                                if (!section.hasOwnProperty("path")) {
                                    return project
                                }
                                fileContents = fs.readFileSync(section.path, 'utf8')
                                // delete the path property, and create content with htmlified markdown
                                project.content = md.render(fileContents);
                                delete project.path

                                return project
                            })
                        }
                    })
                    const vJson = JSON.stringify(curicVersion);
                    // write to local directory
                    const filePart = `/se${v}.json`
                    buildPath = `${buildDirectory}${filePart}`

                    fs.writeFileSync(buildPath, vJson);
                    // also write to frontend directory
                    fePath = `${frontendDirectory}${filePart}`
                    fs.writeFileSync(fePath, vJson);
                })
            })
        })
    });

program.parse(process.argv);
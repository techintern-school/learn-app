const { Command } = require('commander');
var fs = require('fs');
var ncp = require('ncp').ncp;
const shortid = require('shortid');

const configPath = "./config.json"
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

const program = new Command();
program.version('0.0.1');

const projectsDirectory = `${__dirname}${config.cDirectory}/${config.currentCurriculumVersion}`;
const templateDirectory = `${__dirname}${config.templateDirectory}/`

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
            ncp.limit = 16;

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
                console.log(currentProjects)
                const lastProjectIndex = currentProjects.sort().reverse()[0]
                console.log(lastProjectIndex)
                nextProjectIndex = parseInt(lastProjectIndex) + 1;
            } else {
                nextProjectIndex = 0
            }
            const newProjectFileName = `${nextProjectIndex}-${name}.yml`
            const newProjectPath = `${projectsDirectory}/${newProjectFileName}`
            const templateFile = `${templateDirectory}/project.yml`
            const template = fs.readFileSync(templateFile, 'utf8');
            const macrosReplacedTemplate = template
                .replace('%%NAME%%', name)
                .replace('%%INDEX%%', nextProjectIndex)
                .replace('%%ID%%', shortid.generate())

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
            fs.appendFileSync(projectPath, template);
            /* 
              TODO add a new section
              - find the file based on the name or index
                  - fileNames.map(name => name.split('-')[1].split('.yml')[0])
                  - fileNames.map(name => name.split('-')[0]
              - append a new section to the file with the format of the specified type
            */
        });
    });

program.command('make-json')
    .alias('mj')
    .description('make a json of the curriculum')
    .action(() => {
        /* 
          TODO turn all of the curriculum versions into the JSON files needed by the frontend 
          - iterate over the version folders
          - iterate over the files
          - parse YAML into JS object
          - add JS object to output object
          - JSON.serialize the output object, and write to frontend directory
        */
    });

program.parse(process.argv);
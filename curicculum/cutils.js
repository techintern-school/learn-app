const { Command } = require('commander');
const program = new Command();
program.version('0.0.1');

// Change this when creating new version 
const currentCurriculumVersion = 1;

program
  .option('--no-sauce', 'Remove sauce')
  .option('--cheese <flavour>', 'cheese flavour', 'mozzarella')
  .option('--no-cheese', 'plain with no cheese')
  .parse(process.argv);

program.command('mp <name>')
.description('generate the next project with the specified name')
.action((name) => {
  /* 
    TODO generate new project 
    - Figure out how many files there are already in the currentCurriculiumVersion folder
    - Create a new file with the nane {index}-{name}.yml with default content
  */
});

program.command('ms <type')
.description('add a new section to a project')
.option('-i, --index [index]', 'Index Number')
.option('-n, --name [name]', 'Name')
.action((name) => {
  /* 
    TODO add a new section
    - find the file based on the name or index
        - fileNames.map(name => name.split('-')[1].split('.yml')[0])
        - fileNames.map(name => name.split('-')[0]
    - append a new section to the file with the format of the specified type
  */
});
 
program.command('mj ')
.description('make a json of the curriculum')
.action(() => {
  /* 
    TODO turn the curriculum of the currentCurriculiumVersion into the JSON file needed by the frontend 
    - iterate over the files
    - parse YAML into JS object
    - add JS object to output object
    - JSON.serialize the output object, and write to frontend directory
  */
});

program.parse(process.argv);
const { Command } = require('commander');
const readlineSync = require('readline-sync');
const fs = require('fs');
const homedir = require('os').homedir();

const program = new Command();
program.version('0.0.1');
const configFile = `${homedir}/.tisConfig.json`;

program.command('setup')
    .description('run this command to link your ti.s account to the command line application')
    .action(() => {
        userID = readlineSync.question('What is your user techIntern.school user ID? You should copy and paste this from the web application... ');
        githubID = readlineSync.question('What is your user github user name? You should copy and paste this from the github website... ');
        const config = {
            userID, githubID
        }
        fs.writeFileSync(configFile, JSON.stringify(config, null, 4))
    });

program.command('run')
    .description('run the program assocaited with the challenge in the current directory')
    .action(() => {
        // get the config file for the user from the configFile directory
        // get the config file for the challenge from the current directory 
          // TODO define schema - shell command to execute, ???
        // run the evaluation code 
        // submit update to server
    });



program.parse(process.argv);
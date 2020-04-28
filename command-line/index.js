#!/usr/bin/env node

const { Command } = require('commander');
const readlineSync = require('readline-sync');
const fs = require('fs');
const homedir = require('os').homedir();
const { execSync } = require('child_process');
const firebase = require("firebase/app");

require("firebase/firestore");

var firebaseConfig = {
    apiKey: "AIzaSyB-I5W47oNXCcaToXY2UIBnRZYSHV6PLEk",
    authDomain: "valiant-realm-274223.firebaseapp.com",
    databaseURL: "https://valiant-realm-274223.firebaseio.com",
    projectId: "valiant-realm-274223",
    storageBucket: "valiant-realm-274223.appspot.com",
    messagingSenderId: "937291685569",
    appId: "1:937291685569:web:b0d68b09c3c88ddae27e40",
    measurementId: "G-BG65RP0TJK"
};


// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firestore = firebase.firestore();

function updateDB(dbInfo, runInfo) {
    const { uid, challengeID, projectID } = dbInfo;
    return new Promise((resolve, reject) => {
        const projectDoc = firestore.collection("users").doc(uid).collection('projects').doc(projectID)
        projectDoc.get()
            .then((doc) => {
                const dbData = doc.data() || {};
                const previouslyCompleted = dbData.completedSections || []
                const completedSections = [...previouslyCompleted, challengeID]
                let challengeRuns = dbData.challengeRuns || {}
                if (!challengeRuns.hasOwnProperty(challengeID)) {
                    challengeRuns[challengeID] = []
                }
                challengeRuns[challengeID].push(runInfo)
                projectDoc.set({ completedSections, challengeRuns }, { merge: true })
                    .then(function () {
                        console.log("Document successfully written!");
                        resolve()
                    })
                    .catch(function (error) {
                        console.error("Error writing document: ", error);
                        reject()
                    });
            })
    });
}

const program = new Command();
program.version('0.0.1');
const userConfigFilePath = `${homedir}/.tisConfig.json`;

function getOutputString(output) {
    let str = 'no output';
    if (output && typeof output.toString === 'function' && output.toString().length > 0) {
        str = output.toString();
    }
    return str
}

program.command('setup')
    .description('run this command to link your ti.s account to the command line application')
    .action(() => {
        userID = readlineSync.question('What is your user techIntern.school user ID? You should copy and paste this from the web application... ');
        // TODO validate userID against DB
        githubID = readlineSync.question('What is your user github user name? You should copy and paste this from the github website... ');
        const config = {
            userID, githubID
        }
        fs.writeFileSync(userConfigFilePath, JSON.stringify(config, null, 4))
    });

program.command('run')
    .description('run the program associated with the challenge in the current directory')
    .action(() => {
        // get the config file for the user from the configFile directory
        let userConfigFile;
        try {
            userConfigFile = fs.readFileSync(userConfigFilePath, 'utf8')            
        } catch(e) {
            console.log(e)
            console.log('Oh no. There was an error reading .tisConfig.json with error the above error message:')
            if(typeof userConfigFile !== undefined) {
                console.log(' Have you run the setup command yet? If not, run: tis setup')
            }
            return
        }
        
        const userConfig = JSON.parse(userConfigFile)
        
        // get the config file for the challenge from the current directory 
        let challengeConfigFile;
        try {
            challengeConfigFile = fs.readFileSync(`${process.cwd()}/.tisC.json`, 'utf8')         
        } catch(e) {
            console.log(e)
            console.log('Oh no. There was an error reading .tisC.json with error the above error message:')
            if(typeof challengeConfigFile !== undefined) {
                console.log(' Are you running this command in a challenge directory?')
            }
            return
        }
        const challengeConfig = JSON.parse(challengeConfigFile);

        // run the evaluation code 
        let output;
        let error;
        try {
            output = execSync(challengeConfig.exec);
            console.log(getOutputString(output))
        } catch (e) {
            error = e;
            console.log(e)
        }

        // submit update to server
        const dbInfo = {
            uid: userConfig.userID,
            challengeID: challengeConfig.challengeID,
            projectID: challengeConfig.projectID
        }
        let runInfo = {
            ts: Date.now(), 

            output: getOutputString(output)
        }
        if (error === undefined) {
            // update completed sections
            // TODO enumerate these values somewhere
            runInfo.status = 1

        } else {
            // update challenge attempt
            runInfo.status = 0
            // TODO: is stack too much info to save to firestore? Is there a better place to store this?
            runInfo.error = error.message
        }
        updateDB(dbInfo, runInfo)
            .then(() => process.exit())
            .catch(() => process.exit())

    });




program.parse(process.argv);
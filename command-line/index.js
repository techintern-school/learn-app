const { Command } = require('commander');
const readlineSync = require('readline-sync');
const fs = require('fs');
const homedir = require('os').homedir();
const {execSync} = require('child_process');
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

function updateCompletedSections(uid, completedSection, projectID) {
    return new Promise((resolve, reject) => {
        const projectDoc = firestore.collection("users").doc(uid).collection('projects').doc(projectID)

        projectDoc.get()
            .then((doc) => {
                const previouslyCompleted = doc.data().completedSections || []        
                const completedSections = [...previouslyCompleted, completedSection]
                projectDoc.set({completedSections}, {merge: true})
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
    .description('run the program associated with the challenge in the current directory')
    .action(() => {
        // get the config file for the user from the configFile directory
        const userConfig = JSON.parse(fs.readFileSync(configFile, 'utf8'))
        // get the config file for the challenge from the current directory 
        // TODO define schema - shell command to execute, ???
        const challengeConfig = JSON.parse(fs.readFileSync(`${__dirname}/.tisP.json`, 'utf8'));

        // run the evaluation code 
        let output;
        let error;
        try {
            output = execSync(challengeConfig.exec);
        } catch(e) {
            error = e;
            console.log(e)
        }
        console.log(output && output.hasOwnProperty('toString') ? output.toString() : "")
        // submit update to server
        if (error === undefined) {
            // update completed sections
            updateCompletedSections(userConfig.userID, challengeConfig.challengeID, challengeConfig.projectID)
                .then(() => process.exit())
                .catch(() => process.exit())
        } else {
            // update challenge attempt

        }
        
    });




program.parse(process.argv);
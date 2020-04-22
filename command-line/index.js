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
                const dbData = doc.data()
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
        const challengeConfig = JSON.parse(fs.readFileSync(`${__dirname}/.tisP.json`, 'utf8'));

        // run the evaluation code 
        let output;
        let error;
        try {
            output = execSync(challengeConfig.exec);
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
            ts: Date.now()
        }
        if (error === undefined) {
            // update completed sections
            runInfo.status = 1
            if (output && output.hasOwnProperty('toString') && output.toString().length > 0) {
                runInfo.output = output.toString();
            }

        } else {
            // update challenge attempt
            runInfo.status = 0
            // TODO: is this too much info to save to firestore? Is there a better place to store this?
            runInfo.error = error
        }
        updateDB(dbInfo, runInfo)
            .then(() => process.exit())
            .catch(() => process.exit())

    });




program.parse(process.argv);
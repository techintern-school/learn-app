#!/usr/bin/env node

const { Command } = require("commander");
const readlineSync = require("readline-sync");
const fs = require("fs");
const homedir = require("os").homedir();
const { execSync } = require("child_process");
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
  measurementId: "G-BG65RP0TJK",
};

const CHALLENGE_INCOMPLETE = 0;
const CHALLENGE_COMPLETE = 1;

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firestore = firebase.firestore();

function updateDB(dbInfo, runInfo) {
  const { uid, challengeID, projectID } = dbInfo;
  return new Promise((resolve, reject) => {
    const projectDoc = firestore
      .collection("users")
      .doc(uid)
      .collection("projects")
      .doc(projectID);
    projectDoc.get().then((doc) => {
      const dbData = doc.data() || {};
      let completedSections = dbData.completedSections || [];
      if (runInfo.status === CHALLENGE_COMPLETE) {
        completedSections = [...completedSections, challengeID];
      }
      let challengeRuns = dbData.challengeRuns || {};
      if (!challengeRuns.hasOwnProperty(challengeID)) {
        challengeRuns[challengeID] = [];
      }
      challengeRuns[challengeID].push(runInfo);
      projectDoc
        .set({ completedSections, challengeRuns }, { merge: true })
        .then(function () {
          resolve();
        })
        .catch(function (error) {
          console.error("Error persisting document: ", error);
          reject();
        });
    });
  });
}

const program = new Command();
program.version("0.0.1");
const userConfigFilePath = `${homedir}/.tisConfig.json`;

function getOutputString(output) {
  let str = "";
  if (
    output &&
    typeof output.toString === "function" &&
    output.toString().length > 0
  ) {
    str = output.toString();
  }
  return str;
}

program
  .command("setup")
  .description(
    "run this command to link your ti.s account to the command line application"
  )
  .action(() => {
    userID = readlineSync.question(
      "What is your user techIntern.school user ID? You should copy and paste this from the web application... "
    );
    // TODO validate userID against DB
    githubID = readlineSync.question(
      "What is your user github user name? You should copy and paste this from the github website... "
    );
    const config = {
      userID,
      githubID,
    };
    fs.writeFileSync(userConfigFilePath, JSON.stringify(config, null, 4));
  });

program
  .command("run")
  .description(
    "run the program associated with the challenge in the current directory"
  )
  .action(() => {
    // get the config file for the user from the configFile directory
    let userConfigFile;
    try {
      userConfigFile = fs.readFileSync(userConfigFilePath, "utf8");
    } catch (e) {
      console.log(e);
      console.log(
        "Oh no. There was an error reading .tisConfig.json with error the above error message:"
      );
      if (typeof userConfigFile !== undefined) {
        console.log(
          " Have you run the setup command yet? If not, run: tis setup"
        );
      }
      return;
    }

    const userConfig = JSON.parse(userConfigFile);
    // add to global
    process.githubID = userConfig.githubID;

    // get the config file for the challenge from the current directory
    let challengeConfigFile;
    try {
      challengeConfigFile = fs.readFileSync(
        `${process.cwd()}/.tisC.json`,
        "utf8"
      );
    } catch (e) {
      console.log(e);
      console.log(
        "Oh no. There was an error reading .tisC.json with error the above error message:"
      );
      if (typeof challengeConfigFile !== undefined) {
        console.log(" Are you running this command in a challenge directory?");
      }
      return;
    }
    const challengeConfig = JSON.parse(challengeConfigFile);

    // run the evaluation code
    let output;
    let error;
    try {
      let execString = challengeConfig.exec;
      if (challengeConfig.hasOwnProperty("execArgs")) {
        argString = challengeConfig.execArgs.map((varName) => process[varName]);
        execString = `${execString} ${argString}`;
      }
      output = execSync(execString);
      outputString = getOutputString(output);
      if (outputString) {
        console.log(outputString);
      }
    } catch (e) {
      error = e;
      console.log(e);
    }

    // submit update to server
    const dbInfo = {
      uid: userConfig.userID,
      challengeID: challengeConfig.challengeID,
      projectID: challengeConfig.projectID,
    };
    let runInfo = {
      ts: Date.now(),

      output: outputString,
    };
    // check if the output string is COMPLETE
    if (outputString[0] === "C") {
      // update completed sections
      // TODO enumerate these values somewhere
      runInfo.status = CHALLENGE_COMPLETE;
    } else {
      // update challenge attempt
      runInfo.status = CHALLENGE_INCOMPLETE;
      // TODO: is stack too much info to save to firestore? Is there a better place to store this?
      if (error && error.message) {
        runInfo.error = error.message;
      }
    }
    updateDB(dbInfo, runInfo)
      .then(() => process.exit(0))
      .catch(() => process.exit(1));
  });

program.parse(process.argv);

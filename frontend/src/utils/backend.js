import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/analytics";
import { createFirestoreInstance } from "redux-firestore";
import { handleProjectCompleted } from "../redux/index.js";

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

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

// TODO create a better public API for this
export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const gProvider = new firebase.auth.GithubAuthProvider();

export function getRrfProps(store) {
  return {
    firebase,
    config: {
      userProfile: "users",
      useFirestoreForProfile: true,
    },
    dispatch: store.dispatch,
    createFirestoreInstance,
  };
}

export function updateCompletedSections(completedSections, projectID) {
  const user = auth.currentUser;
  const projectDoc = firestore
    .collection("users")
    .doc(user.uid)
    .collection("projects")
    .doc(projectID);
  projectDoc
    .set({ completedSections }, { merge: true })
    .then(function() {
      // console.log("Document successfully written!");
    })
    .catch(function(error) {
      console.error("Error writing document: ", error);
    });
}

export function updateUserData(data) {
  const user = auth.currentUser;
  if (user) {
    const userDoc = firestore.collection("users").doc(user.uid);
    userDoc
      .set({ ...data }, { merge: true })
      .then(function() {
        // console.log("Document successfully written!");
      })
      .catch(function(error) {
        console.error("Error writing document: ", error);
      });
  }
}

export function updateProjectsCompleted(projectIndex) {
  const user = auth.currentUser;
  const userDoc = firestore.collection("users").doc(user.uid);
  userDoc.get().then(function(doc) {
    const dbData = doc.data() || {};
    const completedProjects = dbData.completedProjects || [];
    userDoc
      .set(
        {
          completedProjects: handleProjectCompleted(
            projectIndex,
            completedProjects
          ),
        },
        { merge: true }
      )
      .then(function() {
        // console.log("Document successfully written!");
      })
      .catch(function(error) {
        console.error("Error writing document: ", error);
      });
  });
}

export function handleLoginFromRefresh(setUser) {
  auth.onAuthStateChanged(function(user) {
    if (user) {
      setUser(user);
    }
  });
}

export function setActiveProjectFromDB(setActiveProject) {
  const user = auth.currentUser;
  if (user) {
    firestore
      .collection("users")
      .doc(user.uid)
      .get()
      .then(function(doc) {
        // if the user already had an active project, set it
        if (doc.exists) {
          const activeProject = doc.data().activeProject;
          if (activeProject) {
            setActiveProject(activeProject);
            return;
          }
        }
        // if down here, no active project for this user, set to the first project
        updateUserData({
          activeProject: 0,
          // TODO: don't hardcode this, will break on next curic version
          activeProjectID: "M_42tuQZ5",
        });
      })
      .catch(function(error) {
        console.log("Error getting document:", error);
      });
  }
}

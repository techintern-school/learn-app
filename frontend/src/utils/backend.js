import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/analytics";

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
firebase.analytics();

// TODO create a better public API for this
export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const gProvider = new firebase.auth.GoogleAuthProvider();

export function updateUserData(data) {
    const user = auth.currentUser
    if (user) {
        firestore.collection("users").doc(user.uid).set(data, { merge: true })
        .then(function() {
            console.log("Document successfully written!");
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });
    }
    

}

export function handleLoginFromRefresh(setUser, setActiveProject) {
    auth.onAuthStateChanged(function (user) {
        console.log('auth state changed')
        if (user) {
            console.log('got user')
            setUser(user);
            setActiveProjectFromDB(setActiveProject)
        }
    });
}

export function setActiveProjectFromDB(setActiveProject) {
    const user = auth.currentUser
    if (user) {
        firestore.collection("users").doc(user.uid).get().then(function(doc) {
            if (doc.exists) {
                const activeProject = doc.data().activeProject
                if (activeProject) {
                    setActiveProject(activeProject)
                }
                console.log("Document data:", doc.data());
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });
    }
}
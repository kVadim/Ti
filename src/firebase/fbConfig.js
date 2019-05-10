import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

// Initialize Firebase
var config = {
  apiKey: "AIzaSyBNmslbkuFJDr78zGfhrVgFKkJ4oBpX30g",
  authDomain: "ppro-71a44.firebaseapp.com",
  databaseURL: "https://ppro-71a44.firebaseio.com",
  projectId: "ppro-71a44",
  storageBucket: "ppro-71a44.appspot.com",
  messagingSenderId: "909420255714"
};
firebase.initializeApp(config);
firebase.firestore().settings({});

export default firebase;

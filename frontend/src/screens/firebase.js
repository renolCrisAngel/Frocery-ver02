import firebase from 'firebase';
  
const firebaseConfig = {
    apiKey: "AIzaSyAc5eHTykj1DLkMD1aZjywJh3iEl5-Snv4",
    authDomain: "react-firebase-auth-1d15b.firebaseapp.com",
    projectId: "react-firebase-auth-1d15b",
    storageBucket: "react-firebase-auth-1d15b.appspot.com",
    messagingSenderId: "671020951818",
    appId: "1:671020951818:web:d7c5e2902da982279232f3",
    measurementId: "G-Z3FHWZ5W7J"
  };

  firebase.initializeApp(firebaseConfig);
  var auth = firebase.auth();
  export default auth;
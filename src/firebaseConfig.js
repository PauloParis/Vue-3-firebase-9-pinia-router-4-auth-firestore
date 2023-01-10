// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth"
import { getFirestore } from 'firebase/firestore/lite'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyChRD23pLtHVFYEAGT00GOaiIOmXAi2h64",
  authDomain: "vue-firebase-1-55fe3.firebaseapp.com",
  projectId: "vue-firebase-1-55fe3",
  storageBucket: "vue-firebase-1-55fe3.appspot.com",
  messagingSenderId: "789372192806",
  appId: "1:789372192806:web:5cdd5627dd16d948963ee7"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
initializeApp(firebaseConfig);

const auth = getAuth();
const db = getFirestore();

export { auth, db };
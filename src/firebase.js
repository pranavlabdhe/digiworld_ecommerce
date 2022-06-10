import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { initializeApp } from "firebase/app";
// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBzjS7oL-1aiuMynCKPjf08FvNgFyJ_B84",
  authDomain: "ecommerce-6ee37.firebaseapp.com",
  projectId: "ecommerce-6ee37",
  storageBucket: "ecommerce-6ee37.appspot.com",
  messagingSenderId: "1013985526936",
  appId: "1:1013985526936:web:d6a01bf81539d8dbaebced"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig)
export const auth = firebase.auth()
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

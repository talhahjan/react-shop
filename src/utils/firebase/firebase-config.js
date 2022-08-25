// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCjyXdNcn57q82cMvFQEPuqUWTa2QRCkKk",
  authDomain: "tj-shoes-3a98f.firebaseapp.com",
  projectId: "tj-shoes-3a98f",
  storageBucket: "tj-shoes-3a98f.appspot.com",
  messagingSenderId: "118504270071",
  appId: "1:118504270071:web:6528fbd3b5f257528f4bf2",
  measurementId: "G-HLYGBXBL09",
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebase);
export const auth = getAuth(firebase);
export default firebase;

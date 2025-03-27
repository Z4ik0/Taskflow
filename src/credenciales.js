// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDapflwDEURzao875g3HhsQlInFDRGmD5E",
    authDomain: "proyecto-login-f33b8.firebaseapp.com",
    projectId: "proyecto-login-f33b8",
    storageBucket: "proyecto-login-f33b8.firebasestorage.app",
    messagingSenderId: "210371562939",
    appId: "1:210371562939:web:ee9a5956ef028018d9889e"
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);
export default appFirebase;
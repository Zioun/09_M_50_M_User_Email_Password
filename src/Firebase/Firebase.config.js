// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAETR6KFMHMRhmR6C_DNApRtGSMSaEriFM",
  authDomain: "user-email-password-bd34f.firebaseapp.com",
  projectId: "user-email-password-bd34f",
  storageBucket: "user-email-password-bd34f.appspot.com",
  messagingSenderId: "1050971341281",
  appId: "1:1050971341281:web:70c5fe54bcdc2fc31b52a0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBE2h-kAZ3L1hkp8LO5iuHljCOFgrcrWa4",
  authDomain: "assignment-12-46c15.firebaseapp.com",
  projectId: "assignment-12-46c15",
  storageBucket: "assignment-12-46c15.appspot.com",
  messagingSenderId: "645061593323",
  appId: "1:645061593323:web:217faabfaafdd3aaabd6ae"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;
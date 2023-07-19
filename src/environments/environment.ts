// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyCr2RfbElylyGp60sP4DmohphahFHBrZz8",
  authDomain: "chevron-850fc.firebaseapp.com",
  projectId: "chevron-850fc",
  storageBucket: "chevron-850fc.appspot.com",
  messagingSenderId: "316448141678",
  appId: "1:316448141678:web:f4fed998fda58682b3117f",
  measurementId: "G-9XHQTYXG38"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
export const db = getFirestore(app);
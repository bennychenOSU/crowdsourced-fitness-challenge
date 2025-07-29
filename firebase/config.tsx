// Import the functions you need from the SDKs you need
//import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCqsa_VaK3ALAgQZ9D-mOyD3AMlf0MBZ7c",
  authDomain: "crowdsourced-fitness-app.firebaseapp.com",
  projectId: "crowdsourced-fitness-app",
  storageBucket: "crowdsourced-fitness-app.firebasestorage.app",
  messagingSenderId: "358666016823",
  appId: "1:358666016823:web:75697abaa25447b488c7b2",
  measurementId: "G-HD18PMBDX4"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);
//export const storage = getStorage(app);
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCy5zKHMaoPUd6jkOPklfuNPNehSHlieXo",
  authDomain: "prepvoyage-822ed.firebaseapp.com",
  projectId: "prepvoyage-822ed",
  storageBucket: "prepvoyage-822ed.firebasestorage.app",
  messagingSenderId: "648307130331",
  appId: "1:648307130331:web:df8c922d9acd5c43a271fe",
  measurementId: "G-PVGN709JX8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;
const db = getFirestore(app);
export { db };
const analytics = getAnalytics(app);
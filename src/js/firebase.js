import { getFirestore } from 'firebase/firestore';
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBu9IAokz1HrCsFPGUn5Qv8vNP1oIGdkYA",
  authDomain: "jobssoftware-422f2.firebaseapp.com",
  projectId: "jobssoftware-422f2",
  storageBucket: "jobssoftware-422f2.appspot.com",
  messagingSenderId: "331500450148",
  appId: "1:331500450148:web:c3045a9d9b824d5c248a71",
  measurementId: "G-PNWP488TQY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };

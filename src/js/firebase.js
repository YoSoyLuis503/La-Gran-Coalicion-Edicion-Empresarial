// firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCytyHGxXG5P-H18Yb9kEIZTBeNwIpyAUg",
  authDomain: "jobs-b7d7c.firebaseapp.com",
  projectId: "jobs-b7d7c",
  storageBucket: "jobs-b7d7c.appspot.com",
  messagingSenderId: "800624290227",
  appId: "1:800624290227:web:b3038a722182c15cae83c6",
  measurementId: "G-3VNNR56W20"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };

import { FirebaseApp, initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAnalytics, Analytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBQc26ASi1dJ9h2Qj4hWxWBm3VejSXlISg",
  authDomain: "realtime-game-919ea.firebaseapp.com",
  databaseURL: "https://realtime-game-919ea-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "realtime-game-919ea",
  storageBucket: "realtime-game-919ea.firebasestorage.app",
  messagingSenderId: "415321006943",
  appId: "1:415321006943:web:a791bb6f6d8e47e2008cea",
  measurementId: "G-JZ5M0K9TJB",
};

const app: FirebaseApp = initializeApp(firebaseConfig);
const db = getDatabase(app);
const analytics: Analytics = getAnalytics(app);

export { app, db, analytics };

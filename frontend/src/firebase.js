import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  // apiKey: "AIzaSyAsNdI6xo28b7XNp5erEc48cj73rFGl4G0",
  // authDomain: "laostudenthcm.firebaseapp.com",
  // projectId: "laostudenthcm",
  // storageBucket: "laostudenthcm.appspot.com",
  // messagingSenderId: "1013404307147",
  // appId: "1:1013404307147:web:d0583168ac2da1bd8ad54e"
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth();

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAsNdI6xo28b7XNp5erEc48cj73rFGl4G0",
  authDomain: "laostudenthcm.firebaseapp.com",
  projectId: "laostudenthcm",
  storageBucket: "laostudenthcm.appspot.com",
  messagingSenderId: "1013404307147",
  appId: "1:1013404307147:web:d0583168ac2da1bd8ad54e"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth();
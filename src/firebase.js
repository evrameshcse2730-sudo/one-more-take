
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD9_nDByi7McREEDhGoUsc_YvV1tl4EPD8",
  authDomain: "one-more-take.firebaseapp.com",
  projectId: "one-more-take",
  storageBucket: "one-more-take.firebasestorage.app",
  messagingSenderId: "664969058673",
  appId: "1:664969058673:web:f859e0420c81f5b7f23ed0",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

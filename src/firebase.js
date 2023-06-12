import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB_D6_ZCtmtVYAuk8vdSSjtgmOq63Ml_dQ",
  authDomain: "diaspora-a4737.firebaseapp.com",
  projectId: "diaspora-a4737",
  storageBucket: "diaspora-a4737.appspot.com",
  messagingSenderId: "850070714847",
  appId: "1:850070714847:web:21498c419007d5cd6e6c6a",
  measurementId: "G-T15M992DKG"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
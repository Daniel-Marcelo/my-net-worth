import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebase = initializeApp({
  apiKey: "AIzaSyA3yFNfYzc43jEg0coAdW8aFN3wqBbCstA",
  authDomain: "my-net-worth-74297.firebaseapp.com",
  projectId: "my-net-worth-74297",
  storageBucket: "my-net-worth-74297.appspot.com",
  messagingSenderId: "645211709733",
  appId: "1:645211709733:web:cba05ed048f6d9f267bacc",
  measurementId: "G-ZW7S39KRD7",
});

export const db = getFirestore(firebase);

export const auth = getAuth(firebase);

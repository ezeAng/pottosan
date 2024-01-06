// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAm7Gmx-8HvX385OD6q6lHJ3kwdvJNkEd0",
  authDomain: "pottosan-backend.firebaseapp.com",
  databaseURL: "https://pottosan-backend-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "pottosan-backend",
  storageBucket: "pottosan-backend.appspot.com",
  messagingSenderId: "288857306620",
  appId: "1:288857306620:web:a0eaf2f3e3eb351351ee79",
  measurementId: "G-K7EYVBYEC1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export const db = getDatabase(app);
export const FIREBASE_AUTH = getAuth(app);
export const FIREBASE_STORE = getFirestore(app);

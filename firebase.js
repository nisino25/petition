
// -----------------
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

// import { getAuth } from 'firebase/compat/auth'


import "firebase/compat/auth";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional


const firebaseConfig = {
  apiKey: "AIzaSyAjlXiuVnHmtL8FovKHShvKbXyBz0ypXcc",
  authDomain: "slack-pet.firebaseapp.com",
  projectId: "slack-pet",
  storageBucket: "slack-pet.appspot.com",
  messagingSenderId: "821551395039",
  appId: "1:821551395039:web:a18ce95c1ef68670f1b96a",
  measurementId: "G-G7QVXQ79BK"
};
 
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
export default db;

// const auth = getAuth()

// export { auth }
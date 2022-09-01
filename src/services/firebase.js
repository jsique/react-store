// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth , setPersistence, browserLocalPersistence} from 'firebase/auth'
import { getFirestore } from "firebase/firestore";
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBuCq2J1kMS_MRg0DOh-2tlw2cI2W0LPiQ",
  authDomain: "ejemplo-http-ddfce.firebaseapp.com",
  databaseURL: "https://ejemplo-http-ddfce-default-rtdb.firebaseio.com",
  projectId: "ejemplo-http-ddfce",
  storageBucket: "ejemplo-http-ddfce.appspot.com",
  messagingSenderId: "663237840142",
  appId: "1:663237840142:web:3f32ae9f82900195719b5f",
  measurementId: "G-F5871LJX11"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore();
setPersistence(auth, browserLocalPersistence);
//const analytics = getAnalytics(app);
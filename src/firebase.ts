import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDzkjflyPX2dyj_ec9_vBCH0R72yhfUkUQ",
  authDomain: "mulitipledetermination.firebaseapp.com",
  projectId: "mulitipledetermination",
  storageBucket: "mulitipledetermination.appspot.com",
  messagingSenderId: "1026980169932",
  appId: "1:1026980169932:web:32d4f470f500033fb89a69"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {app, db}
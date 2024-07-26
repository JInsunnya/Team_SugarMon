// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBtcbXXa8XmZK1wClxO717vI4iW5igUfGI",
  authDomain: "sugarmon-d3820.firebaseapp.com",
  projectId: "sugarmon-d3820",
  storageBucket: "sugarmon-d3820.appspot.com",
  messagingSenderId: "1000603980238",
  appId: "1:1000603980238:web:453ce0a3cbeab5bf319b9f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
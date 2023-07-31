// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAa-BGs8sRydaZBlTtz-2WjxbPK5yfg8CI",
  authDomain: "capstone-project-e1401.firebaseapp.com",
  projectId: "capstone-project-e1401",
  storageBucket: "capstone-project-e1401.appspot.com",
  messagingSenderId: "1054070551444",
  appId: "1:1054070551444:web:72136fbf56e5b66e7e5581"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
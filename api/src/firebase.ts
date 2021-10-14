import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import * as admin from "firebase-admin";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDr1eu1rM33xz0Jq3AcO7j-mPOlA7YMuTg",
  authDomain: "qtma-94a76.firebaseapp.com",
  projectId: "qtma-94a76",
  storageBucket: "qtma-94a76.appspot.com",
  messagingSenderId: "503941208323",
  appId: "1:503941208323:web:a3cc2e22cadf36e0ec7136",
  measurementId: "G-PWJZFSZFLF",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth();

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
});

// idToken comes from the client app
const idToken = "12312312321";
admin
  .auth()
  .verifyIdToken(idToken)
  .then((decodedToken) => {
    const uid = decodedToken.uid;
    // ...
  })
  .catch((error) => {
    // Handle error
  });

import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDolSjugFljixoR7aZMMqJsTKQhIRLH62A",
    authDomain: "yuchi-petfinder-app.firebaseapp.com",
    projectId: "yuchi-petfinder-app",
    storageBucket: "yuchi-petfinder-app.appspot.com",
    messagingSenderId: "844879274952",
    appId: "1:844879274952:web:66d595186ecd2e7f8a16fd",
    measurementId: "G-YYE306NEX4"
  };
  
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export const signInWithGoogle = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      const name = result.user.displayName;
      const email = result.user.email;
      const profilePic = result.user.photoURL;

      localStorage.setItem("name", name);
      localStorage.setItem("email", email);
      localStorage.setItem("profilePic", profilePic);
    })
    .catch((error) => {
      console.log(error);
    });
};
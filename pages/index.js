import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup, onAuthStateChanged, signOut } from "firebase/auth";


import { useEffect } from 'react';
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDbL1UTVRXW-u9mFazIwtHP1iedNmNOf8M",
  authDomain: "mdia-week9.firebaseapp.com",
  projectId: "mdia-week9",
  storageBucket: "mdia-week9.appspot.com",
  messagingSenderId: "628865134395",
  appId: "1:628865134395:web:cda264beddd811e50a911e",
  // measurementId: "G-80NLL75K4M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);


export default function Home() {

  useEffect(()=>{
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
        if (user) {
          console.log("signed in", user);
        } else {
          console.log("Not signed in")
        }
      })
  }, []);
    

  const SignInGoogle = async() => {
    //get Google's authentication server
    const provider = new GoogleAuthProvider();
    //get Firebase's authentication server
    const auth = getAuth();

    const result = await signInWithPopup(auth, provider); //if u r signed in properly, it will let you through firebase
    console.log(result);
  }

  const SignOutFire = async()=>{
    const auth = getAuth();
    await signOut(auth);
  }

  return (
    <div className={styles.container}>
      <button onClick={SignInGoogle}>Sign in with Google</button>
      <button onClick={SignOutFire}>Sign out</button>
    </div>
  )
}

import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

import { useState } from 'react';

export default function Home() {
  const [em, setEm] = useState("");
  const [ps, setPs] = useState("");
  const Upload = async(e)=>{
    console.log(e.target.files[0]);
    if(e.target.files.length <=0){
      alert("no files were selected");
      return false;
    }
    const file = e.target.files[0];
    const storage = getStorage();
    const storageRef = ref(storage, 'test.jpg');

    // 'file' comes from the Blob or File API
    const snapshot = await uploadBytes(storageRef, file);
    console.log("uploaded");
  }

  const CreateUser = async()=>{
    const auth = getAuth();
    const result = await createUserWithEmailAndPassword(auth, em, ps);
    alert("created!");
  }

  const SignIn = async()=>{
    const auth = getAuth();
    const result = await signInWithEmailAndPassword(auth, em, ps);
    alert("Signed In!");
  }

  return(
    <div className={styles.container}>
      <input type='text' placeholder='email' onChange={(e)=>setEm(e.target.value)} />
      <input type='password' placeholder='password' onChange={(e)=>setPs(e.target.value)} />
      <button onClick={SignIn}>Sign In</button>
      <button onClick={CreateUser}>Create Account</button>
      <input type='file' onChange={Upload}/>
    </div>
  )
}
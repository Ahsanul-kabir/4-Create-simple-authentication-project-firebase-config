import logo from './logo.svg';
import './App.css';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { useState } from 'react';

firebase.initializeApp(firebaseConfig);

function App() {
  const [user, setUser] = useState({
    isSignIn: false,
    name: '',
    email: '',
    photo: ''
  })
  const provider = new firebase.auth.GoogleAuthProvider();
  const handleSignIn = () => {
    firebase.auth().signInWithPopup(provider)
      .then(res => {
        // console.log(res);
        const { displayName, photoURL, email } = res.user;
        // console.log(displayName,email,photoURL);
        const signInUser = {
          isSignIn: true,
          name: displayName,
          email: email,
          photo: photoURL
        }
        setUser(signInUser)
        // console.log(displayName,email,photoURL);
      })
      .catch(err => {
        console.log(err);
        console.log(err.message);
      })
  }

  const handleSignOut = () => {
      firebase.auth().signOut()
      .then(res => {
        const signOutUser = {
          isSignIn:'',
          name:'',
          photo:'',
          email:''
        }
        setUser(signOutUser);
        // console.log(res);
      })
      .catch( err =>{
        console.log(err);
        console.log(err.message);
      })
  }
  return (
    <div className="App">
      {
        user.isSignIn ? <button onClick={handleSignOut}>Sign Out</button> :
        <button onClick={handleSignIn}>Sign in</button>
      }
      {
        user.isSignIn && <div>
          <p>Welcome, {user.name}</p>
          <p>Your email: {user.email}</p>
          <img src={user.photo} alt=""/>
        </div>
      }
    </div>
  );
}

export default App;

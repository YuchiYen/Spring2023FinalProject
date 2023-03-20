import './App.css';
import React from 'react';
import SampleLayout from './SampleLayout';
import { signInWithGoogle } from "./firebase";

const App = () => {

  return (

    <div className="App">
      
      <div>
<button className="login-with-google-btn" onClick={signInWithGoogle}>
    Sign in with Google
  </button>
  <h1>{localStorage.getItem("name")}</h1>
  <h1>{localStorage.getItem("email")}</h1>
  <img src={localStorage.getItem("profilePic")} />
</div>


      
        <SampleLayout></SampleLayout>
      
    </div>
  );
}

export default App;

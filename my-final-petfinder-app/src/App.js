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
        <div style={{ float: "right" }}>{localStorage.getItem("name")}<br />
          {localStorage.getItem("email")}
          {/* <img src={localStorage.getItem("profilePic")} /> */}
        </div>
      </div>

      <SampleLayout></SampleLayout>

    </div>
  );
}

export default App;

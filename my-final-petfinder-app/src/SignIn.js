import React from 'react';
import { auth } from './firebase';

const SignIn = () => {
  const handleSignIn = async () => {
    var provider = new auth.GoogleAuthProvider();
    try {
      await auth.signInWithPopup(provider);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <button onClick={handleSignIn}>Sign In with Google</button>
  );
};

export default SignIn;
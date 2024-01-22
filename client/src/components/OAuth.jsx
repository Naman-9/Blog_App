import React from 'react'
import {Button} from 'flowbite-react';
import { AiFillGoogleCircle } from 'react-icons/ai';
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { app } from '../firebase';
import { useDispatch, useSelector } from 'react-redux';
import { signInFailure, signInSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';

export default function OAuth() {

  const disptach = useDispatch();
  const navigate = useNavigate();

  const auth = getAuth(app);
  const handleGoogleClock = async ()=> {
    const provider = new GoogleAuthProvider()
    provider.getCustomParameters({prompt: 'select_account'})
    try {
      const resultFromGoogle = await signInWithPopup(auth, provider)
      const res = await fetch('/api/auth/google', {
        method: 'POST',
        headers: { 'content-Type': 'application/json'},
        body: JSON.stringify({
          name: resultFromGoogle.user.displayName,
          email: resultFromGoogle.user.email,
          googlePhotoUrl: resultFromGoogle.user.photoURL,
        }),
      })
      
      const data = await res.json();

      if(res.ok) {
        disptach(signInSuccess(data));
        return navigate('/');
      }

      return disptach(signInFailure("Error: Try Again."))

    } catch (error) {   
      disptach(signInFailure(error));
    }
  }

  return (
    <Button type='button' gradientDuoTone='pinkToOrange' outline onClick={handleGoogleClock}>
      <AiFillGoogleCircle className='w-6 h-6 mr-2' />
      Contine with Google
    </Button>
  )
}


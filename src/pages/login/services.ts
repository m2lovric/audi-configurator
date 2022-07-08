import React from 'react';
import { auth } from '@/../modules/firebase';
import { userStateAtom } from '@/../modules/state';
import {
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { atom, useRecoilState } from 'recoil';
import { userDataAtom } from './userData';

const provider = new GoogleAuthProvider();
const [userState, setUserState] = useRecoilState(userStateAtom);
const [userData, setUserData] = useRecoilState(userDataAtom);
const navigate = useNavigate();

export const handleSignWithGoogle = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const user = result.user;
      setUserState(true);
      navigate('/');
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
    });
};

export const handleSubmit = () => {
  signInWithEmailAndPassword(auth, userData.email, userData.password)
    .then((res) => {
      setUserData({ email: '', password: '' });
      setUserState(true);
      navigate('/');
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(error);
    });
};

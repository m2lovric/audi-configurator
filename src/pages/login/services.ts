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

const useHandleLogin = () => {
  const provider = new GoogleAuthProvider();
  const [userState, setUserState] = useRecoilState(userStateAtom);
  const [userData, setUserData] = useRecoilState(userDataAtom);
  const navigate = useNavigate();

  const handleSignWithGoogle = () => {
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

  const handleSubmit = () => {
    console.log(userData.email, userData.password);
    signInWithEmailAndPassword(auth, userData.email, userData.password)
      .then((res) => {
        console.log('signin ', res);
        setUserState(true);
        setUserData({ email: '', password: '' });
        navigate('/');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error);
      });
  };

  return [handleSignWithGoogle, handleSubmit];
};

export default useHandleLogin;

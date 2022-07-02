import React, { useEffect, useState } from 'react';
import { Layout } from '@/components';
import './login.scss';
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';
import { auth } from 'modules/firebase';
import { userStateAtom } from 'modules/state/atoms';
import { useRecoilState, useRecoilValue } from 'recoil';
import { Link, useNavigate } from 'react-router-dom';
import googleImg from '@/assets/btn_google_signin_light_normal_web.png';

const Login = () => {
  const [data, setData] = useState({ email: '', password: '' });
  const [userState, setUserState] = useRecoilState(userStateAtom);
  const user = useRecoilValue(userStateAtom);
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();

  useEffect(() => {
    user && navigate('/');
  }, [user]);

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
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((res) => {
        setData({ email: '', password: '' });
        setUserState(true);
        navigate('/');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error);
      });
  };

  return (
    <Layout>
      <section className='login'>
        <section className='login__form'>
          <h1 className='register__title'>
            AUDI <span>CONFIGURATOR</span>
          </h1>

          <label htmlFor='email' className='input-label'>
            Email
          </label>
          <input
            className='input-lg'
            type='text'
            name='email'
            placeholder='Email'
            onChange={(e) => setData({ ...data, email: e.target.value })}
            value={data.email}
          />

          <label htmlFor='name' className='input-label'>
            Password
          </label>
          <input
            className='input-lg'
            type='password'
            name='password'
            placeholder='Password'
            onChange={(e) => setData({ ...data, password: e.target.value })}
            value={data.password}
          />
          <button className='btn-primary-lg' onClick={() => handleSubmit()}>
            Login
          </button>
          <section className='login__or'>
            <article className='line'></article>
            <p>or</p>
            <article className='line'></article>
          </section>
          <section
            className='login__google'
            onClick={() => handleSignWithGoogle()}
          >
            <img src={googleImg} alt='google' />
          </section>
          <br />
          <Link to={'/register'} className='btn-white'>
            Create Account
          </Link>
        </section>
      </section>
    </Layout>
  );
};

export default Login;

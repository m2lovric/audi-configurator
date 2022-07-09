import React, { useEffect } from 'react';
import { Layout } from '@/components';
import './login.scss';
import { userStateAtom } from 'modules/state/index';
import { useRecoilState, useRecoilValue } from 'recoil';
import { Link, useNavigate } from 'react-router-dom';
import googleImg from '@/assets/btn_google_signin_light_normal_web.png';
import useHandleLogin from './services';
import { userDataAtom } from './userData';

const Login = () => {
  const [data, setData] = useRecoilState(userDataAtom);
  const userState = useRecoilValue(userStateAtom);
  const navigate = useNavigate();
  const [handleSignWithGoogle, handleSubmit] = useHandleLogin();

  useEffect(() => {
    userState && navigate('/');
  }, [userState]);

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
          <button className='btn-primary-lg' onClick={handleSubmit}>
            Login
          </button>
          <section className='login__or'>
            <article className='line'></article>
            <p>or</p>
            <article className='line'></article>
          </section>
          <section className='login__google' onClick={handleSignWithGoogle}>
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

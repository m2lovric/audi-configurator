import React, { useState } from 'react';
import { Layout } from '../../components';
import './login.scss';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../modules/firebase';
import { userStateAtom } from '../../../modules/state/atoms';
import { useRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [data, setData] = useState({ email: '', password: '' });
  const [userState, setUserState] = useRecoilState(userStateAtom);
  const navigate = useNavigate();

  const handleSubmit = () => {
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((res) => {
        setData({ email: '', password: '' });
        console.log(res.user);
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
        </section>
      </section>
    </Layout>
  );
};

export default Login;

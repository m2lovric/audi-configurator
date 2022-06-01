import React, { useState } from 'react';
import { Layout } from '../../components';
import './login.scss';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../modules/firebase';

const Login = () => {
  const [data, setData] = useState({ email: '', password: '' });

  const handleSubmit = () => {
    console.log('click');
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((res) => {
        setData({ email: '', password: '' });
        console.log(res.user);
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

import React, { useState } from 'react';
import { Layout } from '../../components';
import './style.scss';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../../../modules/firebase';

const Register = () => {
  const [data, setData] = useState({ name: '', email: '', password: '' });

  const handleSubmit = () => {
    console.log('click');
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((res) => {
        const user = res.user;
        updateProfile(user, { displayName: data.name });
        setData({ name: '', email: '', password: '' });
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error);
      });
  };

  return (
    <Layout>
      <section className='register'>
        <section className='register__form'>
          <label htmlFor='name' className='input-label'>
            Name
          </label>
          <input
            className='input-lg'
            type='text'
            name='name'
            placeholder='Name'
            onChange={(e) => setData({ ...data, name: e.target.value })}
            value={data.name}
          />

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
            Create account
          </button>
        </section>
      </section>
    </Layout>
  );
};

export default Register;

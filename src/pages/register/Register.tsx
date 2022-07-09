import React, { useEffect, useState } from 'react';
import { Layout } from '@/components';
import './style.scss';
import { useRecoilState, useRecoilValue } from 'recoil';
import { userStateAtom } from 'modules/state/index';
import { Link, useNavigate } from 'react-router-dom';
import { userDataAtom } from './userData';
import useHandleSubmit from './useHandleSubmit';

const Register = () => {
  const [data, setData] = useRecoilState(userDataAtom);
  const [userData, setUserData] = useRecoilState(userStateAtom);
  const navigate = useNavigate();
  const user = useRecoilValue(userStateAtom);

  const [handleSubmit] = useHandleSubmit();

  useEffect(() => {
    user && navigate('/');
  }, [user]);

  return (
    <Layout>
      <section className='register'>
        <section className='register__form'>
          <h1 className='register__title'>
            AUDI <span>CONFIGURATOR</span>
          </h1>

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
          <button className='btn-primary-lg' onClick={handleSubmit}>
            Create account
          </button>
          <br />
          <Link to={'/login'} className='btn-white'>
            Login
          </Link>
        </section>
      </section>
    </Layout>
  );
};

export default Register;

import React, { useState, useRef } from 'react';
import Layout from '@/components/Layout';
import mmdaCoverRegister from '@/assets/mmda-register-cover.webp'
import Image from 'next/image'
import useForm from '@/hooks/useForm'
import Input from '@/components/Input';
import { toast } from 'react-toastify';


export default function Register() {

  const [userData, userError, userHandleChange, userSubmit] = useForm('/api/auth/register', 'POST', {
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    secretPassword: '',
  })

  return (
    <div className='w-full my-10 flex justify-center'>
      <div className='card w-full md:w-96 sm:w-80 bg-base-200 shadow-xl'>
        <figure className='hover:opacity-10'>
          <Image
            src={mmdaCoverRegister}
            alt='MMDA Cover login'
            className='h-full'
            priority
          /></figure>
        <div className='card-body'>
          <h2 className='card-title'>Register</h2>

          <p>{'Ready to make a positive change in Metro Manila? Register now with MMDA and be part of the solution!'}</p>

          <div className=' justify-end w-full'>
            <form onSubmit={userSubmit}>

              <Input
                type='text'
                name='username'
                placeholder='Username'
                value={userData}
                onChange={userHandleChange}
                error={userError}
                tooltip="What's your username? (must be unique)"
              />

              <Input
                type='text'
                name='firstName'
                placeholder='First name'
                value={userData}
                onChange={userHandleChange}
                error={userError}
                tooltip="What's your first name?"
              />

              <Input
                type='text'
                name='lastName'
                placeholder='Last name'
                value={userData}
                onChange={userHandleChange}
                error={userError}
                tooltip="What's your last name?"
              />

              <Input
                type='email'
                name='email'
                placeholder='Email'
                value={userData}
                onChange={userHandleChange}
                error={userError}
                tooltip="Email must be valid"
              />

              <Input
                type='password'
                name='password'
                placeholder='Password'
                value={userData}
                onChange={userHandleChange}
                error={userError}
                tooltip="Make sure your password is strong"
              />

              <Input
                type='password'
                name='confirmPassword'
                placeholder='Confirm Password'
                value={userData}
                onChange={userHandleChange}
                error={userError}
                tooltip="Must matched the password field"
              />

              <Input
                type='password'
                name='secretPassword'
                placeholder='Secret Password'
                value={userData}
                onChange={userHandleChange}
                error={userError}
                tooltip="This is only for valid users. Email us if you want to know more..."
              />

              <button type='submit' className='btn btn-primary mt-10 w-full'>Register</button>

            </form>
          </div>
        </div>
      </div>
    </div>

  )
}

Register.getLayout = function getLayout(page) {
  return <Layout> {page}</Layout>
}
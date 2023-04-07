import React, { useState, useRef } from 'react';
import { useRouter } from 'next/router'
import Layout from '@/components/Layout';
import mmdaLoginCover from '@/assets/mmda-login-cover.jpg'
import Image from 'next/image'
import useForm from '@/hooks/useForm'
import Input from '@/components/Input';
import Link from 'next/link'
import withAuth from "@/middlewares/auth";

export async function getServerSideProps(context) {
  return withAuth(
    async ({ user }) => {
      return {
        props: { user: user || null },
      };
    },
    false, true
  )(context.req, context.res);
}

export default function Login({ user }) {
  const router = useRouter()

  function onSubmit(values) {
  }

  function onSuccess(data) {
    router.push('/views/public/dashboard')
  }

  function onError(errors) {
  }

  function onFinish(values) {
  }

  const [userData, userError, isUserLoading, userHandleChange, userSubmit] = useForm('/api/auth/login', 'POST', {
    userInput: "",
    password: "",
    secretPassword: ""
  }, onSubmit,
    onSuccess,
    onError,
    onFinish)

  return (
    <div className='w-full my-10 flex justify-center'>
      <div className='card w-full md:w-96 sm:w-80 bg-base-200 shadow-xl'>
        <figure className='hover:opacity-10'>
          <Image
            src={mmdaLoginCover}
            alt='MMDA Cover login'
            className='h-full'
            priority
          /></figure>
        <div className='card-body'>
          <h2 className='card-title'>Login</h2>
          <p>{"Join the MMDA movement towards a better Metro Manila – log in now!"}</p>

          <div className='justify-end w-full'>
            {isUserLoading && <progress className='progress progress-primary w-full'></progress>}
            <form onSubmit={userSubmit}>
              <Input
                type='text'
                name='userInput'
                placeholder='Email or Password'
                value={userData}
                onChange={userHandleChange}
                error={userError}
                isLoading={isUserLoading}
                tooltip="example: jhondoe@mail.com"
              />
              <Input
                type='password'
                name='password'
                placeholder='Password'
                value={userData}
                onChange={userHandleChange}
                error={userError}
                isLoading={isUserLoading}
                tooltip='Must matched the password field'
              />

              <Input
                type='password'
                name='secretPassword'
                placeholder='Secret Password'
                value={userData}
                onChange={userHandleChange}
                error={userError}
                isLoading={isUserLoading}
                tooltip='This is only for valid users. Email us if you want to know more...'
              />
              <button type='submit' className='btn btn-primary mt-10 w-full'>Register</button>
              {isUserLoading && <progress className='progress progress-primary w-full'></progress>}
              <div className='my-10'>
                <Link href='/views/public/auth/login' className="link link-primary">Doesnt have account? Register now</Link>
                <br />
                <Link href='/views/public/auth/forgot-password' className="link link-primary"> Forgot password? </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

Login.getLayout = function getLayout(page) {
  return <Layout user={page.props.user}> {page}</Layout>
}

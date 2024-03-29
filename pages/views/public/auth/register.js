import React, { useState, useRef } from 'react';
import { useRouter } from 'next/router'
import Layout from '@/components/Layout';
import mmdaCoverRegister from '@/assets/mmda-register-cover.webp'
import Image from 'next/image'
import useForm from '@/hooks/useForm'
import Input from '@/components/Input';
import Modal from '@/components/Modal';
import useModal from '@/hooks/useModal';
import useCountdown from '@/hooks/useCountdown';
import { toast } from 'react-toastify';
import PopUp from "@/components/PopUp";
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

export default function Register({ user }) {

  const router = useRouter()
  const [timer, resetTimer] = useCountdown(15);

  function onSubmit(values) {
  }

  function onSuccess(data) {
    toggleModal()
  }

  function onError(errors) {
  }

  function onFinish(values) {
  }

  const [userData, userError, isUserLoading, userHandleChange, userSubmit] = useForm('/api/auth/register', 'POST', {
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    secretPassword: '',
  },
    onSubmit,
    onSuccess,
    onError,
    onFinish)



  function onCloseModal() {
  }
  function onOpenModal() {
  }

  async function onAcceptModal() {
    resetTimer()
    await fetch('/api/auth/resend-email-verification', {
      headers: { "Content-Type": "application/json" },
      method: 'post',
      body: JSON.stringify({ email: userData.email }),
    }).then(async (response) => {
      const data = await response.json();
      if (data.toast) {
        data.toast.forEach(async (message) => {
          toast(<PopUp message={message.message} type={message.type} />, {
            autoClose: 2000,
            position: toast.POSITION.TOP_RIGHT,
            progress: undefined,
            hideProgressBar: true,
            closeButton: false,
          });
        })
      }
    })
  }


  function onCancelModal() {
    router.push('/views/public/auth/login')
  }

  const [cancelModal, acceptModal, toggleModal, isOpenUserModal] = useModal(onCloseModal, onOpenModal, onAcceptModal, onCancelModal, false);

  return (
    <div className='w-full my-10 flex justify-center'>
      <Modal
        title='Email verification sent'
        subtitle='Visit your email to confirm your account!'
        cancelText='LOGIN'
        okText='RESEND EMAIL'
        accept={acceptModal}
        cancel={cancelModal}
        toggle={toggleModal}
        opened={isOpenUserModal}
        isLoading={timer}
      >
        <div className='my-5'>
          Thank you for signing up <strong>{userData.email}</strong>!
          <br />
          Email verification sent. Please check your inbox (and spam folder) for a verification email
          <br />
          {timer > 0 && (
            <p className='text-accent'>
              Resend email : <strong>{timer}</strong>
            </p>
          )}
        </div>

      </Modal>

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

          <div className='justify-end w-full'>
            {isUserLoading && <progress className='progress progress-primary w-full'></progress>}
            <form onSubmit={userSubmit}>

              <Input
                type='text'
                name='username'
                placeholder='Username'
                value={userData}
                onChange={userHandleChange}
                error={userError}
                isLoading={isUserLoading}
                tooltip="What's your username? (must be unique)"
              />

              <Input
                type='text'
                name='firstName'
                placeholder='First name'
                value={userData}
                onChange={userHandleChange}
                error={userError}
                isLoading={isUserLoading}
                tooltip="What's your first name?"
              />

              <Input
                type='text'
                name='lastName'
                placeholder='Last name'
                value={userData}
                onChange={userHandleChange}
                error={userError}
                isLoading={isUserLoading}
                tooltip="What's your last name?"
              />

              <Input
                type='email'
                name='email'
                placeholder='Email'
                value={userData}
                onChange={userHandleChange}
                error={userError}
                isLoading={isUserLoading}
                tooltip='Email must be valid'
              />

              <Input
                type='password'
                name='password'
                placeholder='Password'
                value={userData}
                onChange={userHandleChange}
                error={userError}
                isLoading={isUserLoading}
                tooltip='Make sure your password is strong'
              />

              <Input
                type='password'
                name='confirmPassword'
                placeholder='Confirm Password'
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
                <Link href='/views/public/auth/login' className="link link-primary">Already have an account? Login now</Link>
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

Register.getLayout = function getLayout(page) {
  return <Layout user={page.props.user}> {page}</Layout>

}
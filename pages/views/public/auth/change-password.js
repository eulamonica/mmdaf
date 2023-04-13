import React from "react";
import Layout from "@/components/Layout";
import Image from "next/image";
import useForm from "@/hooks/useForm";
import Input from "@/components/Input";
import Link from "next/link";
import mmdaCoverRegister from '@/assets/mmda-register-cover.webp'
import { useState } from "react";
import { useRouter } from 'next/router'
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

export default function ChangePassword({ user }) {

  const router = useRouter()
  const [changedSuccessfully, setChangedSuccessfully] = useState(false)


  function onSubmit(values) {

  }

  function onSuccess(data) {
    setChangedSuccessfully(value => true);
    toggleModal()
  }

  function onError(errors) {
  }

  function onFinish(values) {
  }



  const [userData, userError, isUserLoading, userHandleChange, userSubmit] = useForm('/api/auth/change-password', 'POST', {
    password: '',
    confirmPassword: '',
    secretPassword: '',
    changePasswordToken: router.query['password-token'],
    email: router.query['email']
  },

    onSubmit,
    onSuccess,
    onError,
    onFinish)

  function getStartedHander() {
    router.push('/views/public/auth/login')
  }

  if (changedSuccessfully) {
    return (
      <>
        <div className="hero min-h-screen bg-base-400">
          <div className="hero-content flex-col lg:flex-row-reverse w-96 mb-28 bg-base-300 p-10 rounded-lg shadow-xl">
            <div>
              <h1 className="text-5xl font-bold text-center">Password Changed!</h1>
              <div className="py-6 text-center">
                <h4 className="text-primary font-bold">Remember your password well and dont share it with others</h4>
                <br />
                <p>
                  Keep safe
                </p>
              </div>
              <button className="btn btn-primary w-full" onClick={getStartedHander}>Click here to login</button>
            </div>
          </div>
        </div>
      </>
    )
  }
  return (
    <>

      <div className='w-full my-10 flex justify-center h-scre'>
        <div className='card w-full md:w-96 sm:w-80 bg-base-200 shadow-xl'>
          <figure className='hover:opacity-10'>
            <Image
              src={mmdaCoverRegister}
              alt='MMDA Cover login'
              className='h-full'
              priority
            /></figure>
          <div className='card-body'>
            <h2 className='card-title'>Changing Password</h2>

            <p>{'Please note that you must remember your password'}</p>
            <div className='justify-end w-full'>
              {isUserLoading && <progress className='progress progress-primary w-full'></progress>}

              <form onSubmit={userSubmit}>

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
                <button type='submit' className='btn btn-primary mt-10 w-full'>Change Password</button>
                <div className="text-center mt-3">
                  <Link href='/views/public/auth/login' className="link link-primary">Already have an account? Login now</Link>
                  <br />
                  <Link href='/views/public/auth/register' className="link link-primary"> Doesnt have an account? Register now </Link>
                </div>
              </form>

            </div>
          </div>
        </div>
      </div>
    </>
  )
}

ChangePassword.getLayout = function getLayout(page) {
  return <Layout user={page.props.user}> {page}</Layout>

}
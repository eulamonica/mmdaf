import React from "react";
import Layout from "@/components/Layout";
import Image from "next/image";
import useForm from "@/hooks/useForm";
import Input from "@/components/Input";
import Link from "next/link";
import mmdaCoverRegister from '@/assets/mmda-register-cover.webp'
import { useEffect, useState } from "react";
import { useRouter } from 'next/router'
import { toast } from 'react-toastify';
import PopUp from "@/components/PopUp";

export default function ChangePassword() {

  const router = useRouter()
  const [changedSuccessfully, setChangedSuccessfully] = useState(false)
  function onSubmit(values) {

  }

  function onSuccess(data) {
    setChangedSuccessfully(value => true)
  }

  function onError(errors) {
  }

  function onFinish(values) {
  }


  const [userData, userError, isUserLoading, userHandleChange, userSubmit] = useForm('/api/auth/change-password', 'POST', {
    password: '',
    confirmPassword: '',
    secretPassword: '',
    changePasswordToken: router.query['password-token']
  },

    onSubmit,
    onSuccess,
    onError,
    onFinish)

  return (
    <>
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
                <button type='submit' className='btn btn-primary mt-10 w-full'>Register</button>
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
  return <Layout> {page}</Layout>
}
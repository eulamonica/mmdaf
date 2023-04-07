import React from 'react';
import { useRouter } from 'next/router'
import Layout from '@/components/Layout';
import mmdaCoverRegister from '@/assets/mmda-register-cover.webp'
import Image from 'next/image'
import useForm from '@/hooks/useForm'
import Input from '@/components/Input';
import useCountdown from '@/hooks/useCountdown';
import Link from 'next/link'

export default function ForgotPassword() {

  const router = useRouter()
  const [timer, resetTimer] = useCountdown(15);

  function onSubmit(values) {
    resetTimer()
  }

  function onSuccess(data) {
  }

  function onError(errors) {
  }

  function onFinish(values) {
  }


  const [userData, userError, isUserLoading, userHandleChange, userSubmit] = useForm('/api/auth/forgot-password', 'POST', {
    userInput: '',
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

            <h2 className='card-title'>Forgot Password</h2>
            <div className='justify-end w-full'>
              {(isUserLoading || timer > 0) && <progress className='progress progress-primary w-full'></progress>}
              <form onSubmit={userSubmit}>
                <Input
                  type='text'
                  name='userInput'
                  placeholder='Username or Email'
                  value={userData}
                  onChange={userHandleChange}
                  error={userError}
                  isLoading={isUserLoading}
                  tooltip="Please note that you already have an account or else this will not work"
                />
                <button disabled={timer > 0} type='submit' className='btn btn-primary my-3 w-full'>Send Email {timer > 0 && `: ${timer} left`}</button>
                <div className='mb-10'>
                  <Link href='/views/public/auth/login' className="link link-primary">Already have an account? Login now</Link>
                  <br />
                  <Link href='/views/public/auth/register' className="link link-primary mt-3"> Doesnt have an account? Register Now </Link>
                </div>
              </form>

            </div>
            <p>Forgot your password? No worries! Please click the
              Send email above and youll recieve a link that changes your password. </p>

          </div>
        </div>
      </div>
    </>
  )
}

ForgotPassword.getLayout = function getLayout(page) {
  return <Layout> {page}</Layout>
}
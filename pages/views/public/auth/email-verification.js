import React from "react";
import Layout from "@/components/Layout";
import { useEffect } from "react";
import { useRouter } from 'next/router'
import { toast } from 'react-toastify';
import PopUp from "@/components/PopUp";
import withAuth from "@/middlewares/auth";

export async function getServerSideProps(context) {
  return withAuth(
    async ({ user }) => {
      return {
        props: { user: user || null },
      };
    },
    true, true
  )(context.req, context.res);
}


export default function EmailVerification({ user }) {
  const router = useRouter()

  async function emailVerification(email_token, email) {
    await fetch('/api/auth/verify-email', {
      headers: { "Content-Type": "application/json" },
      method: 'post',
      body: JSON.stringify({ email_token, email }),
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
  function getStartedHander(e) {
    e.preventDefault();
    if (!user)
      router.push('/views/public/auth/login');
    else
      router.push('/views/public/dashboard');
  }

  useEffect(() => {
    const email_token = router.query['email-token']
    const email = router.query['email']
    if (email_token && email)
      emailVerification(email_token, email);
  }, [router.query])

  return (
    <>
      <div className="hero min-h-screen bg-base-400">
        <div className="hero-content flex-col lg:flex-row-reverse w-96 mb-28 bg-base-300 p-10 rounded-lg shadow-xl">
          <div>
            <h1 className="text-5xl font-bold text-center">Email Verified!</h1>
            <div className="py-6 text-center">
              <h4 className="text-primary font-bold">  Congratulations! We are excited to welcome you.</h4>
              <br />
              <p>
                We are pleased to inform you that your request to access the MMDA form has been approved.
                You now have the ability to edit, download, and contribute to the form,
                which will help enhance our community s understanding of the MMDA s initiatives and programs
              </p>
            </div>
            <button className="btn btn-primary w-full" onClick={getStartedHander}>Click here to get started</button>
          </div>
        </div>
      </div>
    </>
  )
}

EmailVerification.getLayout = function getLayout(page) {
  return <Layout user={page.props.user}> {page}</Layout>
}
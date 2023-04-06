import React from "react";
import Layout from "@/components/Layout";
import { useEffect, useState } from "react";
import { useRouter } from 'next/router'
import { toast } from 'react-toastify';
import PopUp from "@/components/PopUp";




export default function EmailVerification() {
  const router = useRouter()

  async function emailVerification(email_token) {
    await fetch('/api/auth/verify-email', {
      headers: { "Content-Type": "application/json" },
      method: 'post',
      body: JSON.stringify({ email_token }),
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
    router.push('/views/public/auth/login');
  }
  useEffect(() => {
    const email_token = router.query['email-token']
    if (email_token)
      emailVerification(email_token);
  }, [router.query])

  return (
    <>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse w-96">
          <div>
            <h1 className="text-5xl font-bold">Email Verified!</h1>
            <p className="py-6">P
              Congratulations! We are excited to welcome you.
              <br />
              We are pleased to inform you that your request to access the MMDA form has been approved.
              You now have the ability to edit, download, and contribute to the form,
              which will help enhance our community s understanding of the MMDA s initiatives and programs
            </p>
            <button className="btn btn-primary" onClick={getStartedHander}>Click here to get started</button>
          </div>
        </div>
      </div>
    </>
  )
}

EmailVerification.getLayout = function getLayout(page) {
  return <Layout> {page}</Layout>
}
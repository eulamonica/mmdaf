import React from "react";
import useCountdown from '@/hooks/useCountdown';
import PopUp from "../PopUp";
import { useRouter } from 'next/router'
import { toast } from "react-toastify";

export default function NotVerifiedProfile({ user }) {
  const router = useRouter()
  const [timer, resetTimer] = useCountdown(15);

  async function handleResendEmailVerification(e) {
    e.preventDefault();
    resetTimer()
    await fetch('/api/auth/resend-email-verification', {
      headers: { "Content-Type": "application/json" },
      method: 'post',
      body: JSON.stringify({ email: user.email }),
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
  return (
    <div className="hero min-h-screen bg-base-100">
      <div className="hero-content text-center mb-16">
        <div className="w-96 bg-base-200 p-16 rounded-md shadow-lg">
          <h1 className="text-5xl font-bold text-accent">Hello there</h1>
          <p> Thank you for signing up <strong>{user.username}</strong>! </p>
          <p className="py-6">Email verification sent. Please check your inbox (and spam folder) for a verification email
            Inorder for you to edit, delete, add, and colllaborate with the team. You must verify your email first.</p>
          <button className="btn btn-accent" disabled={timer > 0} onClick={handleResendEmailVerification}>Send email verification</button>
          {timer > 0 && (
            <p className='text-accent'>
              Resend email : <strong>{timer}</strong>
            </p>
          )}
          {timer > 0 && <progress className='progress progress-accent w-full mt-5'></progress>}
        </div>

      </div>
    </div>
  )
}
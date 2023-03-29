import React, { useState } from "react";
import Layout from "@/components/Layout";
import mmdaCoverRegister from '@/assets/mmda-register-cover.webp'
import Image from 'next/image'



export default function Register() {
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [secretPassword, setSecretPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(username)
  };

  return (
    <div className="w-full my-10 flex justify-center">
      <div className="card w-96 bg-base-200 shadow-xl">
        <figure className="hover:opacity-10">
          <Image
            src={mmdaCoverRegister}
            alt="MMDA Cover login"
            className="h-full"
          /></figure>
        <div className="card-body">
          <h2 className="card-title">Register</h2>
          <p>{"Ready to make a positive change in Metro Manila? Register now with MMDA and be part of the solution!"}</p>

          <div className="card-actions justify-end">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                className="input input-bordered w-full my-3"
                required
              />
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First name"
                className="input input-bordered w-full my-3"
                required
              />
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last name"
                className="input input-bordered w-full my-3"
                required
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="input input-bordered w-full my-3"
                required
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="input input-bordered w-full my-3"
                required
              />
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password"
                className="input input-bordered w-full my-3"
                required
              />
              <input
                type="password"
                value={secretPassword}
                onChange={(e) => setSecretPassword(e.target.value)}
                placeholder="Secret Password"
                className="input input-bordered w-full my-3"
                required
              />
              <button type="submit" className="btn btn-primary mt-10 w-full">Register</button>

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
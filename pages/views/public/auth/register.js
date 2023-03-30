import React, { useState, useRef } from "react";
import Layout from "@/components/Layout";
import mmdaCoverRegister from '@/assets/mmda-register-cover.webp'
import Image from 'next/image'
import { toast } from "react-toastify";


export default function Register() {

  const [userData, setUserData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    secretPassword: "",
  })
  function handleChange(e) {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch('/api/auth/register', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(userData)
    }).then((res) => {
      console.log(res)
    })
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
                name='username'
                placeholder="Username"
                value={userData.username}
                onChange={handleChange}
                className="input input-bordered w-full my-3"

              />
              <input
                type="text"
                name='firstName'
                placeholder="First name"
                value={userData.firstName}
                onChange={handleChange}
                className="input input-bordered w-full my-3"

              />
              <input
                type="text"
                name='lastName'
                placeholder="Last name"
                value={userData.lastName}
                onChange={handleChange}
                className="input input-bordered w-full my-3"

              />
              <input
                type="email"
                name='email'
                placeholder="Email"
                value={userData.email}
                onChange={handleChange}
                className="input input-bordered w-full my-3"

              />
              <input
                type="password"
                name='password'
                placeholder="Password"
                value={userData.password}
                onChange={handleChange}
                className="input input-bordered w-full my-3"

              />
              <input
                type="password"
                name='confirmPassword'
                placeholder="Confirm Password"
                value={userData.confirmPassword}
                onChange={handleChange}
                className="input input-bordered w-full my-3"

              />
              <input
                type="password"
                name="secretPassword"
                placeholder="Secret Password"
                value={userData.secretPassword}
                onChange={handleChange}
                className="input input-bordered w-full my-3"
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
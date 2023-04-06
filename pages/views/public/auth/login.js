import { useState } from "react";
import Image from 'next/image'
import Router from "next/router";
import React from "react";
import Layout from "@/components/Layout";
import mmdaCoverlogin from '@/assets/mmda-login-cover.jpg'

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    if (response.ok) {
      Router.push("/");
    } else {
      alert("Login failed");
    }
  };

  return (
    <div className="w-full my-10 flex justify-center">
      <div className="card w-96 bg-base-200 shadow-xl">
        <figure className="hover:opacity-10">
          <Image
            src={mmdaCoverlogin}
            alt="MMDA Cover login"
            className="h-full"
            priority
          /></figure>
        <div className="card-body">
          <h2 className="card-title">Login</h2>
          <p>{"Join the MMDA movement towards a better Metro Manila – log in now!"}</p>
          <div className="card-actions justify-end">
            <form onSubmit={handleSubmit}>
              <div className="form-control">
                <label className="input-group my-3 mt-10">
                  <span>Email</span>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="info@site.com"
                    className="input input-bordered w-full"
                    required
                  />
                </label>
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="input input-bordered w-full my-3"
                required
              />
              <button type="submit" className="btn btn-primary mt-10 w-full">Login</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

Login.getLayout = function getLayout(page) {
  return <Layout> {page}</Layout>
}
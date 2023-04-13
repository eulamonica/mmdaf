import React, { useEffect, useState } from "react";
import Layout from "../Layout";
import Input from "../Input";
import PopUp from "../PopUp";
import useForm from "@/hooks/useForm";
import { toast } from "react-toastify";
import Router from "next/router";

export default function UserMainProfile({ user }) {
  const [isDisabled, setIsDisabled] = useState(false);

  function onSubmit(values) {
    setIsDisabled(true)
  }
  function onSuccess(data) {
    Router.reload();
  }
  function onError(errors) { }
  function onFinish(values) {
    setIsDisabled(false)
  }
  const [initialUserData, setInitialUserData] = useState({
    id: user.id,
    username: '',
    firstName: '',
    lastName: '',
  })
  const [userData, userError, isUserLoading, userHandleChange, userSubmit] = useForm('/api/private/profile', 'PUT', { ...initialUserData },
    onSubmit,
    onSuccess,
    onError,
    onFinish)


  useEffect(() => {
    async function getData() {
      await fetch('/api/private/profile', {
        headers: { "Content-Type": "application/json" },
        method: 'post',
        body: JSON.stringify({ id: user.id }),
      }).then(async (response) => {
        const data = await response.json();
        setInitialUserData({ id: user.id, ...data.data })
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
    getData();
  }, [setInitialUserData, user.id])


  const [initialPasswordData, setInitialPasswordData] = useState({
    id: user.id,
    oldPassword: '',
    password: '',
    confirmPassword: '',
  })

  function onPasswordSubmit(value) {
    setIsDisabled(true)
  };

  function onPasswordSuccess(value) { };
  function onPasswordError(value) { };
  function onPasswordFinish(value) {
    setInitialPasswordData({
      id: user.id,
      oldPassword: '',
      password: '',
      confirmPassword: '',
    })
    setIsDisabled(false)
  }


  const [userPassowrdData, userPassowrdError, isUserPassowrdLoading, userPassowrdHandleChange, userPassowrdSubmit] = useForm('/api/private/profile', 'PATCH', { ...initialPasswordData },
    onPasswordSubmit,
    onPasswordSuccess,
    onPasswordError,
    onPasswordFinish)

  return (

    <div className="flex h-screen justify-center mt-10 mb-96 lg:mb-10">
      <div className="flex flex-col w-full lg:flex-row mx-4">
        <div className="grid flex-grow h-5/6 card bg-base-300 rounded-box place-items-center py-10">
          {isUserLoading && <progress className='absolute top-0 rounded-t-lg progress progress-primary w-full rounded-none'></progress>}
          <form onSubmit={userSubmit}>
            <div className="font-bold text-primary"> Edit Profile </div>
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
            <div className="card-actions justify-end mt-5">
              <button className="btn btn-primary" type="submit" disabled={isDisabled}>Save Changes</button>
            </div>
          </form>
        </div>
        <div className="divider lg:divider-horizontal mx-4"></div>

        <div className="grid flex-grow h-5/6 card bg-base-300  rounded-box place-items-center py-10">
          {isUserPassowrdLoading && <progress className='absolute top-0 rounded-t-lg progress progress-primary w-full rounded-none'></progress>}

          <form onSubmit={userPassowrdSubmit}>
            <div className="font-bold text-accent"> Edit Password </div>
            <Input
              type='password'
              name='password'
              placeholder='Password'
              value={userPassowrdData}
              onChange={userPassowrdHandleChange}
              error={userPassowrdError}
              isLoading={isUserPassowrdLoading}
              tooltip='Make sure your password is strong'
            />

            <Input
              type='password'
              name='confirmPassword'
              placeholder='Confirm Password'
              value={userPassowrdData}
              onChange={userPassowrdHandleChange}
              error={userPassowrdError}
              isLoading={isUserPassowrdLoading}
              tooltip='Must matched the password field'
            />

            <Input
              type='password'
              name='oldPassword'
              placeholder='Old Password'
              value={userPassowrdData}
              onChange={userPassowrdHandleChange}
              error={userPassowrdError}
              isLoading={isUserPassowrdLoading}
              tooltip='Whats your old password?'
            />

            <div className="card-actions justify-end mt-5">
              <button className="btn btn-accent" type="submit" disabled={isDisabled}>Save Changes</button>
            </div>
          </form>
        </div>
      </div>
    </div >
  )
}
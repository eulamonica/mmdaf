import { useRouter } from "next/router"
import { GiHamburgerMenu } from 'react-icons/gi'
import PopUp from "./PopUp"
import React from "react"
import { toast } from "react-toastify"
export default function Navigation({ children }) {

  const router = useRouter()

  const handleChangeRoute = (href) => {
    router.push(href)
  }
  async function handleLogout(e) {
    e.preventDefault();
    await fetch('/api/auth/logout', {
      headers: { "Content-Type": "application/json" },
      method: 'post',
    }).then(async (response) => {
      const data = await response.json();
      if (data.success) {
        handleChangeRoute('/views/public/dashboard')
      }
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
    <>

      <div className="navbar bg-base-200 shadow-sm">
        <div className="flex-none">
          <label htmlFor="navigation-component" className="btn btn-square btn-ghost drawer-button lg:hidden">
            <GiHamburgerMenu size={20} />
          </label>
        </div>
        <div className="flex-1">
          <a className="btn btn-ghost normal-case text-xl">MMDA Forecasting</a>
        </div>
        <div className="flex-none">

          <>
            <button className="btn btn-ouline btn-ghost" onClick={() => handleChangeRoute('/views/public/auth/login')}>
              Login
            </button>
            <button className="btn btn-ouline btn-ghost" onClick={() => handleChangeRoute('/views/public/auth/register')}>
              Sign Up
            </button>
          </>

          <>
            <button className="btn btn-square btn-ghost" onClick={handleLogout}>Logout</button>
          </>

        </div>
      </div >
      {children}
    </>
  )
}
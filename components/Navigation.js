import { useRouter } from "next/router"
import { GiHamburgerMenu } from 'react-icons/gi'
import PopUp from "./PopUp"
import React from "react"
import { toast } from "react-toastify"
import Link from "next/link"

export default function Navigation({ children, user, themes, setTheme }) {

  return (
    <>
      <div className="navbar bg-base-200 shadow-sm">
        <div className="flex-none">
          <label htmlFor="navigation-component" className="btn btn-square btn-ghost drawer-button lg:hidden">
            <GiHamburgerMenu size={20} />
          </label>
        </div>
        <div className="flex-1">
          <Link href='/views/public/dashboard' className="btn btn-ghost normal-case text-xl">MMDA Forecasting</Link>
        </div>
        <div className="flex-none">
          <div className="dropdown dropdown-end mx-2">
            <label tabIndex={0} className="btn m-1">Theme</label>
            <ul tabIndex={0} className="dropdown-content block menu p-2 shadow-md bg-base-100 rounded-box w-56 h-48 overflow-auto">
              {
                themes && themes.map((value, idx) => {
                  return (
                    <li className="my-2 shadow-sm bg-none rounded-lg border-neutral" key={idx} data-theme={value} onClick={() => setTheme(value)}>
                      <div className="flex content-center justify-end bg-none">
                        <a className="capitalize">{value}</a>
                        <span className="w-3 h-10 bg-primary rounded-lg shadow-md border"></span>
                        <span className="w-3 h-10 bg-secondary rounded-lg shadow-md border"></span>
                        <span className="w-3 h-10 bg-accent rounded-lg shadow-md border"></span>
                        <span className="w-3 h-10 bg-neutral rounded-lg shadow-md border"></span>
                        <progress className="absolute bottom-0 right-0 progress progress-primary h-1 rounded-none w-full"></progress>
                      </div>
                    </li>
                  )
                })
              }
            </ul>
          </div>
          {!user && <UserNotExist />}
          {user && <UserExist user={user} />}

        </div>
      </div >
      {children}
    </>
  )
}

function UserNotExist() {
  const router = useRouter()
  const handleChangeRoute = (href) => {
    router.push(href)
  }
  return (
    <>
      <button className="btn btn-ouline btn-ghost" onClick={() => handleChangeRoute('/views/public/auth/login')}>
        Login
      </button>
      <button className="btn btn-ouline btn-ghost" onClick={() => handleChangeRoute('/views/public/auth/register')}>
        Sign Up
      </button>
    </>
  )
}
function UserExist({ user }) {
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
      <div className="dropdown dropdown-hover dropdown-end">
        <label tabIndex={0} className="flex justify-center content-center items-center bg-base-100 py-1 px-3  rounded-md">
          <p className="prose p-3"> Hello {user.username}!</p>
          <p className="w-5 h-5 p-5 flex justify-center items-center bg-accent text-center rounded-full shadow-md">{user.username.charAt(0)}</p>
        </label>
        <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-200 rounded-box w-32">
          <li><a onClick={handleLogout}>Logout</a></li>
        </ul>
      </div>
    </>
  )
}

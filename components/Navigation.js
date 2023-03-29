import { useRouter } from "next/router"
import { GiHamburgerMenu } from 'react-icons/gi'
import Link from 'next/link'
import React from "react"

export default function Navigation({ children }) {

  const router = useRouter()

  const handleChangeRoute = (href) => {
    router.push(href)
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
            <Link className="btn btn-square btn-ghost" href="/api/auth/logout">Logout</Link>
          </>



        </div>
      </div >
      {children}
    </>
  )
}
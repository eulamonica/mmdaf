import { useUser } from "@auth0/nextjs-auth0/client"
import { GiHamburgerMenu } from 'react-icons/gi'
import Link from 'next/link'
import React from "react"

export default function Navigation({ children }) {

  const { user, error, isLoading } = useUser();
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
          {!user && (
            <>
              <button className="btn btn-ouline btn-ghost">
                Login
              </button>
              <button className="btn btn-ouline btn-ghost">
                Sign Up
              </button>
            </>
          )}
          {
            user &&
            (
              <>

                Welcome {user.name}!  <Link className="btn btn-square btn-ghost" href="/api/auth/logout">Logout</Link>
              </>

            )
          }
        </div>
      </div >
      {children}
    </>
  )
}
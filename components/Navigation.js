import React from "react"
import { GiHamburgerMenu } from 'react-icons/gi'


export default function Navigation({ children }) {
  return (
    <>
      <div className="navbar bg-base-200 shadow-sm">
        <div className="flex-none">
          <label htmlFor="navigation-component" className="btn btn-square btn-ghost drawer-button lg:hidden">
            <GiHamburgerMenu size={20} />
          </label>
        </div>
        <div className="flex-1">
          <a className="btn btn-ghost normal-case text-xl">daisyUI</a>
        </div>
        <div className="flex-none">
          <button className="btn btn-square btn-ghost">
            Login
          </button>
          <button className="btn btn-square btn-ghost">
            Sign Up
          </button>
          <button className="btn btn-square btn-ghost">
            Logout
          </button>
        </div>
      </div>
      {children}
    </>
  )
}
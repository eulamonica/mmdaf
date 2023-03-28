import React from "react";
import Image from 'next/image'
import mmdaCover from '@/assets/mmda-cover.webp'
import { FaCarCrash } from 'react-icons/fa'
import { MdSupervisedUserCircle, MdDashboard, MdOutlineAccessTimeFilled, MdOutlineCalendarMonth, MdOutlineGroups2, MdOutlineLocalCarWash } from 'react-icons/md'
import { useRouter } from 'next/router'

const drawerRouter = [
  {
    text_category: 'MMDA Forecasting',
  },
  {
    text: "Dashboard",
    icon: <MdDashboard />,
    route: '/views/public/dashboard'
  },
  {
    route: '/views/private/hourly',
    icon: <MdOutlineAccessTimeFilled />,
    text: "Hourly"
  },

  {
    route: '/views/private/monthly',
    icon: <MdOutlineCalendarMonth />,
    text: "Monthly"
  },

  {
    route: '/views/private/age',
    icon: <MdOutlineGroups2 />,
    text: "Age",
  }
  ,
  {
    route: '/views/private/vehicleType',
    icon: <MdOutlineLocalCarWash />,
    text: "Vehicle Type"
  },
  {
    route: '/views/private/collisionType',
    icon: <FaCarCrash />,
    text: "Collission Type",
  },
  {
    text_category: 'Profile',
  },
  {
    text: "Profile",
    icon: <MdSupervisedUserCircle />,
    route: '/views/public/profile.js'
  },
]
export default function Drawer({ children }) {
  const router = useRouter()
  const handleChangeRoute = (href) => {
    router.push(href)
  }
  function isActive(href) {
    if (router.asPath === href)
      return 'btn-primary border-right';
  }

  return (
    <div className="drawer drawer-mobile">
      <input id="navigation-component" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {children}
      </div>
      <div className="drawer-side">
        <label htmlFor="navigation-component" className="drawer-overlay"></label>
        <ul className="menu w-80 bg-base-200 text-base-content shadow-xl border-current-300 border-solid">
          <div className="card w-full m-0 bg-base-100 shadow-md ">
            <figure className="hover:opacity-10">
              <Image
                src={mmdaCover}
                alt="Landscape picture"
                width={800}
                height={500}
              /></figure>
            <label htmlFor="navigation-component" className="absolute right-0 shadow-lg btn btn-circle  btn-sm font-extralight text-xs m-3 font-sans lg:hidden">
              x
            </label>
          </div>
          {
            drawerRouter?.map((value, index) => {
              if (value.hasOwnProperty('text_category'))
                return (
                  <li className="menu-title mt-5">
                    <span>{value.text_category}</span>
                  </li>
                )
              return (
                <li key={index} >
                  <button className={isActive(value.route)} onClick={() => handleChangeRoute(value.route)}>
                    {value.icon}{value.text}
                  </button>
                </li>
              )
            })
          }
        </ul>
      </div>
    </div>
  )
}
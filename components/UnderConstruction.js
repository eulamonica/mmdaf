import React from "react";
import Image from "next/image";
import UnderConstrunctionImage from '@/assets/Under-Construction-Sign.png'
import Link from "next/link";

export default function UnderConstruction({ pageName }) {
  return (
    <div className="w-full flex justify-center h-screen my-10">

      <div className="hero h-72 bg-base-200 shadow-lg">
        <div className="hero-content flex-col lg:flex-row">
          <Image src={UnderConstrunctionImage}
            alt="Under Construction"
            className='bg-contain'
            height="200"
            priority />
          <div>
            <h1 className="text-5xl font-bold">
              This {pageName ? <span className="text-primary">{pageName}</span> : ' Page '} is under Construction</h1>
            <p className="py-6">We are currently working hard to bring you a brand new experience. Please check back soon!</p>
            <Link href='/views/public/dashboard' className="btn btn-primary">Go to Dashboard</Link>
          </div>
        </div>
      </div>
    </div>
  )
};

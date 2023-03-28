import React, { Suspense } from "react";
import Drawer from "./Drawer";
import Loading from "./Loading";
import Navigation from "./Navigation";


export default function Layout({ children }) {
  return (
    <>

      <Suspense fallback={<Loading />}>
        <Drawer>
          <Navigation>
            <main>  {children} </main>
          </Navigation>
        </Drawer>
      </Suspense>

    </>
  )
}
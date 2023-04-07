import React, { Suspense } from "react";
import Drawer from "./Drawer";
import Loading from "./Loading";
import Navigation from "./Navigation";
import Footer from "./Footer";

export default function Layout({ children, user }) {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <Drawer user={user}>
          <Navigation user={user}>
            <main>  {children} </main>
            <Footer user={user} />
          </Navigation>
        </Drawer>
      </Suspense>
    </>
  )
}

import React, { Suspense } from "react";
import Drawer from "./Drawer";
import Loading from "./Loading";
import Navigation from "./Navigation";
import Footer from "./Footer";

export default function Layout({ children }) {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <Drawer>
          <Navigation>
            <main>  {children} </main>
            <Footer />
          </Navigation>
        </Drawer>
      </Suspense>

    </>
  )
}
import React from "react";
import Drawer from "./Drawer";
import Navigation from "./Navigation";
export default function Layout({ children }) {
  return (
    <>
      <Drawer>
        <Navigation>
          <main>  {children} </main>
        </Navigation>
      </Drawer>
    </>
  )
}
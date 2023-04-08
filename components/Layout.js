import React, { Suspense } from "react";
import Drawer from "./Drawer";
import Navigation from "./Navigation";
import Footer from "./Footer";
import daisyUIThemes from '@/data/daisyUIThemes.json'
import useTheme from "@/hooks/useTheme";

export default function Layout({ children, user, theme: initialTheme }) {
  const [theme, setTheme] = useTheme(initialTheme);
  return (
    <div data-theme={theme}>
      <Suspense>
        <Drawer user={user}>
          <Navigation user={user} themes={daisyUIThemes.themes} setTheme={setTheme}>
            <main>  {children} </main>
            <Footer user={user} />
          </Navigation>
        </Drawer>
      </Suspense>
    </div>
  )
}

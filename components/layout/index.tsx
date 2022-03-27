import Head from "next/head"
import React from "react"
import CommandPalette from "../command-palette/command-palette"
import Navbar from "./navbar"

const Layout: React.FC = ({ children }) => {
  return (
    <div className="flex h-screen w-screen select-none bg-white text-slate-500">
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, viewport-fit=cover"
        ></meta>
      </Head>
      <Navbar />
      <div className="flex flex-1 items-center justify-center">{children}</div>
    </div>
  )
}

export default Layout

import Head from "next/head"
import React from "react"
import Header from "./header"

const Layout: React.FC = ({ children }) => {
  return (
    <div className="select-none w-screen h-screen bg-slate-50 dark:bg-medium-gray text-slate-600 dark:text-slate-200">
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, viewport-fit=cover"
        ></meta>
      </Head>
      <Header />
      <div className="flex h-full w-full justify-center border-inherit px-6 pt-12 items-center">
        {children}
      </div>
    </div>
  )
}

export default Layout

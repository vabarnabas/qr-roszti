import { onAuthStateChanged } from "firebase/auth"
import Head from "next/head"
import { useRouter } from "next/router"
import React, { useEffect } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth, useUser } from "../../services/firebase-provider"
import Navbar from "./navbar"

const Layout: React.FC = ({ children }) => {
  const router = useRouter()

  onAuthStateChanged(auth, (user) => {
    if (!user) {
      router.replace("/login")
    }
  })

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

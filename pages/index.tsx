import type { NextPage } from "next"
import Layout from "../components/layout"
import MiddleButton from "../components/middle-button/middle-button"
import { RiQrCodeLine } from "react-icons/ri"
import { useContext } from "react"
import { UserContext } from "../services/firebase-provider"

const Home: NextPage = () => {
  return (
    <Layout>
      <div className="">
        <p className="text-4xl inline-block font-semibold text-center">
          Welcome to <span className="ml-1 text-blue-500">QR</span>RÖszTI!
        </p>
      </div>
      <MiddleButton href={"/qr"} icon={<RiQrCodeLine />} />
    </Layout>
  )
}

export default Home

import type { NextPage } from "next"
import Layout from "../components/layout"
import QRCode from "qrcode.react"
import MiddleButton from "../components/middle-button/middle-button"
import { RiQrCodeLine } from "react-icons/ri"

const Home: NextPage = () => {
  return (
    <Layout>
      <QRCode
        className="rounded-lg"
        value="Varga_Barnabas&PVEP31&2022_02_07"
        bgColor="#e2e8f0"
        fgColor="#1e293b"
        includeMargin={true}
        size={256}
      />
      <MiddleButton href="qr" icon={<RiQrCodeLine />} />
    </Layout>
  )
}

export default Home

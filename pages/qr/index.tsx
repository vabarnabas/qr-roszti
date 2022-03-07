import { useRouter } from "next/router"
import React from "react"
import Layout from "../../components/layout"
import QRCode from "qrcode.react"

const QRView = () => {
  const router = useRouter()
  const { userid: userId } = router.query

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
    </Layout>
  )
}

export default QRView

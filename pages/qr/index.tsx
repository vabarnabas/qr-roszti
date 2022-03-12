import QRCode from "qrcode.react"
import React, { useContext, useEffect, useState } from "react"
import Layout from "../../components/layout"
import { UserContext } from "../../services/firebase-provider"

const QRView = () => {
  const user = useContext(UserContext)
  const [date, setDate] = useState(Date.now())

  return (
    <Layout>
      <QRCode
        className="rounded-lg"
        value={user?.uid + "&" + date}
        bgColor="#e2e8f0"
        fgColor="#1e293b"
        includeMargin={true}
        size={312}
      />
    </Layout>
  )
}

export default QRView

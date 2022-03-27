import Image from "next/image"
import QRCode from "qrcode.react"
import React, { useContext, useEffect, useState } from "react"
import Layout from "../../components/layout"
import { UserContext } from "../../services/firebase-provider"

const QRView = () => {
  const user = useContext(UserContext)
  console.log(user)
  const [date, setDate] = useState(Date.now())

  return (
    <Layout>
      <QRCode
        className="rounded-lg"
        value={(user?.uid || "") + "_" + date}
        bgColor="#e2e8f0"
        fgColor="#1e293b"
        includeMargin={true}
        size={312}
      />
      {/* <div className="relative aspect-square rounded-lg overflow-hidden">
        <Image
          src={`https://chart.googleapis.com/chart?cht=qr&chs=200x200&chl=${
            user?.uid || ""
          }_${date}`}
          width={312}
          height={312}
        />
      </div> */}
    </Layout>
  )
}

export default QRView

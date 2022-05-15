import Image from "next/image"
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
        className="rounded-md"
        value={(user?.uid || "") + "_" + date}
        bgColor="#f8fafc"
        fgColor="#334155"
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

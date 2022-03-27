import { useRouter } from "next/router"
import React, { ReactNode } from "react"

interface Props {
  href: string
  icon: ReactNode
}

const MiddleButton: React.FC<Props> = ({ href, icon }) => {
  const router = useRouter()

  return (
    <div
      onClick={() => {
        router.push(href)
      }}
      className="flex items-center justify-center fixed bottom-6 h-14 w-14 bg-blue-500 hover:bg-blue-600 rounded-full text-2xl cursor-pointer text-slate-50"
    >
      {icon}
    </div>
  )
}

export default MiddleButton

import { Dialog } from "@headlessui/react"
import { useRouter } from "next/router"
import React, { useState } from "react"
import { HiX } from "react-icons/hi"
import { SiLastpass } from "react-icons/si"

const OpenROszTIForm = () => {
  const [code, setCode] = useState("")
  const [isOpen, setIsOpen] = useState(true)
  const router = useRouter()

  return (
    <Dialog
      open={isOpen}
      onClose={() => {
        setIsOpen(false)
        router.push("/")
      }}
      as="div"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 text-slate-500"
    >
      <form action="" className="w-72 bg-white rounded-md p-4">
        <p className="text-xl font-bold mb-4 ">openRÖszTI</p>
        <div className="relative flex items-center">
          <SiLastpass className="absolute left-2" />
          <input
            type="text"
            value={code}
            onChange={(e) =>
              setCode(e.target.value.toLocaleUpperCase().slice(0, 6))
            }
            placeholder="RÖszTI Code"
            className="bg-gray-50 rounded-md pl-8 pr-4 py-1.5 outline-none text-sm w-full"
          />
        </div>
        <p className="text-xs inline-block mt-1">
          <span className="font-semibold text-soft-green">Hint</span> the code
          was sent in a mail previously.
        </p>
        <button className="bg-soft-green py-1 px-4 rounded-md text-slate-50 w-full text-sm mt-3">
          Next
        </button>
      </form>
    </Dialog>
  )
}

export default OpenROszTIForm

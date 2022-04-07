import { Dialog } from "@headlessui/react"
import { useRouter } from "next/router"
import React, { useState } from "react"
import { HiX } from "react-icons/hi"
import { SiLastpass } from "react-icons/si"
import { VscSymbolString } from "react-icons/vsc"

const OpenROszTIForm = () => {
  const [code, setCode] = useState("")
  const router = useRouter()

  return (
    <form action="" className="w-full bg-white rounded-md p-4">
      <p className="text-xl font-bold mb-6">openRÖszTI</p>
      <div className="relative flex items-center">
        <VscSymbolString className="absolute left-2" />
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
        <span className="font-semibold text-soft-green">Hint:</span> the code
        was sent in a mail previously.
      </p>
      <button className="bg-soft-green hover:bg-darker-soft-green py-1 px-4 rounded-md text-slate-50 w-full text-sm mt-3">
        Next
      </button>
    </form>
  )
}

export default OpenROszTIForm

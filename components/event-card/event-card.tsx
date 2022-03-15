import React from "react"
import { HiOutlineDotsHorizontal } from "react-icons/hi"

interface Props {
  id: string
  title: string
  date: Date
  description: string
}

const EventCard: React.FC = () => {
  return (
    <div className="flex flex-col items-start justify-center px-4 py-3 bg-light-gray rounded-lg">
      <div className="flex items-center justify-between w-full">
        <p className="font-semibold text-2xl">Europe 3D Budapest</p>
        <HiOutlineDotsHorizontal className="cursor-pointer text-lg" />
      </div>
      <div className="flex items-center justify-center space-x-2">
        <p className="-mt-0.5 mb-1 text-blue-500 text-sm">2022.03.13.</p>
      </div>
      <p className="">
        Be a helper or just enjoy some time with ESTIEMers from all around
        Europe.
      </p>
      <button className="bg-blue-500 hover:bg-blue-600 w-full rounded-md mt-3 text-base outline-none py-1">
        Join
      </button>
    </div>
  )
}

export default EventCard

import React from "react"
import { Menu } from "@headlessui/react"
import { FaWalking, FaBookmark } from "react-icons/fa"
import { RiStickyNote2Fill } from "react-icons/ri"

const Header = () => {
  return (
    <div className="fixed inset-x-0 top-0 w-full h-12 flex items-center px-6 justify-between">
      <div className="font-semibold">
        <span className="text-blue-500 mr-0">QR</span>RÖszTI
      </div>
      <Menu as="div" className="relative">
        <Menu.Button className="text-sm outline-none">My Profile</Menu.Button>
        <Menu.Items className="absolute right-0 w-36 mt-2 origin-top-right text-sm bg-slate-200 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none text-inherit dark:bg-light-gray px-1 py-1">
          <Menu.Item
            className="flex items-center justify-start py-2 hover:bg-blue-500 hover:text-slate-200 rounded-md px-2"
            as="div"
          >
            <FaBookmark className="mr-2 text-xs" />
            My Activity
          </Menu.Item>
          <Menu.Item
            className="flex items-center justify-start py-2 hover:bg-blue-500 hover:text-slate-200 rounded-md px-2"
            as="div"
          >
            <FaWalking className="mr-2" />
            Logout
          </Menu.Item>
        </Menu.Items>
      </Menu>
    </div>
  )
}

export default Header

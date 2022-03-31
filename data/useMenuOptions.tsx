import React from "react"
import { FaPaperPlane, FaAddressBook } from "react-icons/fa"
import { IoGrid, IoCalendarClear, IoEarthSharp } from "react-icons/io5"
import { IoMdListBox, IoMdSettings } from "react-icons/io"
import { MdCardGiftcard } from "react-icons/md"
import { RiQrCodeLine, RiWalkFill, RiAccountBoxFill } from "react-icons/ri"
import { useRouter } from "next/router"

export interface MenuOptions {
  title: string
  icon: JSX.Element
  group: string
  individual?: boolean
  action?: (...args: any) => void
}

export const useMenuOptions = () => {
  const router = useRouter()

  const menuOptions: MenuOptions[] = [
    {
      title: "My RÖszTI",
      icon: <IoGrid />,
      group: "Main",
    },
    {
      title: "Events",
      icon: <FaPaperPlane />,
      group: "Main",
    },
    {
      title: "openRÖszTI",
      icon: <FaAddressBook />,
      group: "My RÖszTI",
      action: () => router.push("/openroszti"),
    },
    {
      title: "QR Code",
      icon: <RiQrCodeLine className="text-base" />,
      group: "My RÖszTI",
    },
    {
      title: "Upcoming Events",
      icon: <IoCalendarClear />,
      group: "Events",
    },
    {
      title: "Event List",
      icon: <IoMdListBox className="text-base" />,
      group: "Events",
    },
    {
      title: "Central Portal",
      icon: <IoEarthSharp />,
      group: "Main",
      individual: true,
      action: () => window.open("https://estiem.org/", "_blank"),
    },
    {
      title: "Account",
      icon: <RiAccountBoxFill />,
      group: "Profile",
    },
    {
      title: "Settings",
      icon: <IoMdSettings />,
      group: "Profile",
    },
    {
      title: "Logout",
      icon: <RiWalkFill />,
      group: "Profile",
    },
  ]

  return { menuOptions }
}

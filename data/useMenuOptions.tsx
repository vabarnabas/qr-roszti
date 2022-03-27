import React from "react"
import { HiFolder, HiLink } from "react-icons/hi"
import { MdOutlineDriveFolderUpload } from "react-icons/md"
import {
  FaShoppingBasket,
  FaUser,
  FaUserTag,
  FaUserFriends,
  FaPaperPlane,
  FaAddressBook,
} from "react-icons/fa"
import { AiFillTag, AiFillCloud } from "react-icons/ai"
import {
  IoShareSocialSharp,
  IoLanguageSharp,
  IoAnalyticsSharp,
  IoGrid,
  IoInvertModeSharp,
  IoCubeSharp,
  IoCalendarClear,
} from "react-icons/io5"
import { IoMdListBox, IoMdSettings } from "react-icons/io"
import { MdCardGiftcard, MdSignalWifiStatusbar3Bar } from "react-icons/md"
import { RiQrCodeLine, RiWalkFill, RiAccountBoxFill } from "react-icons/ri"
import { BsFillPersonBadgeFill } from "react-icons/bs"
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
      icon: <IoGrid />,
      group: "Main",
      individual: true,
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

import React from "react"
import {
  FaPaperPlane,
  FaAddressBook,
  FaFolder,
  FaGoogleDrive,
  FaFacebookSquare,
  FaUser,
  FaUserFriends,
  FaUserCog,
} from "react-icons/fa"
import {
  IoGrid,
  IoCalendarClear,
  IoEarthSharp,
  IoHammer,
} from "react-icons/io5"
import { IoMdListBox, IoMdSettings } from "react-icons/io"
import { RiQrCodeLine, RiWalkFill, RiAccountBoxFill } from "react-icons/ri"
import { useRouter } from "next/router"
import { signOut } from "firebase/auth"
import { auth } from "../services/firebase-provider"
import { MdSettings } from "react-icons/md"

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
      icon: <RiQrCodeLine />,
      group: "My RÖszTI",
    },
    {
      title: "Upcoming Events",
      icon: <IoCalendarClear />,
      group: "Events",
    },
    {
      title: "Event List",
      icon: <IoMdListBox />,
      group: "Events",
    },
    {
      title: "Resources",
      icon: <FaFolder />,
      group: "Main",
    },
    {
      title: "Google Drive",
      icon: <FaGoogleDrive />,
      group: "Resources",
      action: () =>
        window.open(
          "https://drive.google.com/drive/folders/0B26PP4TNCrAyQXViU1oya1ByNWc?resourcekey=0-923zeVTaOjCmGnPJohtA0A&usp=sharing",
          "_blank"
        ),
    },
    {
      title: "Facebook Page",
      icon: <FaFacebookSquare />,
      group: "Resources",
      action: () =>
        window.open("https://www.facebook.com/estiembudapestbme", "_blank"),
    },
    {
      title: "Facebook Group",
      icon: <FaFacebookSquare />,
      group: "Resources",
      action: () =>
        window.open(
          "https://www.facebook.com/groups/estiem.budapest",
          "_blank"
        ),
    },
    {
      title: "Tools",
      icon: <IoHammer />,
      group: "Main",
    },
    {
      title: "Mass Upload",
      icon: <IoHammer />,
      group: "Tools",
    },
    {
      title: "Code Generator",
      icon: <IoHammer />,
      group: "Tools",
    },
    {
      title: "Event Manager",
      icon: <IoHammer />,
      group: "Tools",
    },
    {
      title: "Configuration",
      icon: <MdSettings />,
      group: "Main",
    },
    {
      title: "Users",
      icon: <FaUserCog />,
      group: "Configuration",
      action: () => router.push("/users"),
    },
    {
      title: "User Roles",
      icon: <FaUserFriends />,
      group: "Configuration",
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
      action: () => router.push("/account"),
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
      action: () => {
        signOut(auth)
        router.push("/login")
      },
    },
  ]

  return { menuOptions }
}

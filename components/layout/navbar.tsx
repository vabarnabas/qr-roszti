import React from "react"
import { useState } from "react"
import { HiChevronDown, HiChevronUp, HiTerminal } from "react-icons/hi"
import { useMenuOptions } from "../../data/useMenuOptions"
import CommandPalette from "../command-palette/command-palette"

const Navbar = () => {
  const [openGroups, setOpenGroups] = useState<string[]>([])

  const { menuOptions } = useMenuOptions()

  const onGroupToggle = (item: string) => {
    !openGroups.includes(item)
      ? setOpenGroups([...openGroups, item])
      : setOpenGroups(openGroups.filter((string) => string !== item))
  }

  return (
    <div className=" h-full w-72 overflow-y-auto bg-gray-50 px-4 pt-6 pb-12 text-inherit scrollbar-hide">
      <CommandPalette />
      <div className="fixed bottom-0 left-0 flex h-10 w-72 items-center bg-soft-gray px-4 bg-inherit">
        <HiTerminal className="cursor-pointer" />
      </div>
      <div
        onClick={() => onGroupToggle("Profile")}
        className={`flex w-full cursor-pointer items-center justify-center px-2 py-2 outline-none hover:bg-slate-200 ${
          openGroups.includes("Profile")
            ? "rounded-t-md bg-slate-200"
            : "rounded-md"
        }`}
      >
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-500 text-xs text-white">
          VB
        </div>
        <div className="ml-4 flex flex-col items-stretch">
          <p className="text-sm font-bold text-blue-500">RÖszTI Suite</p>
          <p className="text-xs">Varga Barnabás</p>
        </div>
        {openGroups.includes("Profile") ? (
          <HiChevronUp className="ml-auto text-3xl" />
        ) : (
          <HiChevronDown className="ml-auto text-3xl" />
        )}
      </div>
      {openGroups.includes("Profile") && (
        <div className="w-full cursor-pointer rounded-b-md bg-slate-200 px-2 py-2">
          {menuOptions
            .filter((object) => object.group === "Profile")
            .map((item) => (
              <div
                key={item.title}
                className="flex items-center rounded-md py-2 px-2 hover:bg-blue-500 hover:text-slate-50"
              >
                <div className="mr-3 text-sm">{item.icon}</div>
                <p className="text-xs">{item.title}</p>
              </div>
            ))}
        </div>
      )}
      <div className="mt-6 flex flex-col items-start space-y-2">
        {menuOptions
          .filter((object) => object.group === "Main")
          .map((item) => (
            <div key={item.title} className="w-full">
              <div
                className="flex cursor-pointer items-center rounded-md py-2.5 px-3 hover:bg-slate-200"
                onClick={() => onGroupToggle(item.title)}
              >
                <div className="mr-3 text-base">{item.icon}</div>
                <p className="text-sm">{item.title}</p>
                {!item?.individual &&
                  (openGroups.includes(item.title) ? (
                    <HiChevronUp className="ml-auto text-xl" />
                  ) : (
                    <HiChevronDown className="ml-auto text-xl" />
                  ))}
              </div>
              {openGroups.includes(item.title) &&
                menuOptions
                  .filter((object) => object.group === item.title)
                  .map((subItem) => (
                    <div
                      key={subItem.title}
                      className="mt-1 ml-4 mr-2 flex cursor-pointer items-center rounded-md py-1.5 px-2 hover:bg-slate-200"
                    >
                      <div className="mr-3 text-sm">{subItem.icon}</div>
                      <p className="text-xs">{subItem.title}</p>
                    </div>
                  ))}
            </div>
          ))}
      </div>
    </div>
  )
}

export default Navbar

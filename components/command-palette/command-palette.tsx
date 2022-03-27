import React from "react"
import { Dialog, Combobox } from "@headlessui/react"
import { useEffect, useState } from "react"
import { useMenuOptions } from "../../data/useMenuOptions"

const CommandPalette: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [query, setQuery] = useState<string>("")

  const { menuOptions } = useMenuOptions()

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        setIsOpen(!isOpen)
      }
    }

    window.addEventListener("keydown", (e) => onKeyDown(e))
    return () => {
      window.removeEventListener("keydown", (e) => onKeyDown(e))
    }
  }, [])

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="fixed inset-0 z-50 flex justify-center bg-black/20 text-slate-500"
    >
      <Combobox
        className="fixed top-[15%] w-1/2 rounded-md bg-white"
        value=""
        as="div"
        onChange={(item) => {
          const selectedOption = menuOptions.filter(
            (object) => object.title === item
          )[0]
          console.log(selectedOption)
          selectedOption?.action && selectedOption?.action()
          setQuery("")
          setIsOpen(false)
        }}
      >
        <Combobox.Input
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search in OpenCart..."
          className="h-full w-full border-0 bg-transparent px-4 py-3 outline-none"
        />
        <Combobox.Options
          static
          className="max-h-64 overflow-y-auto scrollbar-hide m-2"
        >
          {menuOptions.filter(
            (object) =>
              object.title.toLowerCase().includes(query.toLocaleLowerCase()) ||
              object.group
                .toLocaleLowerCase()
                .includes(query.toLocaleLowerCase())
          ).length > 0 ? (
            menuOptions
              .filter(
                (object) =>
                  (object.title
                    .toLowerCase()
                    .includes(query.toLocaleLowerCase()) ||
                    (object.group
                      .toLocaleLowerCase()
                      .includes(query.toLocaleLowerCase())) &&
                  object.group !== "Main")
              )
              .map((option) => (
                <Combobox.Option
                  key={option.title + option.group}
                  value={option.title}
                  className=""
                >
                  {({ active }) => (
                    <div
                      className={`flex w-full cursor-pointer items-center rounded-md px-2 py-2 text-sm ${
                        active ? "bg-blue-500 text-slate-50" : ""
                      }`}
                    >
                      <div className="mr-3 text-sm">{option.icon}</div>
                      <p className="">{option.title}</p>
                      <p
                        className={`ml-1 ${
                          active ? "text-slate-200" : "text-slate-400"
                        }`}
                      >
                        {" in " + option.group}
                      </p>
                    </div>
                  )}
                </Combobox.Option>
              ))
          ) : (
            <p className="px-4 py-2 text-sm text-slate-400">
              No results found.
            </p>
          )}
        </Combobox.Options>
      </Combobox>
    </Dialog>
  )
}

export default CommandPalette

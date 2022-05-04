import type { NextPage } from "next"
import Layout from "../components/layout"
import { useMenuOptions } from "../data/useMenuOptions"

const Home: NextPage = () => {
  const { menuOptions } = useMenuOptions()

  return (
    <Layout>
      <div className="w-full h-full flex items-center justify-start flex-col px-8 py-6 overflow-y-auto space-y-2 scrollbar-hide">
        <div className="grid grid-cols-2 w-full gap-x-4 gap-y-2">
          {menuOptions
            .filter((object) => object.group !== "Main")
            .map((option) => (
              <div
                onClick={() => option.action && option.action()}
                key={option.title}
                className="w-full py-3 px-3 hover:border-soft-green group rounded-md flex items-center justify-start border cursor-pointer"
              >
                <span className="text-sm group-hover:text-soft-green">
                  {option.icon}
                </span>
                <p className="ml-2 group-hover:text-soft-green text-sm text-center leading-tight">
                  {option.title}
                </p>
              </div>
            ))}
        </div>
      </div>
    </Layout>
  )
}

export default Home

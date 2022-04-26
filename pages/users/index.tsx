import { useRouter } from "next/router"
import React, { useState } from "react"
import { HiExternalLink } from "react-icons/hi"
import { IoCube, IoSearch } from "react-icons/io5"
import { useQuery } from "urql"
import Layout from "../../components/layout"
import { queryUsers } from "../../graphql/queries"

interface User {
  id: string
  googleid: string
  role: string
  displayname: string
  email: string
  createdat: Date
  code: string
}

const Users = () => {
  const [{ data, fetching }] = useQuery({ query: queryUsers })
  const router = useRouter()
  const [searchString, setSearchString] = useState("")

  return (
    <Layout>
      <div className="w-full h-full flex flex-col items-start justify-start py-6 px-8">
        <div className="flex w-full gap-x-4">
          <div className="relative flex items-center w-full">
            <IoSearch className="absolute left-2" />
            <input
              placeholder="Search in Users"
              value={searchString}
              onChange={(e) => setSearchString(e.target.value)}
              type="text"
              className="form-input-field"
            />
          </div>
          <button
            onClick={() => router.push("/users/new")}
            className="bg-soft-green hover:bg-darker-soft-green flex items-center justify-center text-white py-1 rounded-md text-sm px-8"
          >
            New
          </button>
        </div>
        <div className="flex flex-1 mt-4 w-full">
          <div className="w-full h-min gap-x-4 gap-y-2 grid grid-cols-1 lg:grid-cols-3">
            {data?.users_aggregate?.nodes &&
              data.users_aggregate.nodes
                .filter((object: User) =>
                  object.displayname
                    .toLowerCase()
                    .includes(searchString.toLocaleLowerCase())
                )
                .map((item: User) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between w-full rounded-md bg-slate-50 px-4 py-2 h-min"
                  >
                    <div className="">
                      <p className="font-semibold text-lg">
                        {item.displayname}
                      </p>
                      <p className="-mt-1 text-xs">{item.email}</p>
                    </div>
                    <HiExternalLink className="text-xl cursor-pointer hover:text-soft-green" />
                  </div>
                ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Users

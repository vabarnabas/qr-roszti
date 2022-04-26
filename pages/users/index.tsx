import { useRouter } from "next/router"
import React from "react"
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

  return (
    <Layout>
      <div className="w-full h-full flex flex-col items-start justify-start py-6 px-8">
        <div className="flex w-full gap-x-4">
          <div className="relative flex items-center w-full">
            <IoSearch className="absolute left-2" />
            <input
              placeholder="Search in Users"
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
        <div className="flex flex-1 mt-4">
          {data?.users_aggregate?.nodes &&
            data.users_aggregate.nodes.map((item: User) => (
              <div key={item.id} className="">
                {item.displayname}
              </div>
            ))}
        </div>
      </div>
    </Layout>
  )
}

export default Users

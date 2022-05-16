import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import { FaKey, FaUserAlt } from "react-icons/fa"
import { HiExternalLink } from "react-icons/hi"
import { IoCube, IoSearch } from "react-icons/io5"
import { MdDelete } from "react-icons/md"
import { useMutation, useQuery } from "urql"
import Layout from "../../components/layout"
import Spinner from "../../components/spinner/spinner"
import { mutateDeleteUser } from "../../graphql/mutations"
import { queryUsers } from "../../graphql/queries"
import { chainFilter } from "../../services/chainFilter"

const Users = () => {
  const [{ data, fetching }, getUsers] = useQuery({ query: queryUsers })
  const [, removeUser] = useMutation(mutateDeleteUser)
  const router = useRouter()
  const [loading, setLoading] = useState<boolean>(false)
  const [searchString, setSearchString] = useState("")

  useEffect(() => {
    const reFetch = async () => {
      await getUsers()
    }
    reFetch()
  }, [])

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
          {fetching || loading ? (
            <div className="h-full w-full flex items-center justify-center">
              <Spinner />
            </div>
          ) : (
            <div className="w-full h-min gap-x-4 gap-y-3 grid grid-cols-1">
              {data?.users_aggregate?.nodes &&
                chainFilter(data.users_aggregate.nodes)
                  .startGroup()
                  .filterText(searchString, true, "displayname")
                  .filterText(searchString, true, "role")
                  .endGroup()
                  .out()
                  .map((item: User) => (
                    <div
                      key={item.id}
                      className="group flex items-center justify-between w-full rounded-md bg-slate-50 cursor-pointer px-4 py-2 h-min"
                    >
                      <div className="flex items-center">
                        {item.role === "ADMIN" ? (
                          <FaKey className="text-sm" />
                        ) : (
                          <FaUserAlt className="text-sm" />
                        )}
                        <div className="ml-4">
                          <p className="font-semibold text-lg">
                            {item.displayname}
                          </p>
                          <p className="-mt-1 text-xs">{item.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-center space-x-2">
                        <MdDelete
                          onClick={async () => {
                            setLoading(true)
                            await removeUser({ id: item.id })
                            await getUsers()
                            setLoading(false)
                          }}
                          className="text-xl cursor-pointer hover:text-soft-yellow"
                        />
                        <HiExternalLink
                          onClick={() =>
                            router.push({
                              pathname: "/openroszti",
                              query: { q: item.code },
                            })
                          }
                          className="text-xl cursor-pointer hover:text-soft-green"
                        />
                      </div>
                    </div>
                  ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}

export default Users

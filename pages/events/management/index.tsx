import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import { HiExternalLink } from "react-icons/hi"
import { IoCube, IoSearch } from "react-icons/io5"
import { MdDelete } from "react-icons/md"
import { useMutation, useQuery } from "urql"
import Layout from "../../../components/layout"
import Spinner from "../../../components/spinner/spinner"
import { mutateDeleteEvent, mutateDeleteUser } from "../../../graphql/mutations"
import { queryEvents, queryUsers } from "../../../graphql/queries"

const Events = () => {
  const [{ data, fetching }, getEvents] = useQuery({ query: queryEvents })
  const [, removeEvent] = useMutation(mutateDeleteEvent)
  const router = useRouter()
  const [loading, setLoading] = useState<boolean>(false)
  const [searchString, setSearchString] = useState("")

  useEffect(() => {
    const reFetch = async () => {
      await getEvents()
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
              placeholder="Search in Events"
              value={searchString}
              onChange={(e) => setSearchString(e.target.value)}
              type="text"
              className="form-input-field"
            />
          </div>
          <button
            onClick={() => router.push("/events/management/new")}
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
            <div className="w-full h-min gap-x-4 gap-y-2 grid grid-cols-1 lg:grid-cols-1">
              {data?.events_aggregate?.nodes &&
                data.events_aggregate.nodes
                  .filter((object: Event) =>
                    object.displayname
                      .toLowerCase()
                      .includes(searchString.toLocaleLowerCase())
                  )
                  .map((item: Event) => (
                    <div
                      key={item.id}
                      className="group flex items-center justify-between w-full rounded-md bg-slate-50 cursor-pointer px-4 py-2 h-min"
                    >
                      <div className="mr-2">
                        <p className="font-semibold text-lg">
                          {item.displayname}
                        </p>
                        <p className="text-xs -mt-0.5 text-soft-green">{`Created by ${item.user?.displayname}.`}</p>
                        <p className="text-sm mt-2">{item.description}</p>
                        <p className="text-xs mt-2 font-semibold">
                          {new Date(item.eventdate).toLocaleString("hu-HU")}
                        </p>
                      </div>
                      <div className="flex items-center justify-center space-x-2">
                        <MdDelete
                          onClick={async () => {
                            setLoading(true)
                            await removeEvent({ id: item.id })
                            await getEvents()
                            setLoading(false)
                          }}
                          className="text-xl cursor-pointer hover:text-soft-yellow"
                        />
                        <HiExternalLink className="text-xl cursor-pointer hover:text-soft-green" />
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

export default Events

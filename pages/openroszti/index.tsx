import { stat } from "fs"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import { VscSymbolString } from "react-icons/vsc"
import { useQuery, useQueryClient } from "react-query"
import Layout from "../../components/layout"
import OpenROszTIForm from "../../components/openroszti-form/openroszti-form"
import Spinner from "../../components/spinner/spinner"

interface ROszTIDataType {
  event: string
  point: string
}

const OpenROszTI = () => {
  const [queryCode, setQueryCode] = useState("")
  const router = useRouter()
  const { q: code } = router.query

  const {
    data: ROszTIData,
    status,
    refetch,
  } = useQuery(
    "roszti-data",
    async () => {
      const res = await fetch(
        `https://us-central1-open-roszti.cloudfunctions.net/app/users/data/${
          Array.isArray(code) ? code[0] : code
        }?range=2021-2022%20tavasz%20events`,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        }
      )
      return res.json()
    },
    {
      enabled: false,
    }
  )

  useEffect(() => {
    const fetchIfCode = async () => {
      if (router.isReady && code) {
        await setQueryCode(Array.isArray(code) ? code[0] : code)
        await refetch()
      }
    }

    fetchIfCode()
  }, [router.isReady, router.query, queryCode])

  useEffect(() => {
    const reloadOnError = async () => {
      if (ROszTIData?.message) {
        await router.push({ pathname: router.pathname, query: {} })
        await router.reload()
      }
    }
    reloadOnError()
  }, [ROszTIData])

  return (
    <Layout>
      {status === "loading" ? (
        <Spinner />
      ) : (
        <div className="w-full h-full flex flex-col items-start justify-start py-6 px-8">
          {!ROszTIData && <OpenROszTIForm />}
          {ROszTIData && !ROszTIData?.message && (
            <div className="w-full grid lg:grid-cols-2 mb-3 gap-x-4 gap-y-2">
              <div className="grid w-full grid-flow-col gap-x-6 items-center justify-between bg-slate-50 py-1 px-4 rounded-md">
                <div className="flex items-center justify-center flex-col">
                  <p className="font-bold">
                    {ROszTIData[ROszTIData.length - 2]?.point}
                  </p>
                  <p className="text-sm text-center">Points</p>
                </div>
                {parseInt(ROszTIData[ROszTIData.length - 2]?.point) < 6 ? (
                  <p className="text-xs">
                    You need
                    <span className="mx-1 text-soft-green font-semibold">
                      {6 - parseInt(ROszTIData[ROszTIData.length - 2]?.point)}
                    </span>
                    more points to be active.
                    <span className="text-soft-green hover:underline cursor-pointer">
                      Go to upcoming events.
                    </span>
                  </p>
                ) : (
                  <p className="text-xs">
                    You already reached active member status, but there are
                    always more events to see.
                  </p>
                )}
              </div>
              <div className="grid w-full grid-flow-col gap-x-6 items-center justify-between bg-slate-50 py-1 px-4 rounded-md">
                <div className="flex items-center justify-center flex-col">
                  <p className="font-bold">
                    {ROszTIData[ROszTIData.length - 1]?.point}
                  </p>
                  <p className="text-sm text-center">Vote</p>
                </div>
                <p className="">
                  {" "}
                  {ROszTIData[ROszTIData.length - 3]?.point === "Not Active" ? (
                    <p className="text-xs">
                      Sadly in this semester you{" "}
                      <span className="text-soft-green">haven't</span> reached
                      the requirement of the active members.
                    </p>
                  ) : (
                    <p className="text-xs">
                      Congratulations, this semester you{" "}
                      <span className="text-soft-green">are a part of</span> the
                      active members. Hope to see you in upcoming events.
                    </p>
                  )}
                </p>
              </div>
            </div>
          )}
          {ROszTIData && !ROszTIData?.message && (
            <div className="w-full mt-3 ">
              <p className="mb-1 text-sm">Events</p>
              <div className="w-full grid-cols-1 lg:grid-cols-2 grid gap-x-4 gap-y-2">
                {ROszTIData.slice(0, ROszTIData.length - 3).map(
                  (item: ROszTIDataType) => (
                    <div
                      key={item.event + item.point}
                      className="flex items-center justify-between bg-slate-50 py-2 px-4 rounded-md"
                    >
                      <p className="">{item.event}</p>
                      <p className="font-semibold">{item.point}</p>
                    </div>
                  )
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </Layout>
  )
}

export default OpenROszTI

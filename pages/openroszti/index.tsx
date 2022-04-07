import React, { useState } from "react"
import { VscSymbolString } from "react-icons/vsc"
import { useQuery, useQueryClient } from "react-query"
import Layout from "../../components/layout"

interface ROszTIDataType {
  event: string
  point: string
}

const OpenROszTI = () => {
  const [queryCode, setQueryCode] = useState("")
  const {
    data: ROszTIData,
    status,
    refetch,
  } = useQuery(
    "roszti-data",
    async () => {
      const res = await fetch(
        `https://us-central1-open-roszti.cloudfunctions.net/app/users/data/pvep31?range=2021-2022%20tavasz%20events`
      )
      return res.json()
    },
    {
      enabled: false,
    }
  )

  return (
    <Layout>
      <div className="w-full h-full flex flex-col items-start justify-start py-6 px-8">
        {!ROszTIData && (
          <form
            onSubmit={(e) => {
              e.preventDefault()
              refetch()
            }}
            className="w-full"
          >
            <p className="text-xl font-bold mb-6">openRÖszTI</p>
            <div className="relative flex items-center">
              <VscSymbolString className="absolute left-2" />
              <input
                type="text"
                value={queryCode}
                onChange={(e) =>
                  setQueryCode(e.target.value.toLocaleUpperCase().slice(0, 6))
                }
                placeholder="RÖszTI Code"
                className="bg-gray-50 rounded-md pl-8 pr-4 py-1.5 outline-none text-sm w-full"
              />
            </div>
            <p className="text-xs inline-block mt-1">
              <span className="font-semibold text-soft-green">Hint:</span> the
              code was sent in a mail previously.
            </p>
            <button className="bg-soft-green hover:bg-darker-soft-green py-1 px-4 rounded-md text-slate-50 w-full text-sm mt-3">
              Next
            </button>
          </form>
        )}
        {ROszTIData && (
          <div className="w-full grid grid-cols-2 mb-3 gap-x-4">
            <div className="hidden md:grid w-full grid-flow-col gap-x-8 items-center justify-center bg-slate-50 py-1 px-4 rounded-md">
              <div className="flex items-center justify-center flex-col">
                <p className="font-bold">
                  {ROszTIData[ROszTIData.length - 2].point}
                </p>
                <p className="mr-2 text-sm">Elért Pontszám</p>
              </div>
              {parseInt(ROszTIData[ROszTIData.length - 2].point) < 6 && (
                <p className="text-xs mt-2">
                  Még
                  <span className="mx-1 text-soft-green font-semibold">
                    {6 - parseInt(ROszTIData[ROszTIData.length - 2].point)}
                  </span>
                  pontot kell elérned az aktív tagsághoz.
                  <span className="text-soft-green hover:underline ml-1 cursor-pointer">
                    Tovább az elkövetkező eseményekhez.
                  </span>
                </p>
              )}
            </div>
            <div className="grid grid-rows-2 gap-y-2">
              <div className="w-full flex flex-col items-center justify-center bg-slate-50 py-1 px-4 rounded-md">
                <p className="">{ROszTIData[ROszTIData.length - 1].point}</p>
                <p className="mr-2 text-sm">Elért Pontszám</p>
              </div>
              <div className="w-full flex flex-col items-center justify-center bg-slate-50 py-1 px-4 rounded-md">
                <p className="font-bold">
                  {ROszTIData[ROszTIData.length - 3].point}
                </p>
                <p className="mr-2 text-sm">Státusz</p>
              </div>
            </div>
          </div>
        )}
        {ROszTIData && <p className="mb-1 text-sm">Események</p>}
        {ROszTIData && (
          <div className="w-full grid-cols-2 grid gap-x-4 gap-y-2">
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
        )}
      </div>
    </Layout>
  )
}

export default OpenROszTI

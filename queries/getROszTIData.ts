import { Params } from "next/dist/server/router"

export const getROszTIData = async (params: Params) => {
  const [, { queryCode }] = params.queryKey

  const res = await fetch(
    `https://us-central1-open-roszti.cloudfunctions.net/app/users/data/${queryCode}?range=2021-2022%20%C5%91sz%20events`
  )
  return res.json()
}

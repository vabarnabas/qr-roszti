import React from "react"
import Layout from "../../components/layout"

const HubView = () => {
  return (
    <Layout>
      <div className="flex flex-col items-start justify-center">
        <p className="pl-3 w-full font-semibold text-2xl">Upcoming Events</p>
        <div className="mt-4 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <div className="flex flex-col items-start justify-center px-4 py-3 bg-light-gray rounded-lg">
            <p className="font-semibold text-2xl">Europe 3D Budapest</p>
            <p className="mb-1 text-blue-500 text-sm">Local / Portal</p>
            <p className="">
              Be a helper or just enjoy some time with ESTIEMers from all around
              Europe.
            </p>
            <button className="bg-blue-500 hover:bg-blue-600 w-full rounded-md mt-3 text-sm outline-none py-1">
              Join
            </button>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default HubView

import React from "react"
import Layout from "../../components/layout"
import { HiOutlineDotsHorizontal } from "react-icons/hi"
import EventCard from "../../components/event-card/event-card"

const HubView = () => {
  return (
    <Layout>
      <div className="w-full h-full flex flex-col items-start justify-start overflow-y-auto py-6">
        <p className="first-letter:pl-3 w-full font-semibold text-2xl">
          Upcoming Events
        </p>
        <EventCard />
      </div>
    </Layout>
  )
}

export default HubView

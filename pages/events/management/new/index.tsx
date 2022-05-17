import { useRouter } from "next/router"
import React, { SyntheticEvent, useState } from "react"
import { CgRename } from "react-icons/cg"
import { FaUserFriends } from "react-icons/fa"
import { IoGrid } from "react-icons/io5"
import { MdOutlineAlternateEmail } from "react-icons/md"
import { useMutation } from "urql"
import Layout from "../../../../components/layout"
import { mutateNewEvent, mutateNewUser } from "../../../../graphql/mutations"
import { auth, useUser } from "../../../../providers/firebase-provider"
import { v4 as uuidv4 } from "uuid"
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { useUserStorage } from "../../../../providers/user.provider"
import { formatDate } from "../../../../services/formatDate"

interface EventData {
  displayName: string
  description: string
  eventLocation: string
  type: EventType
  deadline: Date
  eventDate: number
}

const NewEvent = () => {
  const router = useRouter()
  const { userStorage } = useUserStorage()
  const [formData, setFormData] = useState<EventData>({} as EventData)
  const [, createEvent] = useMutation(mutateNewEvent)

  const types: { name: string; type: EventType }[] = [
    {
      name: "Local",
      type: "LOCAL",
    },
    {
      name: "Central",
      type: "CENTRAL",
    },
    {
      name: "Open Call",
      type: "OPENCALL",
    },
  ]

  const handleChange = (e: any) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const onFormSubmit = async (e: SyntheticEvent) => {
    e.preventDefault()
    if (formData.type !== undefined) {
      await createEvent({
        id: uuidv4(),
        createdby: userStorage.id,
        displayname: formData.displayName,
        description: formData.description,
        eventlocation: formData.eventLocation,
        eventdate: formatDate(formData.eventDate),
        deadline: formatDate(formData.eventDate),
        eventtype: formData.type,
      })
    }
    await router.push("/events/management")
  }

  return (
    <Layout>
      <div className="w-full h-full flex flex-col items-start justify-start py-6 px-8">
        <form
          onSubmit={(e) => onFormSubmit(e)}
          action=""
          className="w-full bg-white rounded-md"
        >
          <p className="text-xl font-bold mb-6">New Event</p>
          <div className="grid grid-cols-1 gap-x-4 gap-y-4">
            <div className="relative flex items-center">
              <CgRename className="absolute left-2" />
              <input
                required
                name="displayName"
                type="text"
                value={formData.displayName}
                onChange={(e) => {
                  handleChange(e)
                }}
                placeholder="Display Name"
                className="form-input-field"
              />
            </div>
            <div className="relative flex items-center ">
              <MdOutlineAlternateEmail className="absolute left-2" />
              <textarea
                required
                name="description"
                value={formData.description}
                onChange={(e) => {
                  handleChange(e)
                }}
                placeholder="Description"
                className="form-input-field resize-none"
              />
            </div>
            <div className="relative flex items-center">
              <IoGrid className="absolute left-2" />
              <input
                required
                type="text"
                name="eventLocation"
                value={formData.eventLocation}
                onChange={(e) => {
                  handleChange(e)
                }}
                placeholder="Event Location"
                className="form-input-field"
              />
            </div>
            <div className="">
              <p className="mb-1 text-xs">Type</p>
              <div className="flex w-full cursor-pointer flex-col justify-between divide-y overflow-hidden rounded-md bg-gray-50 text-sm">
                {types.map((item) => (
                  <p
                    key={item.name}
                    onClick={() =>
                      setFormData({ ...formData, type: item.type })
                    }
                    className={`flex w-full items-center justify-center py-1 ${
                      formData.type === item.type
                        ? "bg-soft-green text-white"
                        : "bg-gray-50"
                    }`}
                  >
                    {item.name}
                  </p>
                ))}
              </div>
            </div>
            <div className="">
              <p className="mb-1 text-xs">Event Date</p>
              <div className="relative flex items-center">
                <IoGrid className="absolute left-2" />
                <input
                  required
                  type="date"
                  name="eventDate"
                  value={formData.eventDate}
                  onChange={(e) => {
                    handleChange(e)
                  }}
                  placeholder="Event Date"
                  className="form-input-field"
                />
              </div>
            </div>
          </div>
          <button className="bg-soft-green hover:bg-darker-soft-green py-1 px-4 rounded-md text-slate-50 w-full text-sm mt-3">
            Create
          </button>
        </form>
      </div>
    </Layout>
  )
}

export default NewEvent

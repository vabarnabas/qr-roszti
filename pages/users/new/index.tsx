import { useRouter } from "next/router"
import React, { SyntheticEvent, useState } from "react"
import { CgRename } from "react-icons/cg"
import { FaUserFriends } from "react-icons/fa"
import { IoGrid } from "react-icons/io5"
import { MdOutlineAlternateEmail } from "react-icons/md"
import { useMutation } from "urql"
import Layout from "../../../components/layout"
import { mutateNewUser } from "../../../graphql/mutations"
import { useUser } from "../../../services/firebase-provider"
import { v4 as uuidv4 } from "uuid"

interface UserData {
  displayName: string
  email: string
  code: string
  role: string
}

const NewUser = () => {
  const router = useRouter()
  const user = useUser()
  const [formData, setFormData] = useState<UserData>({} as UserData)
  const [, createUser] = useMutation(mutateNewUser)

  const handleChange = (e: any) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const onFormSubmit = async (e: SyntheticEvent) => {
    e.preventDefault()
    await createUser({
      id: uuidv4(),
      displayname: formData.displayName,
      email: formData.email,
      code: formData.code,
      role: formData.role,
    })
    await router.push("/users")
  }

  return (
    <Layout>
      <div className="w-full h-full flex flex-col items-start justify-start py-6 px-8">
        <form
          onSubmit={(e) => onFormSubmit(e)}
          action=""
          className="w-full bg-white rounded-md"
        >
          <p className="text-xl font-bold mb-6">New User</p>
          <div className="grid grid-cols-2 gap-x-4 gap-y-4">
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
            <div className="relative flex items-center">
              <MdOutlineAlternateEmail className="absolute left-2" />
              <input
                required
                type="email"
                name="email"
                value={formData.email}
                onChange={(e) => {
                  handleChange(e)
                }}
                placeholder="Display Name"
                className="form-input-field"
              />
            </div>
            <div className="relative flex items-center">
              <IoGrid className="absolute left-2" />
              <input
                required
                type="text"
                name="code"
                value={formData.code}
                onChange={(e) => {
                  handleChange(e)
                }}
                placeholder="RÖszTI Code"
                className="form-input-field"
              />
            </div>
            <div className="relative flex items-center">
              <FaUserFriends className="absolute left-2" />
              <input
                required
                type="text"
                name="role"
                value={formData.role}
                onChange={(e) => {
                  handleChange(e)
                }}
                placeholder="Role"
                className="form-input-field"
              />
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

export default NewUser

import { updateProfile } from "firebase/auth"
import { useRouter } from "next/router"
import React, { SyntheticEvent, useEffect, useState } from "react"
import { IoCube } from "react-icons/io5"
import Layout from "../../components/layout"
import { auth, useUser } from "../../providers/firebase-provider"

interface UserData {
  displayName: string
  email: string
}

const Account = () => {
  const router = useRouter()
  const user = useUser()
  const [formData, setFormData] = useState<UserData>({} as UserData)

  const handleChange = (e: any) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  useEffect(() => {
    setFormData({
      displayName: user?.displayName || "",
      email: user?.email || "",
    })
  }, [user])

  const onSave = async (e: SyntheticEvent) => {
    e.preventDefault()
    await updateProfile(user, {
      displayName: formData.displayName,
    })
    // await router.reload()
    await router.push("/")
  }

  return (
    <Layout>
      <div className="w-full h-full flex flex-col items-start justify-start py-6 px-8">
        <form onSubmit={(e) => onSave(e)} action="" className="w-full">
          <p className="text-xl font-bold mb-6">My Account</p>
          <div className="space-y-4">
            <div className="relative flex items-center">
              <IoCube className="absolute left-2" />
              <input
                name="displayName"
                value={formData.displayName}
                onChange={(e) => handleChange(e)}
                type="text"
                placeholder="Display Name"
                className="form-input-field"
              />
            </div>
            <div className="relative flex items-center">
              <IoCube className="absolute left-2" />
              <input
                name="email"
                value={formData.email}
                onChange={(e) => handleChange(e)}
                type="text"
                placeholder="E-mail Address"
                className="form-input-field"
              />
            </div>
            <button className="bg-soft-green hover:bg-darker-soft-green py-1 px-4 rounded-md text-slate-50 w-full text-sm">
              Save
            </button>
          </div>
        </form>
      </div>
    </Layout>
  )
}

export default Account

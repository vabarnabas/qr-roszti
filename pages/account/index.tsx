import { updateProfile } from "firebase/auth"
import { useRouter } from "next/router"
import React, { SyntheticEvent, useEffect, useState } from "react"
import { IoCube } from "react-icons/io5"
import { useMutation } from "urql"
import Layout from "../../components/layout"
import Spinner from "../../components/spinner/spinner"
import {
  mutateUpdateUser,
  mutateUpdateUserPassword,
} from "../../graphql/mutations"
import { auth, useUser } from "../../providers/firebase-provider"
import { useUserStorage } from "../../providers/user.provider"
import { hashPassword } from "../../services/api-handlers"

interface UserData {
  displayName: string
  email: string
  password: string
  confirmPassword: string
}

const Account = () => {
  const router = useRouter()
  const { userStorage, removeUser } = useUserStorage()
  const [formData, setFormData] = useState<UserData>({} as UserData)
  const [{ fetching }, updateUser] = useMutation(mutateUpdateUser)
  const [{ fetching: passwordFetching }, updatePassword] = useMutation(
    mutateUpdateUserPassword
  )

  const [error, setError] = useState("")

  const handleChange = (e: any) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  useEffect(() => {
    setFormData({
      displayName: userStorage?.displayname,
      email: userStorage?.email.toLowerCase(),
      password: "",
      confirmPassword: "",
    })
  }, [userStorage])

  const onSave = async (e: SyntheticEvent) => {
    e.preventDefault()
    await updateUser({
      id: userStorage.id,
      email: formData.email,
      displayname: formData.displayName,
    })
    await router.push("/")
  }

  const onPasswordSave = async (e: SyntheticEvent) => {
    e.preventDefault()
    if (formData.password !== "" || formData.confirmPassword !== "") {
      if (formData.confirmPassword === formData.password) {
        await updatePassword({
          id: userStorage.id,
          password: await hashPassword(formData.password),
        })
        removeUser()
        await router.push("/login")
      } else {
        setError("Passwords don't match.")
      }
    } else {
      setError("Passwords are empty.")
    }
  }

  return (
    <Layout>
      <div className="w-full h-full flex flex-col items-center justify-start py-6 px-8">
        {fetching || passwordFetching ? (
          <div className="w-full h-full flex flex-col items-center justify-center">
            <Spinner />
          </div>
        ) : (
          <div className="w-full">
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
                  Update
                </button>
              </div>
            </form>
            <form
              onSubmit={(e) => onPasswordSave(e)}
              action=""
              className="w-full mt-8"
            >
              <div className="space-y-4">
                <div className="relative flex items-center">
                  <IoCube className="absolute left-2" />
                  <input
                    name="password"
                    value={formData.password}
                    onChange={(e) => handleChange(e)}
                    type="password"
                    placeholder="Password"
                    className="form-input-field"
                  />
                </div>
                <div className="">
                  <div className="relative flex items-center">
                    <IoCube className="absolute left-2" />
                    <input
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={(e) => handleChange(e)}
                      type="password"
                      placeholder="Confirm Password"
                      className="form-input-field"
                    />
                  </div>
                  {error && (
                    <p className="text-xs mt-1 -mb-2 text-pink-500">{error}</p>
                  )}
                </div>
                <button className="bg-soft-green hover:bg-darker-soft-green py-1 px-4 rounded-md text-slate-50 w-full text-sm">
                  Update Password
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </Layout>
  )
}

export default Account

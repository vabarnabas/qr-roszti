import { useRouter } from "next/router"
import React, { SyntheticEvent, useEffect, useState } from "react"
import { BsFillEnvelopeFill } from "react-icons/bs"
import { MdPassword } from "react-icons/md"
import { useQuery } from "urql"
import Spinner from "../../components/spinner/spinner"
import { queryUserByEmail, queryUserById } from "../../graphql/queries"
import { auth } from "../../providers/firebase-provider"
import { useUserStorage } from "../../providers/user.provider"
import { comparePassword } from "../../services/api-handlers"

const LoginView = () => {
  const router = useRouter()
  const { createUser } = useUserStorage()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const [{ data, fetching }, getUserByEmail] = useQuery({
    query: queryUserByEmail,
    variables: { _eq: email },
    pause: true,
  })

  const [{ data: userData, fetching: userFetching }, getUserById] = useQuery({
    query: queryUserById,
    variables: { id: data?.users[0]?.id },
    pause: true,
  })

  const onFromSubmit = async (e: SyntheticEvent) => {
    e.preventDefault()
    setLoading(true)
    await getUserByEmail({ requestPolicy: "network-only" })
  }

  useEffect(() => {
    if (data && data.users.length > 0 && !fetching) {
      const authenticateUser = async () => {
        const match = await comparePassword(password, data?.users[0].password)
        if (match.message === "Success.") {
          await getUserById({ requestPolicy: "network-only" })
        } else {
          setError("Invalid e-mail or password.")
        }
      }
      authenticateUser()
    } else if (data && data.users.length === 0 && !fetching) {
      setError("User not found.")
    }
  }, [data, fetching])

  useEffect(() => {
    if (userData && !userFetching) {
      createUser(userData.users_by_pk)
      router.push("/")
    } else if (!userData && !userFetching) {
      setLoading(false)
    }
  }, [userData, userFetching])

  return (
    <div className="select-none w-screen h-screen bg-white text-slate-500 flex justify-center border-inherit px-6 items-center">
      {fetching || userFetching || loading ? (
        <Spinner />
      ) : (
        <form onSubmit={(e) => onFromSubmit(e)} action="" className="w-72">
          <p className="mb-5 font-semibold text-2xl">Login</p>
          <div className="flex-col flex">
            <div className="relative flex items-center justify-center">
              <BsFillEnvelopeFill className="absolute left-2 text-slate-500" />
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="E-mail address"
                type="email"
                className="form-input-field"
              />
            </div>
            {error && (
              <p className="text-xs mt-1 -mb-2 text-pink-500">{error}</p>
            )}
          </div>
          <div className="mt-4 relative flex items-center justify-center">
            <MdPassword className="absolute left-2 text-slate-500 " />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Password"
              type="password"
              className="form-input-field"
            />
          </div>
          <button className="bg-soft-green hover:bg-darker-soft-green text-white w-full rounded-md mt-4 text-sm outline-none py-1">
            Login
          </button>
        </form>
      )}
    </div>
  )
}

export default LoginView

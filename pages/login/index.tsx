import { signInWithEmailAndPassword } from "firebase/auth"
import { useRouter } from "next/router"
import React, { SyntheticEvent, useState } from "react"
import { BsFillEnvelopeFill } from "react-icons/bs"
import { MdPassword } from "react-icons/md"
import { auth } from "../../services/firebase-provider"

const LoginView = () => {
  const router = useRouter()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const onFromSubmit = async (e: SyntheticEvent) => {
    e.preventDefault()
    try {
      await signInWithEmailAndPassword(auth, email, password)
    } catch (error: any) {
      ;(() => {
        switch (error.code) {
          case "auth/invalid-email":
            return setError("Hibás vagy ismeretlen e-mail cím!")
          case "auth/internal-error":
            return setError("Hibás vagy hiányzó adatok!")
          case "auth/wrong-password":
            return setError("Hibás jelszó!")
          case "auth/too-many-requests":
            return setError("Túl sok próbálkozás")
          case "auth/user-not-found":
            return setError("Ismeretlen felhasználó!")
          default:
            return setError("")
        }
      })()
    } finally {
      router.push("/")
    }
  }

  return (
    <div className="select-none w-screen h-screen bg-slate-50 dark:bg-medium-gray text-slate-600 dark:text-slate-200 flex justify-center border-inherit px-6 items-center">
      <form
        onSubmit={(e) => onFromSubmit(e)}
        action=""
        className="p-6 border dark:border-zinc-600 rounded-lg"
      >
        <p className="mb-5 font-semibold text-2xl">Login</p>
        <div className="flex-col flex">
          <p className="mb-1 pl-1 text-xs font-light">E-mail</p>
          <div className="relative flex items-center justify-center">
            <BsFillEnvelopeFill className="absolute left-2 text-slate-500 dark:text-slate-200" />
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              type="email"
              className="form-input"
            />
          </div>
          {error && <p className="text-xs mt-1 -mb-2 text-pink-500">{error}</p>}
        </div>
        <div className="mt-4 flex-col flex">
          <p className="mb-1 pl-1 text-xs font-light">Password</p>
          <div className="relative flex items-center justify-center">
            <MdPassword className="absolute left-2 text-slate-500 dark:text-slate-200" />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              type="password"
              className="form-input"
            />
          </div>
        </div>
        <button className="bg-blue-500 hover:bg-blue-600 w-full rounded mt-4 text-sm outline-none py-1">
          Login
        </button>
      </form>
    </div>
  )
}

export default LoginView

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
      await router.push("/")
    } catch (error: any) {
      switch (error.code) {
        case "auth/invalid-email":
          setError("Hibás vagy ismeretlen e-mail cím!")
          break
        case "auth/internal-error":
          setError("Hibás vagy hiányzó adatok!")
          break
        case "auth/wrong-password":
          setError("Hibás jelszó!")
          break
        case "auth/too-many-requests":
          setError("Túl sok próbálkozás")
          break
        case "auth/user-not-found":
          setError("Ismeretlen felhasználó!")
          break
        default:
          setError("")
          break
      }
    }
  }

  return (
    <div className="select-none w-screen h-screen bg-white text-slate-500 flex justify-center border-inherit px-6 items-center">
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
          {error && <p className="text-xs mt-1 -mb-2 text-pink-500">{error}</p>}
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
    </div>
  )
}

export default LoginView

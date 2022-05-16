import { useRouter } from "next/router"
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react"

type Action =
  | { type: "create_user"; user: User }
  | { type: "remove_user" }
  | { type: "set_storage"; storage: User }

interface Context {
  userStorage: User
  createUser: (user: User) => void
  removeUser: () => void
}

const reducer = (state: any, action: Action) => {
  switch (action.type) {
    case "create_user":
      return action.user
    case "remove_user":
      return {} as User
    case "set_storage":
      return action.storage
    default:
      return state
  }
}

const UserStorageContext = createContext<Context>({} as any)

interface Props {
  children: React.ReactNode
}

export const UserStorageProvider: React.FC<Props> = ({ children }) => {
  const router = useRouter()
  const [fetching, setFetching] = useState(true)
  const [state, dispatch] = useReducer(reducer, {})

  const actions = useMemo(
    () => ({
      createUser: (user: User) => {
        dispatch({
          type: "create_user",
          user: user,
        })
      },
      removeUser: () => {
        dispatch({
          type: "remove_user",
        })
      },
      setStorage: (storage: User) => {
        dispatch({
          type: "set_storage",
          storage,
        })
      },
    }),
    []
  )

  useEffect(() => {
    actions.setStorage(JSON.parse(localStorage.getItem("userStorage") || "{}"))
    setFetching(false)
  }, [])

  useEffect(() => {
    if (!fetching) {
      localStorage.setItem("userStorage", JSON.stringify(state))
    }
  }, [state])

  useEffect(() => {
    if (
      !fetching &&
      Object.keys(state).length === 0 &&
      router.pathname !== "/login"
    ) {
      router.push("/login")
    }
  }, [router.pathname])

  return (
    <UserStorageContext.Provider value={{ userStorage: state, ...actions }}>
      {children}
    </UserStorageContext.Provider>
  )
}

export const useUserStorage = () => useContext(UserStorageContext)

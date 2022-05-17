import { useRouter } from "next/router"
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react"
import { useQuery } from "urql"
import { queryUserById } from "../graphql/queries"

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
  const [{ data: userData, fetching: userFetching }, getUserById] = useQuery({
    query: queryUserById,
    variables: { id: state?.id },
    // pause: true,
  })

  const actions = useMemo(
    () => ({
      createUser: (user: User) => {
        dispatch({
          type: "create_user",
          user: user,
        })
        localStorage.setItem("rosztiUserId", user.id)
      },
      removeUser: () => {
        dispatch({
          type: "remove_user",
        })
        localStorage.removeItem("rosztiUserId")
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
    actions.setStorage({
      ...state,
      id: localStorage.getItem("rosztiUserId"),
    })
    setFetching(false)
  }, [])

  useEffect(() => {
    if (!fetching) {
      localStorage.setItem("rosztiUserId", state.id)
    }
  }, [state])

  // useEffect(() => {
  //   const reFetch = async () => {
  //     await getUserById({ requestPolicy: "network-only" })
  //   }
  //   if (state.id) {
  //     reFetch()
  //   }
  // }, [state])

  useEffect(() => {
    if (userData && userData.users_by_pk) {
      actions.setStorage({
        ...state,
        code: userData.users_by_pk.code,
        displayname: userData.users_by_pk.displayname,
        email: userData.users_by_pk.email,
        role: userData.users_by_pk.role,
      })
    }
  }, [userData])

  useEffect(() => {
    if (
      !fetching &&
      router.pathname !== "/login" &&
      (userData?.users_by_pk === null || state.id === "null")
    ) {
      localStorage.removeItem("rosztiUserId")
      router.push("/login")
    }
  }, [router.pathname, state])

  return (
    <UserStorageContext.Provider value={{ userStorage: state, ...actions }}>
      {children}
    </UserStorageContext.Provider>
  )
}

export const useUserStorage = () => useContext(UserStorageContext)

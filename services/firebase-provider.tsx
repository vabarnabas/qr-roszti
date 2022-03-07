import { initializeApp } from "firebase/app"
import { getAuth, User } from "firebase/auth"
import { useAuthState } from "react-firebase-hooks/auth"
import React, { createContext } from "react"

const firebaseConfig = {
  apiKey: "AIzaSyCIEff6iqI4ONlh8FlJrQ0YkmzKWJOjN7w",
  authDomain: "qr-roszti.firebaseapp.com",
  projectId: "qr-roszti",
  storageBucket: "qr-roszti.appspot.com",
  messagingSenderId: "713393975201",
  appId: "1:713393975201:web:543c8bc829e3dd931e65e0",
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)

export const UserContext = createContext<User | undefined>(undefined)

const UserProvider: React.FC = ({ children }) => {
  const [user] = useAuthState(auth)

  return (
    <UserContext.Provider value={user || undefined}>
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider

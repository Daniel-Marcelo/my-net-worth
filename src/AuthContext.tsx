import { ErrorFn, getAuth, onAuthStateChanged, User } from "firebase/auth"
import { createContext, useContext, useEffect, useState } from "react"

export type Data = { user: User, error: Error }
export const AuthContext = createContext<Data>(null)

export const AuthContextProvider = () => {
  const [user, setUser] = useState<User>()
  const [error, setError] = useState<Error>()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), setUser, setError)
    return () => unsubscribe()
  }, [])
  return <AuthContext.Provider value={{ user, error }} />
}

export const useAuthState = () => {
  const auth = useContext(AuthContext)
  return { ...auth, isAuthenticated: auth.user != null }
}
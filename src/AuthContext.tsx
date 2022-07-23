import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type Data = { user: User; error: Error };
export const AuthContext = createContext<Data>(null);

export function AuthContextProvider() {
  const [user, setUser] = useState<User>();
  const [error, setError] = useState<Error>();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), setUser, setError);
    return () => unsubscribe();
  }, []);
  const data = useMemo(() => ({ user, error }), [user, error]);
  return <AuthContext.Provider value={data} />;
}

export const useAuthState = () => {
  const auth = useContext(AuthContext);
  return { ...auth, isAuthenticated: auth.user != null };
};

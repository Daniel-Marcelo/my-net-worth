import React, { PropsWithChildren, useEffect, useState } from "react";
import { SessionStorageUtil } from "../utils/sessionStorage";

const AuthContext = React.createContext(null);

interface LoggedInUser {
  email: string;
}

export const useAuthContext = () => React.useContext(AuthContext);

export function AuthContextProvider({ children }: PropsWithChildren) {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [authContext, setAuthContext] = useState({});

  useEffect(() => {
    const user = SessionStorageUtil.Get<LoggedInUser>('loggedInUser');
    if (user && user.email) {
      setLoggedIn(true)
    }
  }, [])

  const updateLoggedInStatus = (email: string) => {
    setLoggedIn(true)
    SessionStorageUtil.Set('loggedInUser', { email })
  }

  return (
    <AuthContext.Provider
      value={{
        login: [isLoggedIn, updateLoggedInStatus],
        auth: [authContext, setAuthContext],
      } as const}
    >
      {children}
    </AuthContext.Provider>
  );
}

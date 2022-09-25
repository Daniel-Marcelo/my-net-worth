import React, { PropsWithChildren, useState } from "react";

const AuthContext = React.createContext(null);

export const useAuthContext = () => React.useContext(AuthContext);

export function AuthContextProvider({ children }: PropsWithChildren) {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [authContext, setAuthContext] = useState({});
  return (
    <AuthContext.Provider
      value={{
        login: [isLoggedIn, setLoggedIn],
        auth: [authContext, setAuthContext],
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

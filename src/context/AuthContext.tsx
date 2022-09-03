import React, { useState } from "react";

const AuthContext = React.createContext(null);

export const useAuthContext = () => React.useContext(AuthContext);

export function AuthContextProvider({ children }) {
  const [isLoggedIn, setLoggedIn] = useState(false);
  return <AuthContext.Provider value={{ login: [isLoggedIn, setLoggedIn] }}>{children}</AuthContext.Provider>;
}

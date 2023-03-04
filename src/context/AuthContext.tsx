import React, { PropsWithChildren, useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";

const AuthContext = React.createContext(null);

export const useAuthContext = () => React.useContext(AuthContext);

export function AuthContextProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (userData) => {
      if (userData) {
        console.log("%c User is signed in", "background: green; color: white");
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        // const uid = user.uid;
        setUser(userData);
        // ...
      } else {
        console.log("%c User is signed out", "background: red; color: white");
        setUser(userData);
      }
    });
  }, []);

  return (
    <AuthContext.Provider
      value={
        // eslint-disable-next-line react/jsx-no-constructed-context-values
        {
          login: [!!user],
        } as const
      }
    >
      {children}
    </AuthContext.Provider>
  );
}

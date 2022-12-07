import React, { PropsWithChildren, useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const AuthContext = React.createContext(null);

// interface LoggedInUser {
//   email: string;
// }

export const useAuthContext = () => React.useContext(AuthContext);

export function AuthContextProvider({ children }: PropsWithChildren) {
  const [isLoggedIn, setLoggedIn] = useState(undefined);
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User is signed in");
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        // const uid = user.uid;
        setLoggedIn(true);
        // ...
      } else {
        // User is signed out
        console.log("user is signed out");
        setLoggedIn(false);
        // ...
      }
    });
  }, []);

  // const updateLoggedInStatus = () => {
  //   setLoggedIn(true);
  //   // SessionStorageUtil.Set("loggedInUser", { email });
  // };

  return (
    <AuthContext.Provider
      value={
        {
          login: [isLoggedIn],
        } as const
      }
    >
      {children}
    </AuthContext.Provider>
  );
}

import React, { useState } from "react";

const AuthContext = React.createContext(null);

export const useAuthContext = () => React.useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
    const [isLoggedIn,] = useState(false);
    return (
        <AuthContext.Provider value={{isLoggedIn}}>{children}</AuthContext.Provider>
    )
}

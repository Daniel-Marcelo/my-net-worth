import React, { useState } from "react";

const UserSettingsContext = React.createContext(null);

export const useUserSettingsContext = React.useContext(UserSettingsContext);

export const UserSettingsProvider = ({ children }) => {
    const [baseCurrency,] = useState("£");
    return (
        <UserSettingsContext.Provider value={{baseCurrency}}>{children}</UserSettingsContext.Provider>
    )
}

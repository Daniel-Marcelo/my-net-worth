import React, { PropsWithChildren, useMemo, useState } from "react";

const UserSettingsContext = React.createContext(null);

export const useUserSettingsContext = () => React.useContext(UserSettingsContext);

export function UserSettingsProvider({ children }: PropsWithChildren) {
  const [baseCurrency] = useState("£");
  const currency = useMemo(() => [baseCurrency], [baseCurrency]);
  const value = useMemo(() => ({ baseCurrency: currency }), [currency]);
  return <UserSettingsContext.Provider value={value}>{children}</UserSettingsContext.Provider>;
}

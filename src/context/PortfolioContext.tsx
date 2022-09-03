import React, { useState } from "react";

const PortfolioContext = React.createContext(null);

export const usePortfolioContext = () => React.useContext(PortfolioContext);

export function PortfolioContextProvider({ children }) {
  const [portfolios] = useState([]);
  return <PortfolioContext.Provider value={{ portfolios }}>{children}</PortfolioContext.Provider>;
}

import React, { useState } from "react";

const PortfolioContext = React.createContext(null);

export const usePortfolioContext = () => React.useContext(PortfolioContext);

export function PortfolioContextProvider({ children }) {
  const [portfolios, setPortfolios] = useState([]);
  return (
    <PortfolioContext.Provider value={{ portfolioData: [portfolios, setPortfolios] }}>
      {children}
    </PortfolioContext.Provider>
  );
}

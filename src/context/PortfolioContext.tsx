import React, { PropsWithChildren, useMemo, useState } from "react";

const PortfolioContext = React.createContext(null);

export const usePortfolioContext = () => React.useContext(PortfolioContext);

export function PortfolioContextProvider({ children }: PropsWithChildren) {
  const [portfolios, setPortfolios] = useState([]);

  const portfolioData = useMemo(() => [portfolios, setPortfolios], [portfolios, setPortfolios]);
  const value = useMemo(() => ({ portfolioData }), [portfolioData]);
  return <PortfolioContext.Provider value={value}>{children}</PortfolioContext.Provider>;
}

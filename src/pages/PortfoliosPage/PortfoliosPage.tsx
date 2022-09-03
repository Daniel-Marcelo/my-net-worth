import { usePortfolioContext } from "../../context/PortfolioContext";

export function PortfoliosPage() {
  const { portfolios } = usePortfolioContext();

  return <div>PORTFOLIOS</div>;
}

import { usePortfolioIdFromUrl } from "../../hooks";

export function ProtectedPortfolioPage() {
  const id = usePortfolioIdFromUrl();

  return <div>ProtectedPortfolioPage</div>;
}

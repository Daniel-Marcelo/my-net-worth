import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { usePortfolioService } from "../services";

export const usePortfolioIdFromUrl = () => {
  const [id, setId] = useState("");
  const params = useParams();
  const portfolioService = usePortfolioService();

  useEffect(() => {
    if (params.id && params.id !== id) {
      setId(params.id);
      portfolioService.get(params.id).then((dsd) => console.log(dsd));
    }
  }, [params]);

  return id;
};

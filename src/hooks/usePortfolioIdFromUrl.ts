import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const usePortfolioIdFromUrl = () => {
  const [id, setId] = useState("");
  const params = useParams();

  useEffect(() => {
    if (params.id && params.id !== id) {
      setId(params.id);
    }
  }, [params]);

  return id;
};

import { useCallback, useEffect } from "react";
import { financeApi } from "../services";
import { useFinanceStore } from "../stores/finance.store";

export const useLoadFinanceModules = (ticker?: string) => {
  const { setModuleData } = useFinanceStore();
  const loadModules = useCallback(async () => {
    if (ticker) {
      try {
        setModuleData(await financeApi.getModules(ticker));
      } catch (error) {
        console.error(error);
      }
    }
  }, [ticker]);

  useEffect(() => {
    loadModules();
  }, [loadModules]);
};

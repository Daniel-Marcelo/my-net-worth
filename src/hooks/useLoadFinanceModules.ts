import { useCallback, useEffect } from "react";
import { useFinance } from "../services";
import { useFinanceStore } from "../stores/finance.store";

export const useLoadFinanceModules = (ticker?: string) => {
  const finance = useFinance();
  const { setModuleData } = useFinanceStore();
  const loadModules = useCallback(async () => {

    if(ticker) {
        try {
            const moduleData = await finance.getModules(ticker);
            setModuleData(moduleData.quoteSummary.result[0]);
          } catch (error) {
            console.error(error);
          }
    }
  }, [ticker]);

  useEffect(() => {
    loadModules();
  }, [loadModules]);
};

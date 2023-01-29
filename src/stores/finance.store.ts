import { create } from "zustand";
import { YFModule } from "../types/yahoo-finance";

interface FinanceStoreData {
  moduleData?: YFModule.Result;
  setModuleData: (moduleData: YFModule.Result) => void;
}
export const useFinanceStore = create<FinanceStoreData>((set) => ({
  moduleData: null,
  setModuleData: (moduleData) => set({ moduleData }),
}));

import { create } from "zustand";

interface RiskFreeRateStore {
  riskFreeRate: number;
  setRiskFreeRate: (rate: number) => void;
}

export const useRiskFreeRateStore = create<RiskFreeRateStore>((set) => ({
  riskFreeRate: 0,
  setRiskFreeRate: (riskFreeRate) => set({ riskFreeRate }),
}));

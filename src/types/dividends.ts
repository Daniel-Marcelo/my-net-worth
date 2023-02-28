import { Year } from "../models";

export const enum ViewType {
  Normal = "normal",
  Yearly = "yearly",
}

export type YearToNumber = {
  [key in Year]: number;
};

export type YearToNumbers = {
  [key in Year]: number[];
};

export const enum DividendFrequency {
  Monthly = "Monthly",
  Quarterly = "Quarterly",
  BiAnnually = "Bi-Annually",
  Annually = "Annually",
}

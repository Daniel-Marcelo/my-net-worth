import { Year } from "../models";

export const enum ViewType {
  Normal = "normal",
  Yearly = "yearly",
}

export type YearToNumber = {
  [key in Year]: number;
};


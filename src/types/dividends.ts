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

export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

type Months = "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12";
type Days =
  | "1"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "10"
  | "11"
  | "12"
  | "13"
  | "14"
  | "15"
  | "16"
  | "17"
  | "18"
  | "19"
  | "20"
  | "21"
  | "22"
  | "23"
  | "24"
  | "25"
  | "26"
  | "27"
  | "28"
  | "29"
  | "30"
  | "31";

export type MonthToRow = {
  [P in Months]: {
    [Z in Days]: number;
  };
};

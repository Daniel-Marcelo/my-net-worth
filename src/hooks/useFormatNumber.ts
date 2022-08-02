import numeral from "numeral";

export const useFormatNumber =
  () =>
  (value: number, format = "0,0") =>
    numeral(value).format(format);

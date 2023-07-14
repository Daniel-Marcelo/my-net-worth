import { x } from "@xstyled/styled-components";
import { BarChartEntry } from "../../models";

interface CalculatorInformationSummaryProps {
  values: number[];
  chartData: BarChartEntry[];
  currency: string;
}
export function CalculatorInformationSummary({ values, chartData, currency }: CalculatorInformationSummaryProps) {
  return (
    <>
      {values.map((value) => (
        <>
          {chartData.length >= value && (
            <x.div fontSize="sm">
              After {value} years you will have {currency}
              {chartData[value - 1].total}
            </x.div>
          )}
        </>
      ))}
    </>
  );
}

import { useQueries } from "@tanstack/react-query";
import { format } from "date-fns";
import { range } from "lodash";
import { useState } from "react";
import { x } from "@xstyled/styled-components";

import { MonthToRow } from "../../types";
import { DividendCalendar } from "../DividendCalendar/DividendCalendar";
import { GroupedPortfolioEntry } from "../../models";
import { financeApi } from "../../services";

const currentYear = new Date().getFullYear();

const defaultMonthToRowTemplate = () =>
  range(1, 13).reduce(
    (acc, item) => ({
      ...acc,
      [item]: range(1, 32).reduce((acc2, day) => ({ ...acc2, [day]: 0 } as const), {}),
    }),
    {} as MonthToRow
  );

interface DividendCalendarTabProps {
  groupedEntries: GroupedPortfolioEntry[];
}

export function DividendCalendarTab({ groupedEntries }: DividendCalendarTabProps) {
  const [monthToRowTemplate, setMothToRowTemplate] = useState<MonthToRow>(defaultMonthToRowTemplate());

  const findQuantity = (ticker: string) => {
    const groupedEntry = groupedEntries.find((entry) => entry.ticker === ticker);
    return groupedEntry ? groupedEntry.totalShares : 0;
  };
  useQueries({
    queries: groupedEntries
      .map((entry) => entry.ticker)
      .map((item) => ({
        queryKey: ["something", item],
        queryFn: () => financeApi.getDividendHistory(item),
        onSuccess: (data) => {
          const thisYearLastYearDividends = Object.entries(data)
            .filter(([key]) => {
              const t = new Date(1970, 0, 1);
              t.setSeconds(+key);
              const year = +format(t, "yyyy");
              return year >= currentYear - 1;
            })
            .map(([key, value]) => {
              const t = new Date(1970, 0, 1);
              t.setSeconds(+key);
              return {
                date: t,
                amount: (value as any).amount,
                year: +format(t, "yyyy"),
                month: +format(t, "MM"),
                day: +format(t, "dd"),
              };
            })

            // eslint-disable-next-line no-nested-ternary
            .sort((a, b) => (a.date > b.date ? -1 : b.date > a.date ? 1 : 0));
          const mostRecentDividendAmount = thisYearLastYearDividends[0];
          const lastYearDividends = thisYearLastYearDividends.filter((div) => div.year === currentYear - 1);
          const newMonthToRowTemplate = { ...monthToRowTemplate };
          lastYearDividends.forEach((div) => {
            const divsForMonth = newMonthToRowTemplate[div.month];
            divsForMonth[div.day] = +(
              divsForMonth[div.day] +
              mostRecentDividendAmount.amount * findQuantity(item)
            ).toFixed(2);
          });
          setMothToRowTemplate(newMonthToRowTemplate);
          // setHis({ ...his, [item]: lastYearsDividendsForTicker });
        },
      })),
  });

  console.log(Object.values(monthToRowTemplate));

  const totalDivs = Object.entries(monthToRowTemplate).reduce(
    (acc, [, days]) => acc + Object.entries(days).reduce((acc2, [, dividend]) => dividend + acc2, 0),
    0
  );

  return (
    <x.div p={4}>
      <x.span>Total divs {totalDivs.toFixed(2)}</x.span>
      <DividendCalendar monthToRow={monthToRowTemplate} />
    </x.div>
  );
}

import { useState } from "react";
import { ContributionPeriodLabel, ContributionPeriodValue } from "./Calculator.model";

export const useContributionPeriodOptions = () => {
  const [options] = useState([
    {
      value: ContributionPeriodValue.Weekly,
      label: ContributionPeriodLabel.Weekly,
    },
    {
      value: ContributionPeriodValue.BiWeekly,
      label: ContributionPeriodLabel.BiWeekly,
    },
    {
      value: ContributionPeriodValue.Monthly,
      label: ContributionPeriodLabel.Monthly,
    },
    {
      value: ContributionPeriodValue.Annually,
      label: ContributionPeriodLabel.Annually,
    },
  ]);
  return options;
};

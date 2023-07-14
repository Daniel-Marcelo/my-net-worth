export enum ContributionPeriodValue {
  Weekly = "WEEKLY",
  BiWeekly = "BIWEEKLY",
  Monthly = "MONTHLY",
  Annually = "ANNUALLY",
}

export enum ContributionPeriodLabel {
  Weekly = "Weekly",
  BiWeekly = "Bi-Weekly",
  Monthly = "Monthly",
  Annually = "Annually",
}

export interface BarChartEntry {
  name: string;
  startingAmount: number;
  interest: number;
  contributions: number;
  total?: number;
}

export enum ChartEntry {
  startingAmount = "Starting Amount",
  interest = "Interest",
  contributions = "Contributions",
}

export interface SummaryProfile {
  address1: string;
  city: string;
  companyOfficers: string[];
  country: string;
  fullTimeEmployees: number;
  industry: string;
  longBusinessSummary: string;
  maxAge: number;
  phone: string;
  sector: string;
  state: string;
  website: string;
  zip: string;
}

export interface QuoteSummary {
  error?: Error;
  result: [Module];
}

export interface Module {
  summaryProfile?: SummaryProfile;
}
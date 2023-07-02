import { FirebaseItem } from "../models/Firebase";

export interface PolySymbolV1 extends FirebaseItem {
  logo: string;
  listdate: string;
  cik: string;
  bloomberg: string;
  figi?: any;
  lei: string;
  sic: number;
  country: string;
  industry: string;
  sector: string;
  marketcap: number;
  employees: number;
  phone: string;
  ceo: string;
  url: string;
  description: string;
  exchange: string;
  name: string;
  symbol: string;
  exchangeSymbol: string;
  hq_address: string;
  hq_state: string;
  hq_country: string;
  type: string;
  updated: string;
  tags: string[];
  similar: string[];
  active: boolean;
}

import { FirebaseItem } from "./Firebase";

export interface MultiplesTableRow extends FirebaseItem {
  ticker: string;
  price: string;
  eps: string;
  pe: string;
}

import { FirebaseService } from "../services/firebase-service";
import { PolySymbolV1 } from "./Symbols";

class SymbolService extends FirebaseService<PolySymbolV1> {
  constructor() {
    super("portfolios");
  }
}
export const symbolService = new SymbolService();

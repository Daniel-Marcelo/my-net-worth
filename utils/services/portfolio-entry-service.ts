import { PortfolioEntry } from "../models/PortfolioEntry";
import { FirebaseService } from "./firebase-service";

class PortfolioEntryService extends FirebaseService<PortfolioEntry> {
  constructor() {
    super("portfolioEntry");
  }

  async getEntriesByPortfolioId(portfolioId: number | string) {
    const query = this.collectionRef.where("portfolioId", "==", portfolioId);
    const snapshot = await query.get();
    const items = [] as PortfolioEntry[];
    snapshot.forEach((doc) => {
      items.push({
        id: doc.id,
        ...(doc.data() as PortfolioEntry),
      });
    });
    return items;
  }
}

export const portfolioEntryService = new PortfolioEntryService();

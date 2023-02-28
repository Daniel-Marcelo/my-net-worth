import { PolySymbolV1 } from "../models";
import { useDBService } from "./useDBService";

export const usePolySymbolV1Service = () => useDBService<PolySymbolV1>("symbolsV1");

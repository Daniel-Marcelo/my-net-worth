export const useTickerSearch = () => {
    return async (text: string): Promise<Quote[]> => {
        const response = await fetch(`/search?q=${text}`)
        const data = await response.json();
        return data.quotes
            .filter(quote => ![QuoteType.Future, QuoteType.Option].includes(quote.quoteType))
            .map(quote => ({
                ticker: quote.symbol,
                name: quote.shortname
            })
        )
    }
}

export enum QuoteType {
    Option = 'OPTION',
    Future = 'FUTURE'
}

export interface Quote {
    ticker: string;
    name: string;
}

export interface YFQuote {
    exchDisp: string;
    exchange: string;
    index: string;
    quoteType: string;
    score: number;
    shortname: string;
    symbol: string;
    typeDisp: string;
}
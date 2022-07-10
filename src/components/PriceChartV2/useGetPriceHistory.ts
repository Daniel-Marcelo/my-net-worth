export const useGetPriceHistory = () => {
    return async (ticker: string) => {
        const response = await fetch(`/chart/${ticker}?range=1d&includePrePost=false&interval=2m&corsDomain=finance.yahoo.com&.tsrc=finance`)
        const data = await response.json();
        const timestamps = data.chart.result[0].timestamp;
        const prices = data.chart.result[0].indicators.quote[0].close;
        return [timestamps, prices]
    }
}
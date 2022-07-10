export const useGetPriceHistory = () => {
    return async (ticker: string, range = '1d', interval = '15m') => {
        const response = await fetch(`/chart/${ticker}?range=${range}&includePrePost=false&interval=${interval}&corsDomain=finance.yahoo.com&.tsrc=finance`)
        const data = await response.json();
        const timestamps = data.chart.result[0].timestamp;
        const prices = data.chart.result[0].indicators.quote[0].close;
        return [timestamps, prices.map(price => Math.round(price * 100) / 100)];
    }
}
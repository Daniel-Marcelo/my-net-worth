import { x } from '@xstyled/styled-components';
import { useEffect, useState } from 'react';
import { PriceChartInterval, PriceChartTimeRange } from '../../models';
import { useChartData } from '../../pages/QuotePage/useChartData';
import { useFinance } from '../../services';
import { PriceChart } from '../PriceChart';
import { PriceChartToolbar } from '../PriceChartToolbar';

interface TickerSummaryTabProps {
    ticker: string;
}
export const TickerSummaryTab = ({ ticker}: TickerSummaryTabProps) => {
    const [selectedTimeframe, setSelectedTimeFrame] = useState("1d");
    const [chartData, setChartData] = useChartData();
    const finance = useFinance();

    useEffect(() => {
        if (ticker) {
          fetchHistory();
        }
      }, [ticker]);

    const fetchHistory = async (range = PriceChartTimeRange.OneDay, interval = PriceChartInterval.TwoMins) => {
        setSelectedTimeFrame(range);
        if (ticker) {
          const result = await finance.getPriceHistory(ticker, range, interval);
          setChartData(result);
        }
      };


    return (
        <>
            <x.div mb={8}>
                <PriceChartToolbar selectedTimeFrame={selectedTimeframe} fetchHistory={fetchHistory} />
            </x.div>
            {chartData.length ? <PriceChart selectedTicker={ticker} chartData={chartData} /> : ""}
        </>
    )
}
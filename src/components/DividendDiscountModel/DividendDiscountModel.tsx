import { Box, Divider, List, ListItem, ListItemText, Typography } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useFinance } from "../../services";
import { YFDividendHistory } from "../../types/yahoo-finance";
import { x } from '@xstyled/styled-components';
interface DividendDiscountModelProps {
    ticker: string;
}
export const DividendDiscountModel = ({ ticker }: DividendDiscountModelProps) => {
    const finance = useFinance();
    const [history, setHistory] = useState<YFDividendHistory.Dividends>({})
    const getHistory = useCallback(async () => {
        const data = await finance.getDividendHistory(ticker);
        setHistory(data)
        // const bla = Object.entries(data).forEach(([key, value]) => {
        //     var t = new Date(1970, 0, 1);
        //     t.setSeconds(+key);
        //     console.log(t);
        // })
    }, [ticker]);

    useEffect(() => {
        getHistory();
    }, [getHistory]);

    const calc = (time: number) => {
        var t = new Date(1970, 0, 1);
        t.setSeconds(+time);
        return t.toDateString();
    }

    return (
        <>
            {/* <Typography variant="subtitle1">Dividend Data</Typography> */}
            <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
                <>
                    <List sx={{ p: 0 }}>
                        {/* <Divider /> */}
                        {Object.entries(history).map(([key, value]) =>
                            <>
                                <ListItem sx={{ "&:hover": { bgcolor: "gray" } }}>
                                    <ListItemText>
                                        <x.span>
                                            {calc(+key)}
                                        </x.span>
                                        <x.span float="right">
                                            {value.amount}
                                        </x.span></ListItemText>
                                </ListItem>

                                <Divider />
                            </>

                        )}
                    </List>
                </>
            </Box>
        </>
    )
}
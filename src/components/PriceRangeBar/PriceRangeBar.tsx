import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useFinanceStore } from '../../stores/finance.store';
import { useEffect, useRef, useState } from 'react';

export const PriceRangeBar = () =>{
    const { rangeData } = useFinanceStore();
    const [width, setWidth] = useState(0)
    const ref = useRef<HTMLDivElement>();

    useEffect(() => {
        if (ref && ref.current && ref?.current?.clientWidth && rangeData?.currentValue) {
            setWidth(ref?.current?.clientWidth * (rangeData.currentValue / 100));
        }

    }, [ref])
    return (
        <Box sx={{ width: '100%' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ minWidth: 35, marginRight: '1rem' }}>
                <Typography variant="body2" color="text.secondary">{`${rangeData?.start}`}</Typography>
            </Box>
            <Box sx={{ width: '100%', mr: 1, position: 'relative' }} ref={ref}>
                <LinearProgress variant="determinate" value={rangeData?.currentValue} />
                <Box sx={{ position: 'absolute', left: width-15 }}>
                    <Typography variant="body2" color="text.secondary">{`${rangeData?.currentValueLabel
                        }`}</Typography>
                </Box>
            </Box>

            <Box sx={{ minWidth: 35 }}>
                <Typography variant="body2" color="text.secondary">{`${rangeData?.end
                    }`}</Typography>
            </Box>
        </Box>
        </Box>
    );
}
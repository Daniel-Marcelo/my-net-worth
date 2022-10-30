import { Box, Typography } from '@mui/material';
import Drawer from '@mui/material/Drawer';
import { x } from "@xstyled/styled-components";
import { useCallback, useEffect, useState } from 'react';
import { usePortfolioIdFromUrl } from '../../hooks';
import { PortfolioEntry, Quote } from '../../models';
import { usePortfolioEntryService } from '../../services';
import { UpdateEntry } from '../UpdateEntry';

interface TemporaryDrawerProps {
    open: boolean,
    onClose: () => void
}
export const UpdatesDrawer = ({
    open,
    onClose,
}: TemporaryDrawerProps) => {
    const id = usePortfolioIdFromUrl();
    const portfolioEntryService = usePortfolioEntryService();
    const [portfolioEntries, setPortfolioEntries] = useState<PortfolioEntry[]>([]);


    const getPortfolioEntries = useCallback(async () => {
        try {
            const entries = await portfolioEntryService.getAllByPortfolioId(id);
            setPortfolioEntries(entries)
        } catch (error) {
            console.log(error)
        }
    }, [id])
    useEffect(() => {
        getPortfolioEntries();
    }, [portfolioEntryService]);

    return (
        <Drawer
            anchor={'right'}
            open={open}
            onClose={onClose}
        >
            <Box
                sx={{ width: 350 }}
                role="presentation"
            >
                <x.div px={8} py={8} >
                    <x.div textAlign="center" mb={4}>
                        <Typography variant="h6">
                            Updates History
                        </Typography>
                    </x.div>
                    {portfolioEntries.map(portfolioEntry => (
                        <UpdateEntry
                            ticker={portfolioEntry.ticker}
                            name={portfolioEntry.name}
                            numberOfShares={portfolioEntry.numberOfShares} />
                    ))}
                </x.div>
            </Box>
        </Drawer>
    );
}

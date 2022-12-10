import { Box, Typography } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import { x } from "@xstyled/styled-components";
import { PortfolioEntry } from "../../models";
import { UpdateEntry } from "../UpdateEntry";

interface TemporaryDrawerProps {
  portfolioEntries: PortfolioEntry[];
  open: boolean;
  onClose: () => void;
}
export function UpdatesDrawer({ portfolioEntries, open, onClose }: TemporaryDrawerProps) {
  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box sx={{ width: 350 }} role="presentation">
        <x.div px={8} py={8}>
          <x.div textAlign="center" mb={4}>
            <Typography variant="h6">Updates History</Typography>
          </x.div>
          {portfolioEntries.map((portfolioEntry) => (
            <UpdateEntry
              ticker={portfolioEntry.ticker}
              name={portfolioEntry.name}
              numberOfShares={portfolioEntry.numberOfShares}
            />
          ))}
        </x.div>
      </Box>
    </Drawer>
  );
}

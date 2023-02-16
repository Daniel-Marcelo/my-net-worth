import { Box, Divider, List, ListItem, ListItemText, Typography } from "@mui/material";
import { x } from "@xstyled/styled-components";
import pluralize from "pluralize";
import { YearToNumber } from "../../types";

interface YearToNumberListProps {
  yearToNumber: YearToNumber;
  title: string;
}
export function YearToNumberList({ yearToNumber, title }: YearToNumberListProps) {
  return (
    <x.div>
      <Typography textAlign="center" variant="subtitle1" mb={2}>
        {title}
      </Typography>
      <Box sx={{ bgcolor: "background.paper" }}>
        <List sx={{ p: 0, borderRadius: 8 }}>
          {Object.entries(yearToNumber).map(([key, value]) => (
            <>
              <ListItem sx={{ "&:hover": { bgcolor: "gray" } }}>
                <ListItemText>
                  <x.span mr={16}>{`${key} ${pluralize("Year", +key)}`}</x.span>
                  <x.span float="right">{value}%</x.span>
                </ListItemText>
              </ListItem>
              <Divider />
            </>
          ))}
        </List>
      </Box>
    </x.div>
  );
}

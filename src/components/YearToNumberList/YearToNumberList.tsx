import { Box, Card, Divider, List, ListItem, ListItemButton, ListItemText, Typography } from "@mui/material";
import { x } from "@xstyled/styled-components";
import pluralize from "pluralize";
import { YearToNumber } from "../../types";

interface YearToNumberListProps {
  yearToNumber: YearToNumber;
  title: string;
}
export function YearToNumberList({ yearToNumber, title }: YearToNumberListProps) {
  return (
    <Card variant="outlined">
      <Typography textAlign="center" variant="subtitle1" my={2} sx={{ fontWeight: "medium" }}>
        {title}
      </Typography>
      <Box sx={{ bgcolor: "background.paper" }}>
        <List sx={{ p: 0, borderRadius: 8 }}>
          {Object.entries(yearToNumber).map(([key, value]) => (
            <>
              <ListItem>
                <ListItemText>
                  <x.span mr={16}>{`${key} ${pluralize("Year", +key)}`}</x.span>
                  <x.span float="right">{value}%</x.span>
                </ListItemText>
              </ListItem>
            </>
          ))}
        </List>
      </Box>
    </Card>
  );
}

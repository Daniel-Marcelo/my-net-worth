import { Box, Card, List, ListItem, ListItemText, SxProps, Theme, Typography } from "@mui/material";
import { x } from "@xstyled/styled-components";

interface YearToNumberListProps {
  title?: string;
  cardProps?: SxProps<Theme>;
  list: {
    label: string;
    value: string | number;
  }[];
}
export function LabelValueList({ title, list, cardProps = {} }: YearToNumberListProps) {
  return (
    <Card variant="outlined" sx={{ ...cardProps }}>
      {title && (
        <Typography textAlign="center" variant="subtitle1" my={2} sx={{ fontWeight: "medium" }}>
          {title}
        </Typography>
      )}
      <Box sx={{ bgcolor: "background.paper" }}>
        <List sx={{ p: 0, borderRadius: 8 }}>
          {list.map(({ label, value }) => (
            <ListItem>
              <ListItemText>
                <x.div display="flex" justifyContent="space-between">
                  <x.div fontSize="sm" pr={12}>
                    {label}
                  </x.div>
                  <x.div fontSize="sm">{value}</x.div>
                </x.div>
              </ListItemText>
            </ListItem>
          ))}
        </List>
      </Box>
    </Card>
  );
}

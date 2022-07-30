import { FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { x } from "@xstyled/styled-components";
import { useState } from "react";

export function Calculator() {
  const [, setStartingAmount] = useState(0);
  const [, setAdditionalContribution] = useState(0);
  const [contributionPeriod, setContributionPeriod] = useState("");

  return (
    <x.div p={16}>
      <Typography variant="h6" component="div" sx={{ textAlign: "center", flexGrow: 1 }}>
        Quote
      </Typography>

      <TextField
        onChange={(event) => setStartingAmount(+event.target.value)}
        label="Starting Amount"
        variant="outlined"
      />
      <x.div mt={8}>
        <TextField
          onChange={(event) => setAdditionalContribution(+event.target.value)}
          label="Additional Contribution"
          variant="outlined"
        />

        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-standard-label">Age</InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={contributionPeriod}
            onChange={(event) => setContributionPeriod(event.target.value)}
            label="Age"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
      </x.div>
    </x.div>
  );
}

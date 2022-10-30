import { Autocomplete, TextField } from "@mui/material";
import React, { forwardRef, SyntheticEvent, useRef, useState } from "react";
import { x } from "@xstyled/styled-components";
import { Quote } from "../../models/Quote";
import { useFinance } from "../../services";

interface TickerSearchProps {
  setSelectedTicker: (value: string) => void;
  selectedTicker: string;
}

export const TickerSearch = forwardRef(({ setSelectedTicker, selectedTicker }: TickerSearchProps, ref) => {
  const searchRef = useRef();
  const finance = useFinance();
  const [options, setOptions] = useState([]);

  const getOptions = async (event: SyntheticEvent<Element, Event>, value: string) => {
    if (value && value.length && event.type !== "click") {
      const response = await finance.searchForTicker(value);
      setOptions(response);
    }
  };

  const onChange = (event: SyntheticEvent<Element, Event>, value: Quote) => {
    setSelectedTicker(value.ticker);
  };

  const renderOption = (props: React.HTMLAttributes<HTMLLIElement>, option: Quote) => (
    <x.li {...props} key={Math.random()}>
      <x.div px="8" display="flex" justifyContent="space-between" flex="1">
        <x.span>{option.ticker}</x.span>
        <x.span>{option.name}</x.span>
      </x.div>
    </x.li>
  );

  return (
    <div>
      <Autocomplete
        ref={ref || searchRef}
        disablePortal
        id="combo-box-demo"
        filterOptions={(ax) => ax}
        onInputChange={getOptions}
        isOptionEqualToValue={(option, value) => option.ticker === value.ticker}
        options={options}
        getOptionLabel={(option) => (option ? (option as Quote).name || "" : "")}
        renderOption={renderOption}
        value={selectedTicker}
        onChange={(event, value) => onChange(event, value as Quote)}
        sx={{ width: "100%" }}
        renderInput={(params) => <TextField {...params} label="Ticker or Company" />}
      />
    </div>
  );
});

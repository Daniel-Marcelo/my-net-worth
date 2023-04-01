import { Autocomplete, TextField } from "@mui/material";
import React, { forwardRef, SyntheticEvent, useRef, useState } from "react";
import { x } from "@xstyled/styled-components";
import debounce from "lodash/debounce";
import { Quote } from "../../models/Quote";
import { financeApi } from "../../services";

interface TickerSearchProps {
  setSelectedQuote: (value: Quote) => void;
  selectedQuote: Quote;
}

export const TickerSearch = forwardRef(({ setSelectedQuote, selectedQuote }: TickerSearchProps, ref) => {
  const searchRef = useRef();

  const [options, setOptions] = useState([]);

  const getOptions = debounce(async (event: SyntheticEvent<Element, Event>, value: string) => {
    if (value && value.length && event.type !== "click") {
      const response = await financeApi.searchForTicker(value);
      setOptions(response);
    }
  }, 300);

  const onChange = (event: SyntheticEvent<Element, Event>, value: Quote) => {
    setSelectedQuote(value);
  };

  const renderOption = (props: React.HTMLAttributes<HTMLLIElement>, option: Quote) => (
    <x.li {...props} key={Math.random()}>
      <x.div display="flex" justifyContent="space-between" flex="1" fontSize="xs">
        <x.span w="30%">{option.ticker}</x.span>
        <x.span w="30%">{option.name}</x.span>
        <x.span w="30%">{option.exchangeDisplay}</x.span>
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
        value={selectedQuote}
        onChange={(event, value) => onChange(event, value as Quote)}
        sx={{ width: "100%" }}
        renderInput={(params) => <TextField {...params} label="Ticker or Company" />}
      />
    </div>
  );
});

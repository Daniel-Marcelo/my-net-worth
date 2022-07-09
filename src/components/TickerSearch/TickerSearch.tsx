import { Autocomplete, AutocompleteRenderOptionState, TextField } from "@mui/material"
import { SyntheticEvent, useState, ReactNode } from "react"
import { Quote, useTickerSearch } from "./useTickerSearch";
import { x } from '@xstyled/styled-components'

export const TickerSearch = ({ setSelectedTicker }) => {
    const searchTicker = useTickerSearch();
    const [options, setOptions] = useState([]);

    const getOptions = async (event: SyntheticEvent<Element, Event>, value: string) => {
        if (value.length && event.type !== 'click') {
            const response = await searchTicker(value);
            setOptions(response)
        }
    }

    const onChange = (event: SyntheticEvent<Element, Event>, value: Quote) => {
        setSelectedTicker(value.ticker)
    }

    const renderOption = (props: React.HTMLAttributes<HTMLLIElement>, option: any, state: AutocompleteRenderOptionState) => {
        return <x.li {...props} key={Math.random()}>
            <x.div px="8" display="flex" justifyContent="space-between" flex="1">
                <x.span>{option.ticker}</x.span>
                <x.span>{option.name}</x.span>
            </x.div>
        </x.li>
    }

    return <div>
        <Autocomplete
            disablePortal
            id="combo-box-demo"
            filterOptions={(x) => x}
            onInputChange={getOptions}
            isOptionEqualToValue={(option, value) => option.ticker === value.ticker}
            options={options}
            getOptionLabel={option => option.name}
            renderOption={renderOption}
            onChange={onChange}
            sx={{ width: '100%' }}
            renderInput={(params) => <TextField {...params} label="Ticker or Company" />}
        />
    </div>
}
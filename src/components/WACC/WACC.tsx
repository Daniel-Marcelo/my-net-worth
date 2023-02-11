import { useState } from "react";
import { x } from '@xstyled/styled-components';
import TextField from '@mui/material/TextField';

interface DDMProps {
    g: number,
    setG: (g: number) => void;
    r: number;
    setR: (r: number) => void;
    onBlur: () => void;
}
export const WACC = ({g, setG, r, setR, onBlur}) => {
    return (
        <x.div display="flex" flexDirection="column" position="relative">
            <x.div mb={4}>
                <x.span position="absolute" right="60px" top="15px">%</x.span>
                <TextField
                onBlur={onBlur}
                    label="Predicted average annual dividend growth rate"
                    value={g}
                    type="number"
                    onChange={(e) => setG(+e.target.value)}
                />
            </x.div>

            <x.div mb={4}>
                <TextField
                onBlur={onBlur}
                    label="Required rate of return"
                    value={r}
                    type="number"
                    onChange={(e) => setR(+e.target.value)}
                />
            </x.div>

        </x.div>
    )
}
import { x } from "@xstyled/styled-components";
import TextField from "@mui/material/TextField";

interface DDMProps {
  g: number;
  setG: (g: number) => void;
  r: number;
  setR: (r: number) => void;
  onBlur: (d?: number, r?: number) => void;
}
export function WACC({ g, setG, r, setR, onBlur }: DDMProps) {
  return (
    <x.div display="flex" flexDirection="column" position="relative">
      <x.div mb={4}>
        <x.span position="absolute" right="60px" top="15px">
          %
        </x.span>
        <TextField
          label="Predicted average annual dividend growth rate"
          value={g}
          type="number"
          onChange={(e) => {
            setG(+e.target.value);
            onBlur(+e.target.value);
          }}
        />
      </x.div>

      <x.div mb={4}>
        <TextField
          label="Required rate of return"
          value={r}
          type="number"
          onChange={(e) => {
            setR(+e.target.value);
            onBlur(undefined, +e.target.value);
          }}
        />
      </x.div>
    </x.div>
  );
}

import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useEffect, useRef, useState } from "react";
import { useQuoteStore } from "../../stores/quote.store";
import { useLoadFinanceModules } from "../../hooks/useLoadFinanceModules";

export function PriceRangeBar() {
  const { quote } = useQuoteStore();
  const { rangeData } = useLoadFinanceModules();
  const [width, setWidth] = useState(0);
  const ref = useRef<HTMLDivElement>();

  const applyWidth = () => {
    const hasWidth = ref && ref.current && ref?.current?.clientWidth;
    if (hasWidth && rangeData?.currentValue && quote?.ticker) {
      setWidth(ref.current.clientWidth * (rangeData.currentValue / 100));
    }
  };

  useEffect(() => {
    window.addEventListener("resize", applyWidth);
    return () => window.removeEventListener("resize", applyWidth);
  }, []);

  useEffect(() => {
    applyWidth();
  }, [ref, quote, rangeData]);

  useEffect(() => {
    window.addEventListener("resize", () => applyWidth());
    return () => {
      window.removeEventListener("resize", () => applyWidth());
    };
  }, []);
  return (
    <Box sx={{ width: "100%", position: "relative" }}>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Typography variant="body2" color="text.secondary">
          52 week range
        </Typography>
      </Box>
      <Box sx={{ position: "absolute", right: 0, top: 0 }}>
        <Typography variant="body2" color="text.secondary">{`${rangeData?.start}`}</Typography>
      </Box>
      <Box sx={{ position: "absolute", left: 0, top: 0 }}>
        <Typography variant="body2" color="text.secondary">{`${rangeData?.end}`}</Typography>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box sx={{ mx: 2, position: "relative", flex: 1 }} ref={ref}>
          <LinearProgress variant="determinate" value={rangeData?.currentValue} />
          <Box sx={{ position: "absolute", left: width - 15 }}>
            <Typography variant="body2" color="text.secondary">{`${rangeData?.currentValueLabel}`}</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

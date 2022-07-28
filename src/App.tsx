import { defaultTheme, ThemeProvider, Preflight, x } from "@xstyled/styled-components";
import { NavBar } from "./components/NavBar/NavBar";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { QuotePage } from "./pages/QuotePage/QuotePage";

const theme = {
  ...defaultTheme,
};

function App() {
  // const test = () => {
  //   fetch("/search/quote?symbols=TLS.AX,MUS.AX").then((response) => {
  //     console.log(response);
  //   });
  // };

  return (
    <ThemeProvider theme={theme}>
      <Preflight />
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/quote" element={<QuotePage />} />
          <Route path="/*" element={<Navigate to="/quote" replace/>} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
export default App;

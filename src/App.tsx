import { defaultTheme, ThemeProvider, Preflight } from "@xstyled/styled-components";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { NavBar } from "./components/NavBar/NavBar";
import { Protected } from "./components/Protected/Protected";
import { AuthContextProvider } from "./context/AuthContext";
import { Calculator } from "./pages/Calculator/Calculator";
import { HomePage } from "./pages/HomePage/HomePage";
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
      <AuthContextProvider>
      <NavBar />
        <Routes>
        <Route path="/home" element={<HomePage />} />
          <Route path="/quote" element={<QuotePage />} />
          <Route path="/calc" element={<Protected><Calculator /></Protected>} />
          <Route path="/*" element={<Navigate to="/home" replace />} />
        </Routes>
      </AuthContextProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}
export default App;

import { defaultTheme, ThemeProvider, Preflight } from "@xstyled/styled-components";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { LoggedInReRoute } from "./components/LoggedInReRoute/LoggedInReRoute";
import { NavBar } from "./components/NavBar/NavBar";
import { Protected } from "./components/Protected/Protected";
import { AuthContextProvider } from "./context/AuthContext";
import { PortfolioContextProvider } from "./context/PortfolioContext";
import { UserSettingsProvider } from "./context/UserSettingsContext";
import { Calculator } from "./pages/Calculator/Calculator";
import { HomePage } from "./pages/HomePage/HomePage";
import { LoginPage } from "./pages/Login/LoginPage";
import { PortfolioPage } from "./pages/PortfolioPage/PortfolioPage";
import { PortfoliosPage } from "./pages/PortfoliosPage/PortfoliosPage";
import { QuotePage } from "./pages/QuotePage/QuotePage";
import { RegisterPage } from "./pages/Register/RegisterPage";

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
          <PortfolioContextProvider>
            <UserSettingsProvider>
              <NavBar />
              <Routes>
                <Route path="/home" element={<HomePage />} />
                <Route path="/portfolios" element={<PortfoliosPage />} />
                <Route
                  path="/login"
                  element={
                    <LoggedInReRoute>
                      <LoginPage />
                    </LoggedInReRoute>
                  }
                />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/quote" element={<QuotePage />} />
                <Route path="/calc" element={<Calculator />} />
                <Route path="/portfolio/:id" element={<PortfolioPage />} />
                <Route path="/*" element={<Navigate to="/home" replace />} />
              </Routes>
            </UserSettingsProvider>
          </PortfolioContextProvider>
        </AuthContextProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}
export default App;

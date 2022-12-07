import { defaultTheme, ThemeProvider, Preflight } from "@xstyled/styled-components";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { LoggedInReRoute } from "./components/LoggedInReRoute/LoggedInReRoute";
import { NavBar } from "./components/NavBar/NavBar";
import { ProtectedPage } from "./components/ProtectedPage/ProtectedPage";
import { AuthContextProvider, useAuthContext } from "./context/AuthContext";
import { UserSettingsProvider } from "./context/UserSettingsContext";
import { Calculator } from "./pages/Calculator/Calculator";
import { HomePage } from "./pages/HomePage/HomePage";
import { LoginPage } from "./pages/Login/LoginPage";
import { PortfolioPage } from "./pages/PortfolioPage/PortfolioPage";
import { PortfoliosPage } from "./pages/PortfoliosPage/PortfoliosPage";
import { QuotePage } from "./pages/QuotePage/QuotePage";
import { RegisterPage } from "./pages/Register/RegisterPage";
import "react-toastify/dist/ReactToastify.css";

const theme = {
  ...defaultTheme,
};

function App() {
  useAuthContext();

  // const test = () => {
  //   fetch("/search/quote?symbols=TLS.AX,MUS.AX").then((response) => {
  //     console.log(response);
  //   });
  // };

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer />
      <Preflight />
      <BrowserRouter>
        <AuthContextProvider>
          <UserSettingsProvider>
            <NavBar />
            <Routes>
              <Route path="/home" element={<HomePage />} />
              <Route
                path="/portfolios"
                element={
                  <ProtectedPage>
                    <PortfoliosPage />
                  </ProtectedPage>
                }
              />
              <Route path="/quote" element={<QuotePage />} />
              <Route path="/calc" element={<Calculator />} />
              <Route
                path="/portfolio/:id"
                element={
                  <ProtectedPage>
                    <PortfolioPage />
                  </ProtectedPage>
                }
              />
              <Route
                path="/login"
                element={
                  <LoggedInReRoute>
                    <LoginPage />
                  </LoggedInReRoute>
                }
              />
              <Route
                path="/register"
                element={
                  <LoggedInReRoute>
                    <RegisterPage />
                  </LoggedInReRoute>
                }
              />
              <Route path="/*" element={<Navigate to="/home" replace />} />
            </Routes>
          </UserSettingsProvider>
        </AuthContextProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}
export default App;

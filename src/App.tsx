import { defaultTheme, ThemeProvider, Preflight } from "@xstyled/styled-components";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import { Toolbar } from "@mui/material";
import { LoggedInReRoute } from "./components/LoggedInReRoute/LoggedInReRoute";
import { NavBar } from "./components/NavBarV2/NavBar";
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
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { RoutePath } from "./types/routes";

const theme = {
  ...defaultTheme,
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // default: true
    },
  },
});
function App() {
  useAuthContext();
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <ToastContainer />
        <Preflight />
        <BrowserRouter>
          <AuthContextProvider>
            <UserSettingsProvider>
              <NavBar />
              <Toolbar />
              <Routes>
                <Route path={RoutePath.Home} element={<HomePage />} />
                <Route
                  path={RoutePath.Portfolios}
                  element={
                    <ProtectedPage>
                      <PortfoliosPage />
                    </ProtectedPage>
                  }
                />
                <Route path={RoutePath.Quote} element={<QuotePage />} />
                <Route path={RoutePath.Calculator} element={<Calculator />} />
                <Route
                  path={RoutePath.Portfolio}
                  element={
                    <ProtectedPage>
                      <PortfolioPage />
                    </ProtectedPage>
                  }
                />
                <Route
                  path={RoutePath.Login}
                  element={
                    <LoggedInReRoute>
                      <LoginPage />
                    </LoggedInReRoute>
                  }
                />
                <Route
                  path={RoutePath.Register}
                  element={
                    <LoggedInReRoute>
                      <RegisterPage />
                    </LoggedInReRoute>
                  }
                />
                <Route path={RoutePath.CatchAll} element={<Navigate to="/home" replace />} />
              </Routes>
            </UserSettingsProvider>
          </AuthContextProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
export default App;

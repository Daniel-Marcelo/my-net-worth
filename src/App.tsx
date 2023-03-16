import { defaultTheme, ThemeProvider, Preflight } from "@xstyled/styled-components";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
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
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { useEffect } from "react";

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
  useEffect(() => {
    console.log(process.env.REACT_APP_API_URL);
    const run = async () => {
      await fetch(`${process.env.REACT_APP_API_URL}/quote/ticker?q=PEP`);
    };
    run();
  });
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
      </QueryClientProvider>
    </ThemeProvider>
  );
}
export default App;

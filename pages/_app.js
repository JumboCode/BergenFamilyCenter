import '../styles/globals.css';
import '../firebase/firebase';
import "../components/test.css";
import { useState, useMemo } from 'react';
import { getAuth, setPersistence, inMemoryPersistence } from "firebase/auth";
import { LanguageContext } from "../src/languageContext";
import { RouteGuard } from '../components/routeGuard';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../public/theme';
import { BrowserRouter } from "react-router-dom";

function MyApp({ Component, pageProps }) {
  const [language, setLanguage] = useState('English')

  const value = useMemo(
    () => ({ language, setLanguage }),
    [language]
  );

  return (
    <ThemeProvider theme={theme}>
      <LanguageContext.Provider value={value}>
        <RouteGuard>
          <BrowserRouter>
            <Component {...pageProps} />
          </BrowserRouter>
        </RouteGuard>
      </LanguageContext.Provider>
    </ThemeProvider>
  );
}

export default MyApp

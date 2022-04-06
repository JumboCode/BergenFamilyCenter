import '../styles/globals.css';
import '../firebase/firebase';
import "../components/test.css";
import { useState, useMemo } from 'react';
import { getAuth, setPersistence, inMemoryPersistence } from "firebase/auth";
import { LanguageContext } from "../src/languageContext";
import { RouteGuard } from '../components/routeGuard';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../public/theme';


function MyApp({ Component, pageProps }) {
  const [language, setLanguage] = useState('English')

  const value = useMemo(
    () => ({ language, setLanguage }),
    [language]
  );

  const auth = getAuth();

  setPersistence(auth, inMemoryPersistence)
    .then(() => {
      //
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
    });

  return (
    <ThemeProvider theme={theme}>
      <LanguageContext.Provider value={value}>
        {/* <RouteGuard> */}
        <Component {...pageProps} />
        {/* </RouteGuard> */}
      </LanguageContext.Provider>
    </ThemeProvider>
  );
}

export default MyApp

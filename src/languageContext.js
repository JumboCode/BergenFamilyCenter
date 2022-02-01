import { createContext } from 'react';

export const LanguageContext = createContext({
    language: '',
    setLanguage: () => { },
});

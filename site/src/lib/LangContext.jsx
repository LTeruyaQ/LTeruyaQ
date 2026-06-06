// LangContext.jsx — language (pt/en) context shared across the app.
import { createContext, useContext } from 'react';

export const L = createContext({ lang: 'pt', setLang: () => {} });
export const useL = () => useContext(L);

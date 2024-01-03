import React, { ReactNode } from 'react';

type ThemeContextType = {
  selectedTheme: string;
  setSelectedTheme: React.Dispatch<React.SetStateAction<string>>;
};

const ThemeContext = React.createContext<ThemeContextType>({
  selectedTheme: 'light',
  setSelectedTheme: () => {},
});

interface ThemeProviderProps {
  children: ReactNode;
}

export const useTheme = () => {
  return React.useContext(ThemeContext);
};

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [selectedTheme, setSelectedTheme] = React.useState<string>('light');

  return (
    <ThemeContext.Provider value={{ selectedTheme, setSelectedTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

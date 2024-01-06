import { useState } from 'react';

type ThemesType = {
  [key: string]: string;
};

const ThemeSelection = () => {
  const lightThemes: ThemesType = {
    light: 'light',
    retro: 'retro',
    cyberpunk: 'cyberpunk',
    valentine: 'pink',
    aqua: 'blue',
    cupcake: 'cupcake',
    luxury: 'luxury',
    dark: 'dark',
    synthwave: 'synthwave',
    dim: 'dimmed',
    night: 'night',
    coffee: 'coffee'
  };

  const darkThemes: ThemesType = {
    
  };

  const [selectedTheme, setSelectedTheme] = useState<string>('light'); // Initial theme
  const [currentThemes, setCurrentThemes] = useState<ThemesType>(lightThemes);

  const changeTheme = (theme: string, themeType: ThemesType) => {
    setSelectedTheme(theme);
    setCurrentThemes(themeType);
    document.documentElement.setAttribute('data-set-theme', theme);
    // Call any necessary functions to apply the theme changes
  };

  return (
    <div className='grid grid-cols-3'>
      {Object.keys(currentThemes).map((theme: string) => (
        <div key={theme} className='m-1.5 grid-cols-2 '>
          <button
            aria-label={currentThemes[theme]}
            data-set-theme={theme}
            onClick={() => changeTheme(theme, currentThemes === lightThemes ? darkThemes : lightThemes)}
            className={`btn w-24 py-4 rounded-lg bg-base-100 ${
              selectedTheme === theme && 'bg-base-300 rounded-lg'
            }`}
          >
            {currentThemes[theme]}
          </button>
        </div>
      ))}
    </div>
  );
};

export default ThemeSelection;

import React, { useState } from 'react';

type ThemesType = {
  [key: string]: string;
};

const ThemesSelection = () => {
  const lightThemes: ThemesType = {
    light: 'light',
    retro: 'retro',
    cyberpunk: 'cyberpunk',
    valentine: 'pink',
    aqua: 'blue',
    cupcake: 'cupcake',
  };

  const darkThemes: ThemesType = {
    luxury: 'luxury',
    dark: 'dark',
    synthwave: 'synthwave',
    dim: 'dimmed',
    night: 'night',
    coffee: 'coffee',
  };

  const [selectedTheme, setSelectedTheme] = useState<string>('light'); // Initial theme
  const [themeType, setThemeType] = useState<string>('light'); // To toggle between light and dark themes

  const themes = themeType === 'light' ? lightThemes : darkThemes;

  const changeTheme = (theme: string) => {
    setSelectedTheme(theme);
    document.documentElement.setAttribute('data-set-theme', theme);
    // Call any necessary functions to apply the theme changes
  };

  const toggleThemeType = () => {
    setThemeType(themeType === 'light' ? 'dark' : 'light');
    setSelectedTheme(themeType === 'light' ? 'luxury' : 'light');
    document.documentElement.setAttribute(
      'data-set-theme',
      themeType === 'light' ? 'luxury' : 'light'
    );
  };

  return (
    <div>
      <button onClick={toggleThemeType}>Toggle Theme</button>
      <div className='grid grid-cols-3'>
        {Object.keys(themes).map((theme: string) => (
          <div key={theme} className='m-1.5 grid-cols-2'>
            <button
              aria-label={themes[theme]}
              data-set-theme={theme}
              onClick={() => changeTheme(theme)}
              className={`btn w-24 py-4 rounded-lg bg-base-100 ${
                selectedTheme === theme && 'bg-base-300 rounded-lg'
              }`}
            >
              {themes[theme]}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ThemesSelection;

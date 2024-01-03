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
    cupcake: 'cupcake'

  };

  const darkThemes: ThemesType = {
    luxury: 'luxury',
    synthwave: 'synthwave',
    coffee: 'coffee',
    dim: 'evening',
    dark: 'night',
    night: 'midnight'
   

  };

  const [selectedTheme, setSelectedTheme] = useState<string>('light'); // Initial theme
  const [isLightTheme, setIsLightTheme] = useState<boolean>(true); // To track current theme type

  const themes = isLightTheme ? lightThemes : darkThemes;

  const changeTheme = (theme: string) => {
    setSelectedTheme(theme);
    document.documentElement.setAttribute('data-set-theme', theme);
    // Call any necessary functions to apply the theme changes
  };

  const switchToLightTheme = () => {
    setIsLightTheme(true);
    setSelectedTheme(lightThemes.light);
    document.documentElement.setAttribute('data-set-theme', lightThemes.light);
    // Additional logic if needed when switching to the light theme
  };

  const switchToDarkTheme = () => {
    setIsLightTheme(false);
    setSelectedTheme(darkThemes.luxury);
    document.documentElement.setAttribute('data-set-theme', darkThemes.luxury);
    // Additional logic if needed when switching to the dark theme
  };

  return (
    <div>
      <div className='flex justify-center space-x-4'>
        <button
          onClick={switchToLightTheme}
          className={`btn w-24 py-2 rounded-xl ${isLightTheme ? 'bg-base-100' : 'bg-base-100'}`}
        >
          Light
        </button>
        <button
          onClick={switchToDarkTheme}
          className={`btn w-24 py-2 rounded-xl ${isLightTheme ? 'bg-base-300' : 'bg-base-300'}`}
        >
          Dark
        </button>
      </div>
      <div className='grid grid-cols-3 mt-4'>
        {Object.keys(themes).map((theme: string) => (
          <div key={theme} className='m-1.5 grid-cols-2'>
            <button
              aria-label={themes[theme]}
              data-set-theme={theme}
              onClick={() => changeTheme(theme)}
              className={`btn w-24 py-4 rounded-xl ${isLightTheme ? 'bg-base-300' : 'bg-base-100'} ${selectedTheme === theme && 'bg-base-content text-base-300 rounded-xl'}`}
            >
              {themes[theme]}
            </button>
            
          </div>
          
        ))}
      </div>
    </div>
  );
};

export default ThemeSelection;

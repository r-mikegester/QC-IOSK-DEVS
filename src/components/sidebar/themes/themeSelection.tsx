import { useState } from 'react';

type ThemesType = {
  [key: string]: string;
};

const ThemeSelection = () => {
  const lightThemes: ThemesType = {
    light: 'delightra', //de lara
    retro: 'gester', // mike
    cyberpunk: 'czaiberpunk', // Chan
    valentine: 'apenk', // phoebe
    aqua: 'lilan blue', // lilan
    cupcake: 'angeles', // Phoebe
    luxury: 'luxury go', // Go
    dark: 'adamos', // adamos
    synthwave: 'davidliangamit17', // davidliangamit17felicidario
    dim: 'dimñas', //vinas
    night: 'julnight', //cominghod
    coffee: 'jonhel' // jonhel
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
    <div className='grid grid-cols-1'>
      {Object.keys(currentThemes).map((theme: string) => (
        <div key={theme} className='m-1.5 grid-cols-2 '>
          <button
            aria-label={currentThemes[theme]}
            data-set-theme={theme}
            onClick={() => changeTheme(theme, currentThemes === lightThemes ? darkThemes : lightThemes)}
            className={`btn w-full h-16 py-4 text- text-xl rounded-lg bg-gradient-to-tr from-base-200 to-base-300 ${
              selectedTheme === theme && 'text-base-content bg-gradient-to-tr from-accent to-base-300 rounded-lg w-full'
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

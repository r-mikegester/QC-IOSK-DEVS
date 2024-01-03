import { useState } from 'react';

type ThemesType = {
  [key: string]: string;
};

const LightThemes = () => {
  const themes: ThemesType = {
    light: 'light',
    retro: 'retro',
    cyberpunk: 'cyberpunk',
    valentine: 'pink',
    aqua: 'blue',
    cupcake: 'cupcake',
  };

  const [selectedTheme, setSelectedTheme] = useState<string>('light'); // Initial theme

  const changeTheme = (theme: string) => {
    setSelectedTheme(theme);
    document.documentElement.setAttribute('data-set-theme', theme);
    // Call any necessary functions to apply the theme changes
  };

  return (
    <div className='grid grid-cols-3'>
      {Object.keys(themes).map((theme: string) => (
        <div key={theme} className='m-1.5 grid-cols-2 '>
          <button
            aria-label={themes[theme]}
            data-set-theme={theme}
            onClick={() => changeTheme(theme)}
            className={`btn w-24 py-4 rounded-lg bg-base-100 ${selectedTheme === theme && 'bg-base-300 rounded-lg'}`}
          >
            {themes[theme]}
          </button>
        </div>
      ))}
    </div>
  );
};

export default LightThemes;
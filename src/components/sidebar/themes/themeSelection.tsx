import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Icon } from "@iconify/react";
type ThemesType = {
  [key: string]: string;
};

type ColorPaletteType = {
  [key: string]: string[];
};

const ThemeSelection = () => {
  const themes: ThemesType = {
    light: 'delightra', //de lara 
    halloween: 'gester', // mike
    cyberpunk: 'czaiberpunk', // Chan
    valentine: 'apenk', // phoebe
    aqua: 'lilan blue', // lilan
    cupcake: 'angeles', // Phoebe
    luxury: 'luxury go', // Go
    synthwave: 'davidliangamit17', // davidliangamit17felicidario
    dim: 'dimñas', //vinas
    night: 'julnight', //cominghod
    coffee: 'jonhel', // jonhel
    forest: 'forest', // added
    dracula: 'dracula', // added
    wireframe: 'wireframe', // added
    black: 'black', // added
    bumblebee: 'bumblebee', // added
    emerald: 'emerald', // added
    corporate: 'corporate', // added
    retro: 'retro', // added
    garden: 'garden', // added
    lofi: 'lofi', // added
    pastel: 'pastel', // added
    fantasy: 'fantasy', // added
    cmyk: 'cmyk', // added
    autumn: 'autumn', // added
    business: 'business', // added
    acid: 'acid', // added
    lemonade: 'lemonade', // added
    winter: 'winter', // added
    nord: 'nord',
    sunset: 'niki'
  };

  const colorPalettes: ColorPaletteType = {
    light: ['bg-[#4a00ff]', 'bg-[#ff00d3]', 'bg-[#00d7c0]', 'bg-[#2b3440]'],
    retro: ['bg-[#ef9995]', 'bg-[#a4cbb4]', 'bg-[#DC8850]', 'bg-[#2E282A]'],
    cyberpunk: ['bg-[#FF6596]', 'bg-[#00E8FF]', 'bg-[#CE74FF]', 'bg-[#111A3B]'],
    valentine: ['bg-[#E96D7B]', 'bg-[#A991F7]', 'bg-[#66B1B3]', 'bg-[#AF4670]'],
    aqua: ['bg-[#08ECF3]', 'bg-[#966FB3]', 'bg-[#FFE999]', 'bg-[#3B8AC4]'],
    cupcake: ['bg-[#65C3C8]', 'bg-[#EF9FBC]', 'bg-[#EEAF3A]', 'bg-[#291334]'],
    luxury: ['bg-[#FFFFFF]', 'bg-[#152747]', 'bg-[#513448]', 'bg-[#331800]'],
    synthwave: ['bg-[#E779C1]', 'bg-[#58C7F3]', 'bg-[#FFD200]', 'bg-[#221551]'],
    dim: ['bg-[#9FE88D]', 'bg-[#FF7D5C]', 'bg-[#C792E9]', 'bg-[#1C212B]'],
    night: ['bg-[#38BDF8]', 'bg-[#818CF8]', 'bg-[#F471B5]', 'bg-[#1E293B]'],
    coffee: ['bg-[#DB924B]', 'bg-[#263E3F]', 'bg-[#10576D]', 'bg-[#120C12]'],
    forest: ['bg-[#1EB854]', 'bg-[#1DB88E]', 'bg-[#1DB8AB]', 'bg-[#19362D]'],
    dracula: ['bg-[#FF79C6]', 'bg-[#BD93F9]', 'bg-[#FFB86C]', 'bg-[#414558]'],
    wireframe: ['bg-[#B8B8B8]', 'bg-[#B8B8B8]', 'bg-[#B8B8B8]', 'bg-[#EBEBEB]'],
    black: ['bg-[#373737]', 'bg-[#373737]', 'bg-[#373737]', 'bg-[#373737]'],
    bumblebee: ['bg-[#FFD900]', 'bg-[#FFA400]', 'bg-[#FFA451]', 'bg-[#060023]'],
    emerald: ['bg-[#66CC8A]', 'bg-[#377CFB]', 'bg-[#F68067]', 'bg-[#333C4D]'],
    corporate: ['bg-[#4D6EFF]', 'bg-[#7B92B2]', 'bg-[#67CBA0]', 'bg-[#212121]'],
    halloween: ['bg-[#FF8F00]', 'bg-[#7A00C2]', 'bg-[#42AA00]', 'bg-[#2F1B05]'],
    garden: ['bg-[#FE0075]', 'bg-[#8E4162]', 'bg-[#5C7F67]', 'bg-[#291E00]'],
    lofi: ['bg-[#0D0D0D]', 'bg-[#FFFFFF]', 'bg-[#262626]', 'bg-[#000000]'],
    pastel: ['bg-[#D1C1D7]', 'bg-[#F6CBD1]', 'bg-[#B4E9D6]', 'bg-[#70ACC7]'],
    fantasy: ['bg-[#6D0076]', 'bg-[#0075C2]', 'bg-[#FF8600]', 'bg-[#1F2937]'],
    cmyk: ['bg-[#45AEEE]', 'bg-[#E8488A]', 'bg-[#FFF232]', 'bg-[#1A1A1A]'],
    autumn: ['bg-[#8C0327]', 'bg-[#D85251]', 'bg-[#D59B6A]', 'bg-[#826A5C]'],
    business: ['bg-[#1C4E80]', 'bg-[#7C909A]', 'bg-[#EA6947]', 'bg-[#23282E]'],
    acid: ['bg-[#FF00FF]', 'bg-[#FF6E00]', 'bg-[#C7FF00]', 'bg-[#140151]'],
    lemonade: ['bg-[#419400]', 'bg-[#BDC000]', 'bg-[#EDD000]', 'bg-[#343300]'],
    winter: ['bg-[#0069FF]', 'bg-[#463AA2]', 'bg-[#C148AC]', 'bg-[#021431]'],
    nord: ['bg-[#5E81AC]', 'bg-[#81A1C1]', 'bg-[#88C0D0]', 'bg-[#4C566A]'],
    sunset: ['bg-[#FF865B]', 'bg-[#FD6F9C]', 'bg-[#B387FA]', 'bg-[#1B262C]']
  };

  const [selectedTheme, setSelectedTheme] = useState<string>(() => {
    // Check if there's a selected theme in local storage
    const savedTheme = localStorage.getItem("selectedTheme");
    return savedTheme || "light"; // Default to "light" if no theme is saved
  });
  const [currentThemes, setCurrentThemes] = useState<ThemesType>(themes);

  useEffect(() => {
    // Set the selected theme in local storage whenever it changes
    localStorage.setItem("selectedTheme", selectedTheme);
    document.documentElement.setAttribute('data-set-theme', selectedTheme);
  }, [selectedTheme]);

  const changeTheme = (theme: string, themeType: ThemesType) => {
    setSelectedTheme(theme);
    setCurrentThemes(themeType);

    // Display a toast message when the theme is changed
    toast.success(`Selected theme: ${themes[theme]}`, {
      position: toast.POSITION.BOTTOM_RIGHT,
      className: " bg-base-100 font-bold rounded-2xl text-base-content ",
      theme: "dark",
      icon: <Icon icon="line-md:clipboard-check" className="w-10 h-10 text-xl" />,
      progressClassName: "bg-accent rounded-full mx-3 mb-1 w-72",
      autoClose: 1000, // 3000 milliseconds = 3 seconds
    });
  };

  return (
    <div className='grid grid-cols-1'>
      {Object.keys(currentThemes).map((theme: string) => (
        <div key={theme} className='m-1.5 grid-cols-2 flex items-center'>

          <button
            aria-label={currentThemes[theme]}
            data-set-theme={theme}
            onClick={() => changeTheme(theme, themes)}
            className={`flex justify-between btn w-full h-16 py-4 text- text-xl rounded-lg ${selectedTheme === theme ? 'bg-gradient-to-tr from-accent to-base-300 text-base-content border border-accent' : 'bg-gradient-to-tr from-base-200 to-base-300'
              }`}
          >
            <span>{currentThemes[theme]}</span>
            {/* Adding color avatars */}
            <div className="flex items-center -space-x-2">
              {colorPalettes[theme].map((color, index) => (
                <div
                  key={index}
                  className={`w-5 h-5 rounded-full border-2 hover:border-red-900 ${color}`}
                  title={`Color ${index + 1}: ${color}`} // Add title attribute with color information
                />
              ))}
            </div>
          </button>
        </div>
      ))}

    </div>
  );
};

export default ThemeSelection;

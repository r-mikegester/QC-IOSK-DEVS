/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  plugins: [require("daisyui")],
  daisyui: {
    // false: only light + dark | true: all themes | array: specific themes like this ["light", "dark", "cupcake"]
    themes: [
      "light",
      "dark",
      "cupcake",
      "bumblebee",
      "emerald",
      "corporate",
      "synthwave",
      "retro",
      "cyberpunk",
      "valentine",
      "halloween",
      "garden",
      "forest",
      "aqua",
      "lofi",
      "pastel",
      "fantasy",
      "wireframe",
      "black",
      "luxury",
      "dracula",
      "cmyk",
      "autumn",
      "business",
      "acid",
      "lemonade",
      "night",
      "coffee",
      "winter",
      "dim",
    ], // name of one of the included themes for dark mode // applies background color and foreground color for root element by default // adds responsive and modifier utility classes
    // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
    // Shows info about daisyUI version and used config in the console when building your CSS
    // The element that receives theme color CSS variables
  },
  "postcss-import": {},
  "tailwindcss/nesting": "postcss-nesting",
  tailwindcss: {},
  autoprefixer: {},
};

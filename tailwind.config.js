module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      green: {
        light: "#C7F4DC",
        normal: "#67DA9C",
      },
      blue: {
        light: "#C3D0FF",
        normal: "#6780DA",
      },
      skyBlue: {
        normal: "#65C1F4",
      },
      red: {
        light: "#EDC4D5",
        normal: "#FF6F6F ",
      },
      yellow: {
        normal: "#EDDD4F",
      },
      pink: {
        normal: "#F8B8E9",
      },
      orange: {
        normal: "#F8B8B8",
      },
      gray: {
        light: "#C4C4C4",
        normal: "#626262",
      },
      white: {
        DEFAULT: "#FFFF",
        light: "#E5E5E5",
        dark: "#F5F5F5",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};

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
      red: {
        light: "#EDC4D5",
        normal: "##DA6797 ",
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

const colors = require("tailwindcss/colors");

module.exports = {
  content: [],
  purge: false,
  theme: {
    colors: {
      white: colors.white,
      black: colors.black,
      primary: "var(--medium-pack-primary-color, rgba(255,255,255,var(--tw-bg-opacity, 1)))",
      secondary: "var(--medium-pack-secondary-color, rgba(0,0,0,var(--tw-bg-opacity, 1)))",
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};

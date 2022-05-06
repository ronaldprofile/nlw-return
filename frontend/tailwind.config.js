module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        body: ["'Inter'", "sans-serif"]
      },
      colors: {
        brand: {
          300: "#996dff",
          500: "#8257e6"
        },

        dark: {
          primary: "#09090a"
        }
      }
    }
  },
  plugins: [require("@tailwindcss/forms"), require("tailwind-scrollbar")]
};

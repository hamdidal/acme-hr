import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      xs: { min: "400px", max: "768px" },

      sm: { min: "768px", max: "1024px" },

      md: { min: "1024px", max: "1280px" },

      lg: { min: "1280px" },
    },
    extend: {
      boxShadow: {
        "custom-shadow": "rgba(0, 0, 0, 0.35) 0px 5px 15px)",
      },
      backgroundImage: {
        "my-bg-gradient": "linear-gradient(to right, #ff0000, #3333ff)",
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;

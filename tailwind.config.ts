import type { Config } from "tailwindcss";

const config: Config = {
	content: ["./pages/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}", "./app/**/*.{js,ts,jsx,tsx,mdx}"],
	theme: {
		extend: {
			colors: {
				white: "#E5FBFF",
				gray: "#737E80",
				black: "#17191A",
				neutral: "#323637",
				"neutral-border": "#323637",
				"neutral-black": "#17191A",
				"neutral-black-secondary": "#202224",
				yellow: "#FFD52E",
				green: "#43B055",
			},
			screens: {
				md: {
					raw: "(max-width: 940px)",
				},
				sm: {
					raw: "(max-width: 500px)",
				},
				aboveSm: {
					raw: "(min-width: 500px)",
				},
				lg: {
					raw: "(min-width: 940px)",
				},
			},
		},
	},
	plugins: [],
};
export default config;

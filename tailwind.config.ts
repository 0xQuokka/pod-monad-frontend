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
			},
			screens: {
				md: {
					raw: "(max-width: 900px)",
				},
			},
		},
	},
	plugins: [],
};
export default config;

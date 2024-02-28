import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";

// Font files can be colocated inside of `app`
const Grotesk = localFont({
	src: [
		{ path: "./GroteskMedium.otf", weight: "500" },
		{ path: "./GroteskRegular.otf", weight: "400" },
	],
	display: "swap",
});

export const metadata: Metadata = {
	title: "POD Finance",
	description:
		"Maximize your liquid assets value—stake any liquid token and boost your earnings with enhanced multi-rewards.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={Grotesk.className}>{children}</body>
		</html>
	);
}

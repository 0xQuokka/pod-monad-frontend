"use client";
import "@rainbow-me/rainbowkit/styles.css";

import { darkTheme, getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { http, WagmiProvider } from "wagmi";
import { base, Chain } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ConnectWallet from "../components/ConnectWallet";
import { ReactNode } from "react";

interface ILayout {
	children: ReactNode;
}

const Layout = ({ children }: ILayout) => {
	const localhost: Chain = {
		id: 31337,
		name: "Localhost",
		nativeCurrency: {
			decimals: 18,
			name: "GO",
			symbol: "GO",
		},
		rpcUrls: {
			default: {
				http: ["http://127.0.0.1:8545/"],
			},
			public: {
				http: ["http://127.0.0.1:8545/"],
			},
		},
		testnet: false,
	};

	const wagmiConfig = getDefaultConfig({
		appName: "POD App",
		projectId: "YOUR_PROJECT_ID",
		chains: [localhost],
		transports: {
			[localhost.id]: http(),
		},
	});

	const queryClient = new QueryClient();

	return (
		<WagmiProvider config={wagmiConfig}>
			<QueryClientProvider client={queryClient}>
				<RainbowKitProvider theme={darkTheme()}>
					<main className="relative z-10 py-[80px] w-[864px] mx-auto md:w-full md:p-5">
						<header className="flex items-center justify-between">
							<div className="text-[50px] -tracking-[3px] text-white font-[500]">pod.</div>
							<ConnectWallet>Connect wallet</ConnectWallet>
						</header>
						{children}
					</main>
				</RainbowKitProvider>
			</QueryClientProvider>
		</WagmiProvider>
	);
};

export default Layout;

"use client";

import { darkTheme, getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { http, WagmiProvider } from "wagmi";
import { Chain, baseSepolia } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const RainbowWrapper = ({ children }: any) => {
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
				http: ["http://localhost:8545/"],
			},
			public: {
				http: ["http://localhost:8545/"],
			},
		},
		testnet: false,
	};

	const wagmiConfig = getDefaultConfig({
		appName: "POD Finance APP",
		projectId: "YOUR_PROJECT_ID",
		chains: [baseSepolia],
		transports: {
			[baseSepolia.id]: http(),
		},
		ssr: true,
	});

	const queryClient = new QueryClient();

	return (
		<WagmiProvider config={wagmiConfig}>
			<QueryClientProvider client={queryClient}>
				<RainbowKitProvider theme={darkTheme()}>{children}</RainbowKitProvider>
			</QueryClientProvider>
		</WagmiProvider>
	);
};

export default RainbowWrapper;

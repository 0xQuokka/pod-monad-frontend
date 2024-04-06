"use client";
import "@rainbow-me/rainbowkit/styles.css";

import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink } from "@apollo/client";
import ConnectWallet from "../components/ConnectWallet";
import { ReactNode } from "react";
import Link from "next/link";
import { appURL } from "@/config/enviroment";
import RainbowWrapper from "./RainbowWrapper";
import { ModalProvider } from "@/services/ModalProvider";

interface ILayout {
	children: ReactNode;
}

const Layout = ({ children }: ILayout) => {
	const apolloClient = new ApolloClient({
		link: new HttpLink({
			uri: process.env.THEGRAPH_API_URL as string,
			fetchOptions: {
				mode: "cors",
			},
		}),
		cache: new InMemoryCache(),
	});

	return (
		<RainbowWrapper>
			<ModalProvider>
				<ApolloProvider client={apolloClient}>
					<main className="relative  min-h-screen z-10 py-[80px] w-[864px] mx-auto md:w-full md:p-5 ">
						<header className="flex items-center justify-between mb-[80px]">
							<Link href={appURL("/")}>
								<div className="text-[50px] -tracking-[3px] text-white font-[500]">pod.</div>
							</Link>
							<ConnectWallet>Connect wallet</ConnectWallet>
						</header>
						{children}
					</main>
				</ApolloProvider>
			</ModalProvider>
		</RainbowWrapper>
	);
};

export default Layout;

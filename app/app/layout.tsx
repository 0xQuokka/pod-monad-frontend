"use client";
import "@rainbow-me/rainbowkit/styles.css";
import Image from "next/image";

import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink } from "@apollo/client";
import ConnectWallet from "../components/ConnectWallet";
import { ReactNode } from "react";
import Link from "next/link";
import { appURL } from "@/config/enviroment";
import RainbowWrapper from "./RainbowWrapper";
import { ModalProvider } from "@/services/ModalProvider";
import { PodsProvider } from "@/services/PodsProvider";
import { TokensProvider } from "@/services/TokensProvider";

interface ILayout {
	children: ReactNode;
}

const Layout = ({ children }: ILayout) => {
	return (
		<RainbowWrapper>
			<ModalProvider>
				<TokensProvider>
					<PodsProvider>
						<div className="absolute z-0 h-[100vh] top-0 left-0 right-0">
							<Image src={"https://pod.finance/background.jpeg"} alt="podline" fill quality={100} className="mix-blend-overlay object-cover" />
						</div>
						<main className="relative  min-h-screen z-10 py-[80px] max-w-[864px] mx-auto md:w-full p-5 ">
							<header className="flex items-center justify-between mb-[80px]">
								<Link href={appURL("/")}>
									<div className="text-[35px] -tracking-[3px] text-white font-[500]">pod.</div>
								</Link>

								<ConnectWallet>Connect wallet</ConnectWallet>
							</header>
							{children}
						</main>
					</PodsProvider>
				</TokensProvider>
			</ModalProvider>
		</RainbowWrapper>
	);
};

export default Layout;

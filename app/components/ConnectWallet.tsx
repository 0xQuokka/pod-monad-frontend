"use client";
import Button from "./button";
import { ReactNode } from "react";
import { useDisconnect } from "wagmi";
import { ConnectButton as RainbowConnectButton } from "@rainbow-me/rainbowkit";

interface IButton {
	children?: ReactNode;
}

const ConnectWallet = ({ children }: IButton) => {
	const { disconnect } = useDisconnect();

	return (
		<RainbowConnectButton.Custom>
			{({ account, chain, openChainModal, openConnectModal, authenticationStatus, mounted }) => {
				const ready = mounted && authenticationStatus !== "loading";
				const connected = ready && account && chain && (!authenticationStatus || authenticationStatus === "authenticated");

				return (
					<div
						{...(!ready && {
							"aria-hidden": true,
							style: {
								opacity: 0,
								pointerEvents: "none",
								userSelect: "none",
							},
						})}
						className="relative z-50 flex mobile:flex-1"
					>
						{(() => {
							if (!connected) {
								return (
									<Button
										onClick={openConnectModal}
										className="border bg-neutral-04 flex items-center justify-center rounded-[8px] border-neutral-03 px-4 w-[180px] mobile:w-full text-center py-2 cursor-pointer hover:bg-neutral-03 transition-all"
									>
										<div className="cursor-pointer">Connect wallet</div>
									</Button>
								);
							}

							if (chain.unsupported) {
								return (
									<Button onClick={openChainModal} className="px-4 py-2 text-center flex items-center justify-center text-red-00 bg-red-01 rounded-[8px] cursor-pointer mobile:w-full">
										<span>Bad network</span>
									</Button>
								);
							}
							return (
								<Button
									onClick={() => disconnect()}
									className="border rounded-[8px] border-green-01 w-[180px] mobile:w-full text-center px-4 py-2 cursor-pointer bg-green-01 text-green-00 transition-all hover:text-red-00 hover:bg-red-01 hover:border-red-01 flex items-center justify-center"
									onMouseEnterValue="Disconnect"
									onMouseLeaveValue={`0x...${account.address.slice(-5)}`}
								/>
							);
						})()}
					</div>
				);
			}}
		</RainbowConnectButton.Custom>
	);
};

export default ConnectWallet;

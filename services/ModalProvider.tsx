"use client";
import Card from "@/app/components/cards/Card";
import { ReactNode, createContext, useContext, useState } from "react";

export interface IModalContext {
	setModal: React.Dispatch<React.SetStateAction<ReactNode>>;
}

export const ModalContext = createContext<IModalContext>({
	setModal: () => {},
});

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
	const [modal, setModal] = useState<ReactNode>(undefined);

	return (
		<ModalContext.Provider
			value={{
				setModal,
			}}
		>
			<div className="relative flex flex-col items-center justify-center">
				<div className="p-4 text-white bg-neutral-black border-b border-neutral-border flex-1 w-full text-center">
					This is a Based Sepolia Testnet deployment. Learn how to get testnet tokens{" "}
					<a href="https://mirror.xyz/0x24493F95778c60F76b7F91aB0EF4f4c83A9e3FC8/F4niMEfZytpSAPytONy_tKsg4_A733JbMJ9xrJrOUVM" rel="noreferrrer" target="_blank" className="underline cursor-pointer">
						in this article.
					</a>
				</div>
				{modal && (
					<>
						<div
							className="backdrop z-40"
							style={{
								top: 0,
								left: 0,
								right: 0,
								bottom: 0,
							}}
							onClick={() => setModal(undefined)}
						></div>
						<div
							className="mx-auto absolute z-50"
							style={{
								top: "20vh",
								padding: "12px",
							}}
						>
							<Card>{modal}</Card>
						</div>
					</>
				)}
				<div className={`relative z-30 w-full`}>{children}</div>
			</div>
		</ModalContext.Provider>
	);
};

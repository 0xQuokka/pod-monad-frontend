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
			<div className="relative flex items-center justify-center">
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
				<div className={`relative z-30`}>{children}</div>
			</div>
		</ModalContext.Provider>
	);
};

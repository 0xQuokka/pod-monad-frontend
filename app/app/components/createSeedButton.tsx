"use client";
import Button from "@/app/components/button";
import { useContext } from "react";
import { ModalContext } from "@/services/ModalProvider";
import { useAccount } from "wagmi";
import CreateSeedModal from "../modals/createSeed";

const CreateSeedButton = () => {
	const { address: account } = useAccount();
	const { setModal } = useContext(ModalContext);

	const openCreateSeedModal = () => {
		setModal(<CreateSeedModal />);
	};

	return (
		<>
			{
				<Button disabled={!account} onClick={() => openCreateSeedModal()}>
					Create a seed
				</Button>
			}
		</>
	);
};

export default CreateSeedButton;

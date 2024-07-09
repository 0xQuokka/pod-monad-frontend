"use client";
import Button from "@/app/components/button";
import CreatePodModal from "../modals/createPod";
import { useContext } from "react";
import { ModalContext } from "@/services/ModalProvider";
import { useAccount } from "wagmi";

const CreatePodButton = () => {
	const { setModal } = useContext(ModalContext);

	const openCreatePodModal = () => {
		setModal(<CreatePodModal />);
	};

	return (
		<>{<Button onClick={() => openCreatePodModal()}>Create a pod</Button>}</>
	);
};

export default CreatePodButton;

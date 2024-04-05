"use client";
import { useAccount, useReadContract } from "wagmi";

import Button from "../components/button";
import Label from "../components/text/Label";
import Title32 from "../components/text/Title32";

import PodList from "../components/lists/podList";
import { useContext, useState } from "react";
import { ModalContext } from "@/services/ModalProvider";
import CreatePodModal from "./modals/createPod";

const App = () => {
	const { setModal } = useContext(ModalContext);

	const openCreatePodModal = () => {
		setModal(<CreatePodModal />);
	};
	return (
		<div className="">
			<div className="flex justify-between items-center">
				<div>
					<Title32 className="text-white">ALL PODS</Title32>
					<Label>231 currently active</Label>
				</div>
				<div>
					<Button onClick={() => openCreatePodModal()}>Create a pod</Button>
				</div>
			</div>
			<div className="flex flex-col gap-2 mt-4">
				<PodList />
			</div>
		</div>
	);
};

export default App;

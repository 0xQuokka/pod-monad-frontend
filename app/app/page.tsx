"use client";
import Button from "../components/button";
import Label from "../components/text/Label";
import Title32 from "../components/text/Title32";

import PodList from "../components/lists/podList";
import { useContext, useState } from "react";
import { ModalContext } from "@/services/ModalProvider";
import CreatePodModal from "./modals/createPod";
import { gql, useQuery } from "@apollo/client";

const GET_PODS = gql`
	query GetPods {
		podFactories(first: 1) {
			availablePods
		}
		pods(first: 10, orderBy: rewardsCount, orderDirection: desc) {
			id
			name
			symbol
			reserve
			description
			underlying {
				id
				name
				symbol
				decimals
			}
			decimals
			rewards {
				id
			}
			owner {
				id
			}
		}
	}
`;

const App = () => {
	const { setModal } = useContext(ModalContext);
	const { loading, error, data } = useQuery(GET_PODS);

	const openCreatePodModal = () => {
		setModal(<CreatePodModal />);
	};
	return (
		<div className="">
			<div className="flex justify-between items-center">
				<div>
					<Title32 className="text-white">ALL PODS</Title32>
					{data && data.podFactories ? <Label>{data.podFactories[0].availablePods} currently active</Label> : <></>}
				</div>
				<div>
					<Button onClick={() => openCreatePodModal()}>Create a pod</Button>
				</div>
			</div>
			<div className="flex flex-col gap-2 mt-4">{data && data.pods ? <PodList pods={data.pods} /> : <></>}</div>
		</div>
	);
};

export default App;

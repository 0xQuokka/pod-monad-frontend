"use client";
import { useAccount, useReadContract } from "wagmi";

import Button from "../components/button";
import PodCard from "../components/cards/PodCard";
import Label from "../components/text/Label";
import Title32 from "../components/text/Title32";
import { useEffect, useState } from "react";
import { FACTORY_ADDRESS } from "@/config/addresses";

import POD_FACTORY_ABI from "@/abis/podFactory";

const App = () => {
	const [factoryAddress, setFactoryAddress] = useState<`0x${string}` | undefined>(undefined);
	const { chain } = useAccount();
	// TODO: Implement The Graph node
	const {
		data: availablePods,
		error,
		status,
	} = useReadContract({
		abi: POD_FACTORY_ABI,
		address: factoryAddress,
		functionName: "availablePods",
		args: ["0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"],
		query: {
			refetchInterval: 1800,
		},
	});

	useEffect(() => {
		if (!chain) return;
		console.log(chain.id);
		const _address = FACTORY_ADDRESS[chain.id as keyof typeof FACTORY_ADDRESS];
		console.log(_address);
		if (!_address) return;
		setFactoryAddress(_address);
	}, [chain]);

	useEffect(() => {
		// if(!podLength) return
		console.log({ availablePods, status });
	}, [availablePods, error, status]);

	return (
		<div className="mt-[80px]">
			<div className="flex justify-between items-center">
				<div>
					<Title32>ALL PODS</Title32>
					<Label>231 currently active</Label>
				</div>
				<div>
					<Button>Create a pod</Button>
				</div>
			</div>
			<div className="flex flex-col gap-2 mt-4">
				<PodCard />
				<PodCard />
				<PodCard />
			</div>
		</div>
	);
};

export default App;

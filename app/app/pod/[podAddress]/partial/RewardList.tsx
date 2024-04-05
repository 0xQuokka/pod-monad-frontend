"use client";
import { POD_INTERFACE, POD_REWARD_INTERFACE } from "@/app/app/interfaces/Pod";
import Title32 from "@/app/components/text/Title32";
import RewardCard from "../components/rewardCard";
import { useAccount, useWriteContract } from "wagmi";
import Button from "@/app/components/button";
import POD_ABI from "@/abis/pod";
import { useEffect } from "react";

interface IRewardList {
	rewards: POD_REWARD_INTERFACE[];
	pod: POD_INTERFACE;
}

const RewardList = ({ rewards, pod }: IRewardList) => {
	const { writeContract: writeHarvest, status: statusHarvest, isPending: isPendingHarvest, error: errorHarvest } = useWriteContract();
	const { address: account } = useAccount();

	const performHarvest = () => {
		if (!account) return;

		writeHarvest({
			abi: POD_ABI,
			address: pod.id,
			functionName: "harvest",
			args: [account],
		});
	};

	useEffect(() => {
		console.log({ errorHarvest });
	}, [errorHarvest]);

	return (
		<div className="">
			<header className="flex justify-between items-center">
				<Title32 className="text-white">REWARDS</Title32>
				<div>
					<Button onClick={performHarvest} loading={isPendingHarvest}>
						HARVEST ALL
					</Button>
				</div>
			</header>
			<div className="flex-1 mt-8 flex flex-col gap-4">
				{rewards.map((reward: POD_REWARD_INTERFACE) => {
					console.log(reward.token.id);
					return <RewardCard key={reward.id} reward={reward} />;
				})}
			</div>
		</div>
	);
};

export default RewardList;

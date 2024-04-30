"use client";
import { POD_INTERFACE, POD_REWARD_INTERFACE } from "@/app/app/interfaces/Pod";
import Title32 from "@/app/components/text/Title32";
import RewardCard from "../components/rewardCard";
import { useAccount, useWriteContract } from "wagmi";
import Button from "@/app/components/button";
import POD_ABI from "@/abis/pod";
import { useContext, useEffect } from "react";
import { ModalContext } from "@/services/ModalProvider";
import AddRewardModal from "@/app/app/modals/addReward";

interface IRewardList {
	rewards: POD_REWARD_INTERFACE[];
	pod: POD_INTERFACE;
}

const RewardList = ({ rewards, pod }: IRewardList) => {
	const { setModal } = useContext(ModalContext);
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

	const openAddRewardModal = () => {
		window.scrollTo({
			top: 0,
		});
		setModal(<AddRewardModal pod={pod} />);
	};

	return (
		<div className="">
			<header className="flex justify-between items-center sm:flex-col sm:items-start">
				<div className="flex flex-col gap-1 max-w-[380px]">
					<Title32 className="text-white">REWARDS</Title32>
				</div>
				{account && (
					<div className="flex gap-2">
						<div>
							<Button onClick={openAddRewardModal} loading={isPendingHarvest}>
								CREATE REWARD
							</Button>
						</div>
						<div>
							<Button onClick={performHarvest} loading={isPendingHarvest}>
								HARVEST ALL
							</Button>
						</div>
					</div>
				)}
			</header>
			<div className="mt-4">
				<p className="text-gray">
					<span className="text-white">These are the current rewards</span> for this particular POD. If the pod is set to be permisionless, you can add your own.
				</p>
			</div>
			<div className="flex-1 mt-8 flex flex-col gap-4">
				{rewards.map((reward: POD_REWARD_INTERFACE) => {
					return <RewardCard key={reward.id} reward={reward} pod={{ id: pod.id, decimals: pod.decimals }} />;
				})}
			</div>
		</div>
	);
};

export default RewardList;

"use client";
import { POD_INTERFACE, POD_REWARD_INTERFACE } from "@/app/app/interfaces/Pod";
import Card from "@/app/components/cards/Card";
import { formatNumber, formatSmallNumber, parseRewardDate } from "@/utils/utils";
import { useEffect, useState } from "react";
import RewardCardToken from "./rewardCardToken";
import { useAccount, useReadContract, useReadContracts } from "wagmi";
import POD_ABI from "@/abis/pod";
import { ethers } from "ethers";
import AllTokensIcon from "@/app/components/icons/allTokens";
import HarvestIcon from "@/app/components/icons/harvest";

interface IRewardCard {
	reward: POD_REWARD_INTERFACE;
	pod: {
		id: POD_INTERFACE["id"];
		decimals: POD_INTERFACE["decimals"];
	};
}

const RewardCard = ({ reward, pod }: IRewardCard) => {
	const { address: account } = useAccount();
	const [label, date] = parseRewardDate(parseInt(reward.startDate.toString()), parseInt(reward.endDate.toString()));
	const [pendingHarvest, setPendingHarvest] = useState<number>(0);

	const { data: sharesLocked } = useReadContract({
		address: pod.id,
		abi: POD_ABI,
		functionName: "lockedShares",
		args: [account],
		query: {
			enabled: !!account,
		},
	});

	const { data: blockchainReward } = useReadContract({
		address: pod.id,
		abi: POD_ABI,
		functionName: "rewards",
		args: [reward.token.id],
		query: {
			enabled: !!account && !!sharesLocked,
		},
	});

	const { data: userRewardDebt } = useReadContract({
		address: pod.id,
		abi: POD_ABI,
		functionName: "rewardDebt",
		args: [ethers.solidityPackedKeccak256(["address", "address"], [account ? account : ethers.ZeroAddress, reward.token.id])],
		query: {
			enabled: !!account && !!sharesLocked,
		},
	});

	useEffect(() => {
		if (blockchainReward && sharesLocked && userRewardDebt != undefined) {
			const _pending = (BigInt(sharesLocked.toString()) * BigInt((blockchainReward as any)[2].toString())) / BigInt(10 ** (pod.decimals as number)) - BigInt(userRewardDebt.toString());
			const parsedValue = parseFloat(parseFloat(ethers.formatUnits(_pending, parseInt(reward.token.decimals.toString()))).toPrecision(2));
			setPendingHarvest(parsedValue);
		}
	}, [blockchainReward, sharesLocked, userRewardDebt, pod.decimals, reward.token.decimals]);

	return (
		<Card noPadding={true}>
			<header className="flex sm:flex-col sm:gap-3 justify-between items-start p-3">
				<div>
					<RewardCardToken token={reward.token} />
				</div>
				<div className="text-right md:text-left">
					<span className="text-white">
						<span className="text-gray">{label}</span> {date ? `${date} UTC` : ""}
					</span>
				</div>
			</header>
			<div className="flex items-center justify-between p-4 text-white border-t border-neutral-border">
				<div className="text-gray flex gap-2 items-center">
					<div className="w-[16px]">
						<AllTokensIcon />
					</div>
					<div>Amount remaining</div>
				</div>
				<div>
					{formatNumber(reward.remainingAmount, reward.token.decimals || 18)} {reward.token.symbol}
				</div>
			</div>
			{pendingHarvest > 0 && (
				<div className="flex items-center justify-between p-4 text-yellow border-t border-neutral-border">
					<div className=" flex gap-2 items-center">
						<div className="w-[16px]">
							<HarvestIcon />
						</div>
						<div>Ready to harvest</div>
					</div>
					<div>
						{formatSmallNumber(pendingHarvest)} {reward.token.symbol}
					</div>
				</div>
			)}
		</Card>
	);
};

export default RewardCard;

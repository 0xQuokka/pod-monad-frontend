import { POD_REWARD_INTERFACE } from "@/app/app/interfaces/Pod";
import Title32 from "@/app/components/text/Title32";
import RewardCard from "../components/rewardCard";

interface IRewardList {
	rewards: POD_REWARD_INTERFACE[];
}

const RewardList = ({ rewards }: IRewardList) => {
	return (
		<div className="">
			<header className="flex justify-between items-center">
				<Title32 className="text-white">REWARDS</Title32>
				<div>Button</div>
			</header>
			<div className="flex-1 mt-8 flex flex-col gap-4">
				{rewards.map((reward: POD_REWARD_INTERFACE) => {
					return <RewardCard key={reward.id} reward={reward} />;
				})}
			</div>
		</div>
	);
};

export default RewardList;

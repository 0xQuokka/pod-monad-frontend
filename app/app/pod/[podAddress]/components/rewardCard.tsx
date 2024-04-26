import { POD_REWARD_INTERFACE } from "@/app/app/interfaces/Pod";
import Card from "@/app/components/cards/Card";
import { explorerTokenURL, explorerURL } from "@/config/enviroment";
import { TokensContext } from "@/services/TokensProvider";
import { formatNumber, parseRewardDate } from "@/utils/utils";
import { useContext } from "react";
import RewardCardToken from "./rewardCardToken";

interface IRewardCard {
	reward: POD_REWARD_INTERFACE;
}

const RewardCard = ({ reward }: IRewardCard) => {
	const [label, date] = parseRewardDate(parseInt(reward.startDate.toString()), parseInt(reward.endDate.toString()));

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
				<div className="text-gray">REMAINING AMOUNT</div>
				<div>
					{formatNumber(reward.remainingAmount, reward.token.decimals || 18)} {reward.token.symbol}
				</div>
			</div>
		</Card>
	);
};

export default RewardCard;

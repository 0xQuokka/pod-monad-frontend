import { POD_REWARD_INTERFACE } from "@/app/app/interfaces/Pod";
import Card from "@/app/components/cards/Card";
import { explorerTokenURL, explorerURL } from "@/config/enviroment";
import { formatNumber, parseRewardDate } from "@/utils/utils";

interface IRewardCard {
	reward: POD_REWARD_INTERFACE;
}

const RewardCard = ({ reward }: IRewardCard) => {
	const [label, date] = parseRewardDate(parseInt(reward.startDate.toString()), parseInt(reward.endDate.toString()));

	return (
		<Card noPadding={true}>
			<div className="flex items-center text-white">
				<div className="border-r border-neutral-border">
					<a href={explorerTokenURL(reward.token.id)} rel="noreferrer" target="_blank" className="p-4 underline">
						{reward.token.symbol}
					</a>
				</div>
				<div className="px-4 flex md:flex-col justify-between items-center md:items-start p-4 flex-1 uppercase">
					<div>{`Amount: ${formatNumber(reward.remainingAmount, reward.token.decimals || 18)}`}</div>
					<div className="text-right md:text-left">
						<span>
							<span className="text-gray">{label}</span> {date ? `${date} UTC` : ""}
						</span>
					</div>
				</div>
			</div>
		</Card>
	);
};

export default RewardCard;

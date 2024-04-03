import { POD_REWARD_INTERFACE } from "@/app/app/interfaces/Pod";
import Card from "@/app/components/cards/Card";
import { formatNumber, parseRewardDate } from "@/utils/utils";

interface IRewardCard {
	reward: POD_REWARD_INTERFACE;
}

const RewardCard = ({ reward }: IRewardCard) => {
	const endDate = parseRewardDate(parseInt(reward.endDate.toString()));

	return (
		<Card noPadding={true}>
			<div className="flex items-center text-white uppercase">
				<div className="border-r border-neutral-border">
					<div className=" p-4">{reward.token.symbol}</div>
				</div>
				<div className="px-4 flex justify-between items-center p-4 flex-1">
					<div>{`Amount: ${formatNumber(reward.remainingAmount, reward.token.decimals || 18)}`}</div>
					<div className="text-right">
						{endDate !== "ENDED" ? (
							<span>
								<span className="text-gray">ENDS</span> {endDate} UTC
							</span>
						) : (
							endDate
						)}
					</div>
				</div>
			</div>
		</Card>
	);
};

export default RewardCard;

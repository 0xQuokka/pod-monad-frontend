"use client";
import { POD_REWARD_INTERFACE } from "@/app/app/interfaces/Pod";
import Tooltip from "../../tooltip/tooltip";
import ExternalLink from "../../externalLink";
import { useContext } from "react";
import { TokensContext } from "@/services/TokensProvider";
import { explorerTokenURL } from "@/config/enviroment";
import ExternalIcon from "../../icons/external";
import TokenLogo from "../../token/tokenLogo";

interface IPodCardReward {
	reward: POD_REWARD_INTERFACE;
	index: number;
}

const PodCardReward = ({ reward, index }: IPodCardReward) => {
	const { getTokenInfo } = useContext(TokensContext);
	const _extendedReward = getTokenInfo(reward.token);

	return (
		<Tooltip
			key={reward.id}
			content={
				<ExternalLink link={explorerTokenURL(_extendedReward.address)}>
					<div className="flex items-center justify-center gap-1">
						<span>${_extendedReward.symbol}</span>
						<span className="w-[16px]">
							<ExternalIcon />
						</span>
					</div>
				</ExternalLink>
			}
			direction="top"
		>
			<div className={`${index > 0 ? `-ml-3` : ""} flex relative items-center`} style={{ zIndex: index + 1 }}>
				<TokenLogo size={16} logo={_extendedReward.logo} name={_extendedReward.name} />
			</div>
		</Tooltip>
	);
};

export default PodCardReward;

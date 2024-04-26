"use client";

import { POD_TOKEN_INTERFACE } from "@/app/app/interfaces/Pod";
import { TOKEN_INTERFACE } from "@/app/app/interfaces/Token";
import ExternalLink from "@/app/components/externalLink";
import PaperIcon from "@/app/components/icons/paper";
import TokenLogo from "@/app/components/token/tokenLogo";
import { explorerURL } from "@/config/enviroment";
import { TokensContext } from "@/services/TokensProvider";
import { useContext, useEffect, useState } from "react";

interface IRewardCardToken {
	token: POD_TOKEN_INTERFACE;
}
const RewardCardToken = ({ token }: IRewardCardToken) => {
	const { getTokenInfo } = useContext(TokensContext);
	const [extendedToken, setExtendedToken] = useState<TOKEN_INTERFACE>();
	useEffect(() => {
		const _extendedToken = getTokenInfo(token);
		setExtendedToken(_extendedToken);
	}, [token, getTokenInfo]);

	return (
		<>
			{extendedToken && (
				<div className="flex gap-1">
					<div className="flex gap-2">
						<div className="flex items-center justify-center">
							<TokenLogo logo={extendedToken.logo} name={extendedToken.name} />
						</div>
						<div className="text-gray">
							<div className="hover:text-white">
								<ExternalLink link={explorerURL(`/token/${extendedToken.address}`)} className="cursor-pointer flex gap-2 items-center">
									<div className="text-white">{extendedToken.symbol}</div>
									<div>
										<PaperIcon />
									</div>
								</ExternalLink>
							</div>
							<div className="uppercase text-[14px]">{extendedToken.name}</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default RewardCardToken;

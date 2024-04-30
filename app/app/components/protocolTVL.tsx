"use client";

import ExternalLink from "@/app/components/externalLink";
import { PodsContext } from "@/services/PodsProvider";
import { ReactNode, useContext } from "react";

const USDollar = new Intl.NumberFormat("en-US", {
	style: "currency",
	currency: "USD",
});

const ProtocolTVL = () => {
	const { TVL } = useContext(PodsContext);
	return (
		<>
			{TVL && TVL > 0 ? (
				<ExternalLink link="https://defillama.com/protocol/pod-finance?staking=true&pool2=true">
					<div className="text-white mt-4 border border-neutral-border rounded-[32px] p-4 bg-neutral-black inline-flex transition-all hover:bg-neutral-black-secondary">
						<div className="flex items-center gap-2">
							<div className="w-[8px] h-[8px] bg-green rounded-full animate-pulse"></div>
							<div className="flex gap-1 items-center justify-center">
								<span>{USDollar.format(TVL)}</span>
								<span>TVL</span>
							</div>
						</div>
					</div>
				</ExternalLink>
			) : (
				<></>
			)}
		</>
	);
};

export default ProtocolTVL;

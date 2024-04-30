import { POD_INTERFACE } from "@/app/app/interfaces/Pod";
import Link from "next/link";
import { appURL, explorerURL } from "@/config/enviroment";
import { formatNumber } from "@/utils/utils";
import { calculateAPR } from "@/utils/pod";
import TokenLogo from "../token/tokenLogo";
import PaperIcon from "../icons/paper";
import ExternalLink from "../externalLink";
import { isPermissionless, parseOwnerAddress } from "@/utils/address";
import OpenLockIcon from "../icons/openLock";
import ClosedLockIcon from "../icons/closedLock";
import Tooltip from "../tooltip/tooltip";
import ExternalIcon from "../icons/external";
import { TOKEN_INTERFACE } from "@/app/app/interfaces/Token";
import PodCardReward from "./podCard/podCardReward";
import Egg from "./egg";
import FungiEgg from "./fungiEgg";
import { CUSTOM_POD_IMAGE, OVERRIDE_POD_DATA } from "@/config/genesis";

interface IPodCard {
	pod: POD_INTERFACE;
	genesis?: boolean;
	underlying: TOKEN_INTERFACE;
}

const PodCard = ({ pod, genesis = false, underlying }: IPodCard) => {
	const apr = calculateAPR(pod);

	const podOwner = parseOwnerAddress(pod.owner.id);

	return (
		<div className="bg-black border border-neutral relative overflow-hidden flex flex-col">
			{genesis ? <div className="absolute z-0 bg-yellow blur-background h-[100px] -top-[50px] left-[0px] opacity-40 right-[0px] bottom-0 blur-3xl"></div> : <></>}
			<div className="relative z-20">
				<header className="flex justify-between  p-4">
					<div className="flex gap-2">
						<div className="flex items-center justify-center">
							<TokenLogo logo={underlying.logo} name={underlying.name} />
						</div>
						<div className="text-gray">
							<div className="hover:text-white">
								<Link href={appURL(`/pod/${pod.id}`)} className="cursor-pointer flex gap-2 items-center">
									<div className="text-white">{underlying.name}</div>
									<div>
										<PaperIcon />
									</div>
								</Link>
							</div>
							<ExternalLink link={explorerURL(`/token/${pod.underlying.id}`)} className="hover:text-white hover:opacity-70 transition-all">
								<div className="uppercase text-[14px]">Underlying asset</div>
							</ExternalLink>
						</div>
					</div>
				</header>
				<main className="px-4 pt-0 pb-3">
					<Link href={appURL(`/pod/${pod.id}`)} className="cursor-pointer">
						<div className="text-center flex items-center justify-center">
							<div className="h-[1px] border-t border-dotted border-neutral-border w-full absolute top-[40%] z-0"></div>
							<div className="relative z-30">{CUSTOM_POD_IMAGE[pod.id] ? <FungiEgg /> : <Egg />}</div>
						</div>
					</Link>
					<div className="min-h-[191px] md:min-h-[80px] flex flex-col justify-end pb-4">
						<div className="flex gap-1 text-gray items-center">
							<Link href={appURL(`/pod/${pod.id}`)}>
								<div className="text-white">{OVERRIDE_POD_DATA[pod.id] ? OVERRIDE_POD_DATA[pod.id].name : pod.name}</div>
							</Link>
							<div>(${pod.symbol})</div>
							<ExternalLink link={explorerURL(`/address/${pod.id}`)} className="hover:text-white">
								<PaperIcon />
							</ExternalLink>
						</div>
						<div className="mt-2 text-gray">{OVERRIDE_POD_DATA[pod.id] ? OVERRIDE_POD_DATA[pod.id].description : pod.description}</div>
						<div className="flex gap-2 flex-wrap mt-4">
							<div className="md:float-left">
								<Tooltip
									content={
										<div>
											{isPermissionless(pod.owner.id) ? (
												<div>{podOwner}</div>
											) : (
												<ExternalLink link={explorerURL(`/address/${pod.owner.id}`)}>
													<div className="min-w-[180px] text-center justify-center flex gap-1">
														<span>Owner: {podOwner}</span>
														<span className="w-[18px]">
															<ExternalIcon />
														</span>
													</div>
												</ExternalLink>
											)}
										</div>
									}
									direction="top"
								>
									<div className="text-white inline-block p-2 rounded-full border border-neutral-border bg-neutral-black-secondary">{isPermissionless(pod.owner.id) ? <OpenLockIcon /> : <ClosedLockIcon />}</div>
								</Tooltip>
							</div>
							<div className="text-white md:float-left block">
								<div className={`border py-1 px-2 bg-neutral-black-secondary border-neutral flex-1 rounded-[32px]`}>TVL: {formatNumber(pod.reserve, underlying.decimals)}</div>
							</div>
							{genesis ? (
								<div className="md:float-left block">
									<div className="uppercase text-yellow border border-yellow bg-[#FFD52E1A] rounded-[32px] py-1 px-2">Genesis pod</div>
								</div>
							) : (
								<></>
							)}
							<div className="md:float-left block">
								<div className={`${apr > 0 ? "text-green border-[#43B055] bg-[#43B0551A]" : "text-gray border-neutral-border bg-neutral-black-secondary"} border  rounded-[32px] py-1 px-2`}>{apr.toFixed(2)}% APR</div>
							</div>
						</div>
					</div>
				</main>
				<footer className="flex justify-between sm:gap-3 items-center border-t border-neutral-border text-gray  p-4">
					<div className="flex gap-2 items-center">
						{pod.rewards && pod.rewards.length > 0 ? (
							<>
								<div className="text-white uppercase">rewards:</div>
								<div className="flex items-center">
									{pod.rewards.map((_reward, i) => {
										return <PodCardReward key={_reward.id} reward={_reward} index={i} />;
									})}
								</div>
							</>
						) : (
							<div className="text-red uppercase pt-1">No rewards</div>
						)}
					</div>
					<div className="w-full flex-1 text-right flex justify-end">
						<Link href={appURL(`/pod/${pod.id}`)}>
							<div className="uppercase text-white bg-neutral-black p-3 border border-neutral-border hover:bg-neutral-black-secondary transition-all flex gap-2 items-center md:justify-end md:text-right">
								<span>VIEW POD</span>
							</div>
						</Link>
					</div>
				</footer>
			</div>
		</div>
	);
};

export default PodCard;

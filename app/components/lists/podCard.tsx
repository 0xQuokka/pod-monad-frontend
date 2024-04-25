import { POD_INTERFACE } from "@/app/app/interfaces/Pod";
import ArrowRight from "../icons/arrowRight";
import Label from "../text/Label";
import Title24 from "../text/Title24";
import Link from "next/link";
import { appURL, explorerURL } from "@/config/enviroment";
import { formatAmount, formatNumber } from "@/utils/utils";
import { getTokenInfo } from "@/utils/build/getTokenInfo";
import { calculateAPR } from "@/utils/pod";
import { parseOwnerAddress } from "@/utils/address";

interface IPodCard {
	pod: POD_INTERFACE;
}

const PodCard = async ({ pod }: IPodCard) => {
	const apr = calculateAPR(pod);

	const underlying = await getTokenInfo(pod.underlying);

	return (
		<div className="bg-black border border-neutral p-4">
			<header className="flex items-center justify-between">
				<div>
					<Label>{pod.description}</Label>
					<Title24>
						<Link href={appURL(`/pod/${pod.id}`)} className="cursor-pointer">
							{pod.name} ({pod.symbol})
						</Link>
					</Title24>
				</div>
				<div></div>
			</header>
			<footer className="flex justify-between items-center text-gray mt-2 md:flex-col md:items-start md:gap-2">
				<div className="flex items-center gap-2 md:block md:items-start">
					<div className="border py-1 px-2 border-neutral flex-1 md:float-left md:m-1">
						TVL: {formatNumber(pod.reserve, underlying.decimals)}{" "}
						<a className="text-white cursor-pointer" rel="noreferrer" target="_blank" href={explorerURL(`/token/${underlying.address}`)}>
							{underlying.symbol}
						</a>
					</div>
					<div className="py-1 px-2 border border-neutral md:float-left  md:m-1">{parseOwnerAddress(pod.owner.id)}</div>
					<div className="py-1 px-2 border border-neutral md:float-left  md:m-1">Estimated APR: {apr}%</div>
					<div className="py-1 px-2 border border-neutral md:float-left  md:m-1">{pod.rewards ? `${pod.rewards.length}` : 0} POD REWARDS</div>
				</div>
				<div className="w-full flex-1 text-right flex justify-end">
					<Link href={appURL(`/pod/${pod.id}`)}>
						<div className="uppercase text-white flex gap-2 items-center md:justify-end md:text-right">
							<span>ENTER POD</span>
							<span className="w-[14px]">
								<ArrowRight />
							</span>
						</div>
					</Link>
				</div>
			</footer>
		</div>
	);
};

export default PodCard;

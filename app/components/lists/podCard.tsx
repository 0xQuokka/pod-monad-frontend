import { POD_INTERFACE } from "@/app/app/interfaces/Pod";
import ArrowRight from "../icons/arrowRight";
import Label from "../text/Label";
import Title24 from "../text/Title24";
import { ethers } from "ethers";
import Link from "next/link";
import { URI_PREFIX, appURL } from "@/config/enviroment";
import { formatNumber } from "@/utils/utils";

interface IPodCard {
	pod: POD_INTERFACE;
}

const PodCard = ({ pod }: IPodCard) => {
	return (
		<div className="bg-black border border-neutral p-4">
			<header className="flex items-center justify-between">
				<div>
					<Label>{pod.description}</Label>
					<Title24>
						{pod.name} ({pod.symbol})
					</Title24>
				</div>
				<div></div>
			</header>
			<footer className="flex justify-between items-center text-gray mt-2 md:flex-col md:items-start md:gap-2">
				<div className="flex items-center gap-2 md:flex-col md:items-start">
					<div className="border py-1 px-2 border-neutral">
						TVL: {formatNumber(pod.reserve, pod.underlying.decimals)} {pod.underlying.symbol}
					</div>
					<div className="py-1 px-2 border border-neutral">{pod.owner.id.toLowerCase() != ethers.ZeroAddress.toLowerCase() ? pod.owner.id : `PERMISIONLESS`}</div>
				</div>
				<div className="w-full">
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

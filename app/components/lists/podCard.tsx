import { POD_INTERFACE } from "@/app/app/interfaces/Pod";
import ArrowRight from "../icons/arrowRight";
import Label from "../text/Label";
import Title24 from "../text/Title24";
import { ethers } from "ethers";
import Link from "next/link";
import { URI_PREFIX, appURL } from "@/config/enviroment";

interface IPodCard {
	pod: POD_INTERFACE;
}

const PodCard = ({ pod }: IPodCard) => {
	return (
		<div className="bg-black border border-neutral p-4">
			<header className="flex items-center justify-between">
				<div>
					<Label>{pod.description}</Label>
					<Title24>{pod.symbol}</Title24>
				</div>
				<div></div>
			</header>
			<footer className="flex justify-between items-center text-gray mt-2">
				<div className="flex items-center gap-2">
					<div className="border py-1 px-2 border-neutral">TVL: {pod.reserve.toString()}</div>
					<div className="py-1 px-2 border border-neutral">{pod.owner.id.toLowerCase() != ethers.ZeroAddress.toLowerCase() ? pod.owner.id : `PERMISIONLESS`}</div>
				</div>
				<Link href={appURL(`/pod/${pod.id}`)}>
					<div className="uppercase text-white flex gap-2 items-center">
						<span>ENTER POD</span>
						<span className="w-[14px]">
							<ArrowRight />
						</span>
					</div>
				</Link>
			</footer>
		</div>
	);
};

export default PodCard;

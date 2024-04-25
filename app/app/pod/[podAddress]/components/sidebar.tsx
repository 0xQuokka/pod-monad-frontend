import { POD_INTERFACE } from "@/app/app/interfaces/Pod";
import Card from "@/app/components/cards/Card";
import Label from "@/app/components/text/Label";
import Title32 from "@/app/components/text/Title32";
import { TESTNET_MINTABLE_UNDERLYING, explorerTokenURL } from "@/config/enviroment";
import { formatNumber } from "@/utils/utils";
import MintableButton from "./mintableButton";
import { parseOwnerAddress } from "@/utils/address";

interface Sidebar {
	pod: POD_INTERFACE;
}

const LIST_KEY_VALUE = (key: string, value: string) => {
	return (
		<div className="flex justify-between items-center">
			<Label>{key}</Label>
			<div className="text-white">{value}</div>
		</div>
	);
};

const Sidebar = ({ pod }: Sidebar) => {
	return (
		<div className="w-[300px] md:w-full flex flex-col gap-6">
			<div>
				<Title32 className="text-white">{pod.name}</Title32>
				<Label>{pod.description}</Label>
			</div>
			<div className="flex flex-col gap-2">
				<Card className="p-0" noPadding={true}>
					<div className="flex flex-col">
						<div className="border-b border-neutral-border p-4">
							<Label className="text-white">POD INFO</Label>
						</div>
						<div className="p-4 flex flex-col gap-1">
							{LIST_KEY_VALUE("TVL:", `${formatNumber(pod.reserve, pod.underlying.decimals)} ${pod.underlying.symbol}`)}
							{LIST_KEY_VALUE("OWNER:", parseOwnerAddress(pod.owner.id))}
							{LIST_KEY_VALUE("UNDERLYING:", pod.underlying.symbol)}
							{LIST_KEY_VALUE("POD TICKER:", pod.symbol)}
						</div>
					</div>
				</Card>
				<Card>{LIST_KEY_VALUE("LOCKED", `${formatNumber(pod.locked, pod.decimals)} ${pod.symbol}`)}</Card>
				{pod.underlying.id.toLowerCase() == TESTNET_MINTABLE_UNDERLYING.toLowerCase() ? <MintableButton token={pod.underlying.id} /> : <></>}
				<a href={explorerTokenURL(pod.id)} rel="noreferrer" target="_blank" className="text-white underline cursor-pointer mt-4">
					View POD in explorer
				</a>
			</div>
		</div>
	);
};

export default Sidebar;

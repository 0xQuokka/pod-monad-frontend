import { POD_INTERFACE } from "@/app/app/interfaces/Pod";
import PodCard from "./podCard";
import { GENESIS_PODS } from "@/config/genesis";

interface IPodGrid {
	pods: POD_INTERFACE[];
}

const PodGrid = async ({ pods }: IPodGrid) => {
	const genesisPods: POD_INTERFACE[] = [];
	const nonGenesisPods: POD_INTERFACE[] = [];
	pods.map((_pod) => {
		if (GENESIS_PODS[_pod.id.toLowerCase()] == true) {
			genesisPods.push(_pod);
		} else {
			nonGenesisPods.push(_pod);
		}
	});
	return (
		<div className="grid grid-cols-2 gap-3">
			{genesisPods ? (
				genesisPods.map((pod: POD_INTERFACE) => {
					return <PodCard pod={pod} key={pod.id} genesis={true} />;
				})
			) : (
				<></>
			)}
			{nonGenesisPods ? (
				nonGenesisPods.map((pod: POD_INTERFACE) => {
					return <PodCard pod={pod} key={pod.id} />;
				})
			) : (
				<></>
			)}
		</div>
	);
};

export default PodGrid;

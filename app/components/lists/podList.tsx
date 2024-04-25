import { POD_INTERFACE } from "@/app/app/interfaces/Pod";
import PodCard from "./podCard";
import { getTokenMapping } from "@/utils/build/getTokenMapping";

interface IPodList {
	pods: POD_INTERFACE[];
}

const PodList = async ({ pods }: IPodList) => {
	return (
		<div className="flex flex-col gap-3">
			{pods ? (
				pods.map((pod: POD_INTERFACE) => {
					return <PodCard pod={pod} key={pod.id} />;
				})
			) : (
				<></>
			)}
		</div>
	);
};

export default PodList;

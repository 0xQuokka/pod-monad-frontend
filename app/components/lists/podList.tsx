import { POD_INTERFACE } from "@/app/app/interfaces/Pod";
import { useQuery, gql } from "@apollo/client";
import { useEffect } from "react";
import PodCard from "./podCard";

interface IPodList {
	pods: POD_INTERFACE[];
}

const PodList = ({ pods }: IPodList) => {
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

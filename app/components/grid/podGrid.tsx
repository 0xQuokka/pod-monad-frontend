"use client";
import { POD_INTERFACE } from "@/app/app/interfaces/Pod";
import PodCard from "./podCard";
import { GENESIS_PODS } from "@/config/genesis";
import { useContext, useEffect, useState } from "react";
import { PodsContext } from "@/services/PodsProvider";
import { TokensContext } from "@/services/TokensProvider";

const PodGrid = () => {
	const { pods, loadingPods } = useContext(PodsContext);
	const { getTokenInfo } = useContext(TokensContext);

	const [genesisPods, setGenesisPods] = useState<POD_INTERFACE[]>([]);
	const [nonGenesisPods, setNonGenesisPods] = useState<POD_INTERFACE[]>([]);

	useEffect(() => {
		const _genesisPods: POD_INTERFACE[] = [];
		const _nonGenesisPods: POD_INTERFACE[] = [];

		pods.map((_pod) => {
			if (GENESIS_PODS[_pod.id.toLowerCase()] == true) {
				_genesisPods.push(_pod);
			} else {
				_nonGenesisPods.push(_pod);
			}
		});
		setGenesisPods(_genesisPods);
		setNonGenesisPods(_nonGenesisPods);
	}, [pods]);
	return (
		<div className="grid grid-cols-2 md:grid-cols-1 gap-3">
			{genesisPods ? (
				genesisPods.map((pod: POD_INTERFACE) => {
					const underlying = getTokenInfo(pod.underlying);
					return <PodCard pod={pod} key={pod.id} genesis={true} underlying={underlying} />;
				})
			) : (
				<></>
			)}
			{nonGenesisPods ? (
				nonGenesisPods.map((pod: POD_INTERFACE) => {
					const underlying = getTokenInfo(pod.underlying);
					return <PodCard pod={pod} key={pod.id} underlying={underlying} />;
				})
			) : (
				<></>
			)}
		</div>
	);
};

export default PodGrid;

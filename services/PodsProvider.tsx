"use client";
import { POD_INTERFACE } from "@/app/app/interfaces/Pod";
import { isEthereumAddress } from "@/utils/address";
import { ReactNode, createContext, useContext, useEffect, useState } from "react";

export interface IPodsContext {
	pods: POD_INTERFACE[];
	podFactory:
		| {
				availablePods: number;
		  }
		| {};
	searchPods: Function;
	loadingPods: boolean;
}

export const PodsContext = createContext<IPodsContext>({
	pods: [],
	podFactory: {},
	searchPods: () => {},
	loadingPods: false,
});

export const PodsProvider = ({ children }: { children: React.ReactNode }) => {
	const [allPods, setAllPods] = useState<POD_INTERFACE[]>([]);
	const [pods, setPods] = useState<POD_INTERFACE[]>([]);
	const [podFactory, setPodFactory] = useState<{ availablePods: number } | {}>({});
	const [loadingPods, setLoadingPods] = useState<boolean>(false);

	const searchPods = async (underlying: string | false) => {
		if (!underlying) {
			setPods(allPods);
			return;
		}

		if (!isEthereumAddress(underlying)) return;

		const res = await fetch(`/api/pods/${underlying}`, {
			next: {
				revalidate: 120,
				tags: ["pods"],
			},
		});

		const data = await res.json();
		if (data.pods) {
			setPods(data.pods);
		}
	};

	useEffect(() => {
		const populate = async () => {
			const res = await fetch("/api/pods", {
				next: {
					revalidate: 120,
					tags: ["pods"],
				},
			});

			const data = await res.json();
			if (data.pods) {
				setPods(data.pods);
				setAllPods(data.pods);
			}
			if (data.podFactories && data.podFactories[0]) {
				setPodFactory(data.podFactories[0]);
			}
		};
		populate();
	}, []);

	return (
		<PodsContext.Provider
			value={{
				pods,
				podFactory,
				searchPods,
				loadingPods,
			}}
		>
			{children}
		</PodsContext.Provider>
	);
};

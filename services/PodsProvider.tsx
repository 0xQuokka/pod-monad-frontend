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
	TVL: number;
}

export const PodsContext = createContext<IPodsContext>({
	pods: [],
	podFactory: {},
	searchPods: () => {},
	loadingPods: false,
	TVL: 0,
});

export const PodsProvider = ({ children }: { children: React.ReactNode }) => {
	const [allPods, setAllPods] = useState<POD_INTERFACE[]>([]);
	const [pods, setPods] = useState<POD_INTERFACE[]>([]);
	const [podFactory, setPodFactory] = useState<{ availablePods: number } | {}>({});
	const [loadingPods, setLoadingPods] = useState<boolean>(false);
	const [TVL, setTVL] = useState<number>(0);

	const searchPods = async (underlying: string | false) => {
		if (!underlying) {
			setPods(allPods);
			return;
		}

		if (!isEthereumAddress(underlying)) return;
		setLoadingPods(true);
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pods/${underlying}`, {
			next: {
				revalidate: 120,
				tags: ["pods"],
			},
		});

		const data = await res.json();
		if (data.pods) {
			setPods(data.pods);
		}
		setLoadingPods(false);
	};

	useEffect(() => {
		const populate = async () => {
			setLoadingPods(true);
			const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pods`, {
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
			if (data.tvl) {
				setTVL(data.tvl);
			}
			setLoadingPods(false);
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
				TVL,
			}}
		>
			{children}
		</PodsContext.Provider>
	);
};

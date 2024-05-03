"use client";
import { POD_INTERFACE } from "@/app/app/interfaces/Pod";
import { formatSmallNumber } from "@/utils/utils";
import { useEffect, useState } from "react";

interface IPodCardTVL {
	pod: {
		id: POD_INTERFACE["id"];
	};
}

const PodCardTVL = ({ pod }: IPodCardTVL) => {
	const [loading, setLoading] = useState<boolean>(false);
	const [apr, setAPR] = useState<number | undefined>();
	const [tvl, setTVL] = useState<number | undefined>();
	const [error, setError] = useState<boolean>(false);

	useEffect(() => {
		const init = () => {
			setLoading(true);
			fetch(`${process.env.NEXT_PUBLIC_API_URL}/tvl/pods/${pod.id}`)
				.then(async (res) => {
					const parsed = await res.json();
					console.log({ parsed });
					setAPR(parsed.apr);
					setTVL(parsed.tvl);
				})
				.catch((e) => {
					console.log({ e });
					setError(true);
				})
				.finally(() => {
					setLoading(false);
				});
		};

		init();
	}, [pod.id]);
	return (
		<>
			{!error && !loading && apr != undefined && tvl != undefined ? (
				<>
					<div className="text-white md:float-left block">
						<div className={`border py-1 px-2 bg-neutral-black-secondary border-neutral flex-1 rounded-[32px]`}>TVL: {typeof tvl == "string" ? tvl : formatSmallNumber(tvl)}</div>{" "}
					</div>
					<div className="md:float-left block">
						<div className={`${1 > 0 ? "text-green border-[#43B055] bg-[#43B0551A]" : "text-gray border-neutral-border bg-neutral-black-secondary"} border  rounded-[32px] py-1 px-2`}>{apr.toFixed(2)}% APR</div>
					</div>
				</>
			) : (
				<></>
			)}
		</>
	);
};

export default PodCardTVL;

"use client";

import Label from "@/app/components/text/Label";
import { PodsContext } from "@/services/PodsProvider";
import { useContext } from "react";

const AvailablePods = () => {
	const { podFactory }: any = useContext(PodsContext);
	return (
		<div>
			{podFactory && podFactory.availablePods ? (
				<Label>
					<span className="text-white">{podFactory.availablePods}</span> currently active
				</Label>
			) : (
				<Label>
					<span className="text-white">0</span> currently active
				</Label>
			)}
		</div>
	);
};

export default AvailablePods;

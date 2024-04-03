"use client";
import { useAccount, useReadContract } from "wagmi";

import Button from "../components/button";
import Label from "../components/text/Label";
import Title32 from "../components/text/Title32";

import PodList from "../components/lists/podList";

const App = () => {
	return (
		<div>
			<div className="flex justify-between items-center">
				<div>
					<Title32>ALL PODS</Title32>
					<Label>231 currently active</Label>
				</div>
				<div>
					<Button>Create a pod</Button>
				</div>
			</div>
			<div className="flex flex-col gap-2 mt-4">
				<PodList />
			</div>
		</div>
	);
};

export default App;

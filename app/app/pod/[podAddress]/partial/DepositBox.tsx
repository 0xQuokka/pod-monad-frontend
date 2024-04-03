"use client";
import { POD_INTERFACE } from "@/app/app/interfaces/Pod";
import Label from "@/app/components/text/Label";
import Title32 from "@/app/components/text/Title32";
import { useState } from "react";

interface IDepositBox {
	pod: POD_INTERFACE;
}

const DepositBox = ({ pod }: IDepositBox) => {
	const [action, setAction] = useState<"deposit" | "withdraw">("deposit");
	return (
		<div>
			<div className="flex items-center gap-4">
				<div>
					<Title32 className={`${action === "deposit" ? "text-white" : "text-gray"}`}>Deposit</Title32>
				</div>
				<div>
					<Title32 className={`${action === "withdraw" ? "text-white" : "text-gray"}`}>Withdraw</Title32>
				</div>
			</div>
			<div className="mt-2 mb-6">
				<Label>Deposit your {pod.underlying.symbol}</Label>
			</div>
		</div>
	);
};

export default DepositBox;

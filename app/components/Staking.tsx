"use client";
import { useState } from "react";
import { POD_TOKEN_INTERFACE } from "../app/interfaces/Pod";
import GenericInput from "../app/pod/[podAddress]/components/input";
import Button from "./button";

const Staking = () => {
	const [amount, setAmount] = useState<number>(0);
	const [activeTab, setActiveTab] = useState<"deposit" | "withdraw">("deposit");

	return (
		<div className="w-full mt-20">
			<section className="grid grid-cols-2 md:flex md:flex-col md:gap-2">
				<div>
					<h1 className="text-white text-[28px] leading-[28px] -tracking-[1px] font-[500]">Stake your wMON</h1>
					<div className="text-[#737E80] mt-2">Protocol sneak peek</div>
				</div>
				<div>
					<header>
						<div className="inline-block cursor-pointer">
							<div className="flex items-center border border-border rounded-[4px] overflow-hidden">
								<div 
									onClick={() => setActiveTab("deposit")}
									className={`px-3 py-1 transition-all ${
										activeTab === "deposit" 
											? "bg-violet text-white" 
											: "bg-neutral-black text-gray"
									}`}
								>
									Deposit
								</div>
								<div 
									onClick={() => setActiveTab("withdraw")}
									className={`py-1 px-3 transition-all ${
										activeTab === "withdraw" 
											? "bg-violet text-white" 
											: "bg-neutral-black text-gray"
									}`}
								>
									Withdraw
								</div>
							</div>
						</div>
						<div className="text-[#737E80] mt-2">Choose an amount to deposit and start earning PodPoints.</div>
					</header>
					<div>
						<div className="mt-6">
							<GenericInput balance={0} disabled={true} token={{ symbol: "wMON" } as POD_TOKEN_INTERFACE} amount={amount} setAmount={setAmount} label="Amount to deposit" />
							<Button className="mt-4 text-center" disabled={true}>Coming soon</Button>
					</div>
					</div>
				</div>
			</section>
		</div>
	);
};

export default Staking;

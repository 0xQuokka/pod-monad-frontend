"use client";

import { POD_TOKEN_INTERFACE } from "@/app/app/interfaces/Pod";
import Label from "@/app/components/text/Label";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

interface IGenericInput {
	token: POD_TOKEN_INTERFACE;
	amount: number;
	setAmount: Dispatch<SetStateAction<number>>;
	label: string;
	balance: number;
}

const GenericInput = ({ token, amount, setAmount, label, balance }: IGenericInput) => {
	const [inputFocused, setInputFocused] = useState<boolean>(false);

	const [insufficientBalance, setInsufficientBalance] = useState<boolean>(amount > balance);

	useEffect(() => {
		if (amount && balance) {
			setInsufficientBalance(amount > balance);
		} else if (!balance && amount) {
			setInsufficientBalance(true);
		} else if (!amount) {
			setInsufficientBalance(false);
		}
	}, [amount, balance]);

	return (
		<div className={`${insufficientBalance ? "border-[#FC5555]" : inputFocused ? "border-white" : "border-neutral-border"} p-4 flex flex-col gap-4 bg-neutral-black border transition-all`}>
			<div className="flex justify-between items-center">
				<div className="flex-1">
					<input
						className="text-[20px] text-white outline-none bg-transparent w-full"
						placeholder={`0`}
						type="number"
						value={amount || ""}
						onChange={(e) => {
							setAmount(Number(e.target.value));
						}}
						onFocus={() => {
							setInputFocused(true);
						}}
						onBlur={() => {
							setInputFocused(false);
						}}
					/>
				</div>
				<div className="rounded-[8px] border border-neutral-border px-3 py-2">
					<div className="flex gap-1 items-center">
						<div></div>
						<div className="text-white">{token.symbol}</div>
					</div>
				</div>
			</div>
			<div className="flex justify-between items-center">
				{insufficientBalance ? <div className="text-[#FC5555] leading-none uppercase">Insufficient balance</div> : <Label>{label}</Label>}

				<Label onClick={() => setAmount(balance)} className="text-white cursor-pointer transition-all opacity-70 hover:opacity-100 tracking-tight">
					USE MAX
				</Label>
			</div>
		</div>
	);
};

export default GenericInput;

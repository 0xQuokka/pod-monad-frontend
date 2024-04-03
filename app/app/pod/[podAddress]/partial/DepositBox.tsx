"use client";
import { POD_INTERFACE, POD_TOKEN_INTERFACE } from "@/app/app/interfaces/Pod";
import Label from "@/app/components/text/Label";
import Title32 from "@/app/components/text/Title32";
import { useRef, useEffect, useState } from "react";
import GenericInput from "../components/input";
import Card from "@/app/components/cards/Card";
import { useAccount, useReadContract } from "wagmi";
import POD_ABI from "@/abis/pod";
import ERC20_ABI from "@/abis/ERC20";
import { formatAmount, formatNumber, parseAmount } from "@/utils/utils";
import { ethers } from "ethers";
import useDebounce from "@/utils/useDebounce";
import Button from "@/app/components/button";

interface IDepositBox {
	pod: POD_INTERFACE;
}

type ActionType = "deposit" | "withdraw";
const labelByAction = {
	deposit: "Amount to deposit",
	withdraw: "Amount to withdraw",
};

const DepositBox = ({ pod }: IDepositBox) => {
	const [amount, setAmount] = useState<number>(0);
	const [balance, setBalance] = useState<number>(0);

	const [actionAmount, setActionAmount] = useState<string>("0");

	const [actionToken, setActionToken] = useState<POD_TOKEN_INTERFACE>(pod.underlying);
	const [receiveToken, setReceiveToken] = useState<POD_TOKEN_INTERFACE>(pod);

	const [lock, setLock] = useState<boolean>(true);

	const debouncedAmount = useDebounce(amount);

	const [action, setAction] = useState<ActionType>("deposit");

	const { address: account } = useAccount();

	const switchAction = (_action: ActionType): any => {
		if (action === _action) return;

		setAction(_action);
		setAmount(0);

		if (_action === "deposit") {
			setActionToken(pod.underlying);
			setReceiveToken(pod);
		} else {
			setActionToken(pod);
			setReceiveToken(pod.underlying);
		}
	};

	const { data: receiveAmount } = useReadContract({
		abi: POD_ABI,
		address: pod.id,
		functionName: action === "deposit" ? "previewDeposit" : "previewRedeem",
		args: [actionAmount],
		query: {
			refetchInterval: 3600,
		},
	});

	const { data: underlyingBalance } = useReadContract({
		abi: ERC20_ABI,
		address: pod.underlying.id,
		functionName: "balanceOf",
		args: [account],
		query: {
			refetchInterval: 3600,
			enabled: !!account,
		},
	});

	const { data: podBalance } = useReadContract({
		abi: ERC20_ABI,
		address: pod.id,
		functionName: "balanceOf",
		args: [account],
		query: {
			refetchInterval: 3600,
			enabled: !!account,
		},
	});

	useEffect(() => {
		if (action === "deposit" && underlyingBalance !== undefined && underlyingBalance !== null) {
			setBalance(parseFloat(formatAmount(underlyingBalance.toString(), pod.underlying.decimals)));
		} else if (action === "withdraw" && podBalance !== undefined && podBalance !== null) {
			setBalance(parseFloat(formatAmount(podBalance.toString(), pod.decimals)));
		}
	}, [action, underlyingBalance, podBalance, pod]);

	useEffect(() => {
		if (!actionToken) return;

		setActionAmount(parseAmount(debouncedAmount.toString(), actionToken.decimals));
	}, [debouncedAmount, actionToken]);

	return (
		<div>
			<div className="flex items-center gap-4">
				<div>
					<Title32 onClick={() => switchAction("deposit")} className={`transition-all ${action === "deposit" ? "text-white" : "text-gray opacity-60 hover:opacity-90 cursor-pointer "}`}>
						Deposit
					</Title32>
				</div>
				<div>
					<Title32 onClick={() => switchAction("withdraw")} className={`transition-all ${action === "withdraw" ? "text-white" : "text-gray opacity-60 hover:opacity-90 cursor-pointer "}`}>
						Withdraw
					</Title32>
				</div>
			</div>
			<div className="mt-2 mb-6">
				<Label>Deposit your {actionToken.symbol}</Label>
			</div>
			<div>
				<GenericInput balance={balance} token={actionToken} amount={amount} setAmount={setAmount} label={labelByAction[action]} />
			</div>
			<Card className="mt-2">
				<div className="flex justify-between items-center text-gray">
					<div className="uppercase">YOU&apos;LL receive</div>
					<div className="text-white">
						<span>{receiveAmount ? formatAmount(receiveAmount.toString(), receiveToken.decimals) : "-"}</span> <span>{receiveToken.symbol}</span>
					</div>
				</div>
			</Card>
			{action === "deposit" ? (
				<div className="text-right text-white mt-2 cursor-pointer" onClick={() => setLock((_lock) => !_lock)}>
					<div className="flex justify-end items-center gap-2">
						<input type="checkbox" checked={lock} onChange={() => {}} className="pointer-events-none" />
						<span className="pt-[1px]">ALSO LOCK AMOUNT</span>
					</div>
				</div>
			) : (
				<></>
			)}
			<div className="my-2">
				<Button className="text-center">{action.toUpperCase()}</Button>
			</div>
			<Card className="mt-8">
				<div className="flex justify-between items-center text-gray">
					<div className="uppercase">{pod.underlying.name} balance</div>
					<div className="text-white">
						<span>{underlyingBalance ? formatNumber(BigInt(underlyingBalance.toString()), pod.underlying.decimals) : 0}</span> <span>{pod.underlying.symbol}</span>
					</div>
				</div>
			</Card>
			<Card className="mt-2">
				<div className="flex justify-between items-center text-gray">
					<div className="uppercase">{pod.name} balance</div>
					<div className="text-white">
						<span>{podBalance ? formatNumber(BigInt(podBalance.toString()), pod.decimals) : 0}</span> <span>{pod.symbol}</span>
					</div>
				</div>
			</Card>
		</div>
	);
};

export default DepositBox;

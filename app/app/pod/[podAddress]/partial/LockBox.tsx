"use client";
import Label from "@/app/components/text/Label";
import Title32 from "@/app/components/text/Title32";
import { useEffect, useState } from "react";
import GenericInput from "../components/input";
import { POD_INTERFACE } from "@/app/app/interfaces/Pod";
import ERC20_ABI from "@/abis/ERC20";
import { useAccount, useReadContract, useWriteContract } from "wagmi";
import { formatAmount, formatNumber, parseAmount } from "@/utils/utils";
import Button from "@/app/components/button";
import useDebounce from "@/utils/useDebounce";
import POD_ABI from "@/abis/pod";
import Card from "@/app/components/cards/Card";

interface ILockBox {
	pod: POD_INTERFACE;
}

type ActionType = "lock" | "unlock";

const labelByAction = {
	lock: "Amount to lock",
	unlock: "Amount to unlock",
};

const LockBox = ({ pod }: ILockBox) => {
	const { address: account } = useAccount();
	const { writeContract: writeAction, status: statusAction, isPending: isPendingAction, error: actionError } = useWriteContract();

	const [action, setAction] = useState<ActionType>("lock");

	const [amount, setAmount] = useState<number>(0);
	const [balance, setBalance] = useState<number>(0);

	const [actionAmount, setActionAmount] = useState<string>("0");

	const switchAction = (_action: ActionType): any => {
		if (action === _action) return;

		setAction(_action);
	};

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

	const { data: lockedBalance } = useReadContract({
		abi: POD_ABI,
		address: pod.id,
		functionName: "lockedShares",
		args: [account],
		query: {
			refetchInterval: 3600,
			enabled: !!account,
		},
	});

	useEffect(() => {
		if (action === "lock") {
			setBalance(parseFloat(formatAmount((podBalance || 0).toString(), pod.decimals)));
		} else {
			setBalance(parseFloat(formatAmount((lockedBalance || 0).toString(), pod.decimals)));
		}
	}, [podBalance, lockedBalance, action, pod.decimals]);

	const debouncedAmount = useDebounce(amount);

	useEffect(() => {
		setActionAmount(parseAmount(debouncedAmount.toString(), pod.decimals));
	}, [debouncedAmount, pod.decimals]);

	const performAction = () => {
		if (isPendingAction) return;

		writeAction(
			{
				abi: POD_ABI,
				address: pod.id,
				functionName: action,
				args: [actionAmount, account],
			},
			{
				onSuccess: () => {
					setAmount(0);
				},
			}
		);
	};

	return (
		<div>
			<div className="flex items-center gap-4">
				<div>
					<Title32 onClick={() => switchAction("lock")} className={`transition-all ${action === "lock" ? "text-white" : "text-gray opacity-60 hover:opacity-90 cursor-pointer "}`}>
						Lock
					</Title32>
				</div>
				<div>
					<Title32 onClick={() => switchAction("unlock")} className={`transition-all ${action === "unlock" ? "text-white" : "text-gray opacity-60 hover:opacity-90 cursor-pointer "}`}>
						Unlock
					</Title32>
				</div>
			</div>
			<div className="mt-2 mb-6">
				<div className="text-gray ">
					<span>Below are the rewards of this pod. In order to receive them,</span> <span className="text-white">you need to lock your deposits.</span>
				</div>
			</div>
			<div>
				<GenericInput balance={balance} token={pod} amount={amount} setAmount={setAmount} label={labelByAction[action]} />
			</div>
			<div className="my-4">
				<Button onClick={performAction} className={`text-center transition-all ${!amount ? "opacity-70 pointer-events-none" : ""}`} loading={isPendingAction}>
					{action.toUpperCase()}
				</Button>
			</div>
			<Card className="mt-8">
				<div className="flex justify-between items-center text-gray">
					<div className="uppercase">Shares locked</div>
					<div className="text-white">
						<span>{lockedBalance ? formatNumber(BigInt(lockedBalance.toString()), pod.decimals) : 0}</span> <span>{pod.symbol}</span>
					</div>
				</div>
			</Card>
		</div>
	);
};

export default LockBox;

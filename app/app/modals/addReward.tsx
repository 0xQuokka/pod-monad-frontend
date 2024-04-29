"use client";

import { useContext, useEffect, useState } from "react";
import { IModal } from "../interfaces/Modal";
import Title32 from "@/app/components/text/Title32";
import Button from "@/app/components/button";
import TokenAddressInput from "../pod/[podAddress]/components/tokenAddressInput";
import Label from "@/app/components/text/Label";
import GenericInput from "../pod/[podAddress]/components/input";
import { POD_INTERFACE, POD_TOKEN_INTERFACE } from "../interfaces/Pod";
import { useAccount, useReadContract, useWriteContract } from "wagmi";
import ERC20_ABI from "@/abis/ERC20";
import { Address } from "viem";
import { formatAmount, formatNumber, genericDateToUTCSeconds, parseGenericDate } from "@/utils/utils";
import GenericDateTimeInput from "../pod/[podAddress]/components/geneticDateTimeInput";
import { start } from "repl";
import { ethers } from "ethers";
import POD_ABI from "@/abis/pod";
import { ModalContext } from "@/services/ModalProvider";

interface IStep1 extends IModal {
	address: string;
	setAddress: React.Dispatch<React.SetStateAction<string>>;
	setName: React.Dispatch<React.SetStateAction<string>>;
	setTicker: React.Dispatch<React.SetStateAction<string>>;
	setDecimals: React.Dispatch<React.SetStateAction<number>>;
}

const Step1Modal = ({ setStepReady, address, setAddress, setTicker, setName, setDecimals }: IStep1) => {
	const [loading, setLoading] = useState<boolean>(false);
	const [valid, setValid] = useState<boolean>(false);

	return (
		<div className="p-1">
			<header>
				<Title32 className="uppercase text-white">Add a reward</Title32>
				<p className="text-gray mt-3 mb-6">
					You can add as <span className="text-white">reward</span> any asset: a single ERC-20 token, an LP token, or even a yield-bearing position. <span className="text-white">Depositors will automatically earn it</span>, among
					all other active rewards.
				</p>
			</header>
			<main>
				<TokenAddressInput setValid={setValid} setLoading={setLoading} setName={setName} setDecimals={setDecimals} setTicker={setTicker} address={address} setAddress={setAddress} />
			</main>
			<footer className="flex items-end mt-8 justify-end">
				<Button
					loading={loading}
					disabled={!valid}
					onClick={() => {
						if (!valid) return;
						setStepReady(true);
					}}
				>
					NEXT
				</Button>
			</footer>
		</div>
	);
};

interface IStep2 extends IModal {
	amount: number;
	setAmount: React.Dispatch<React.SetStateAction<number>>;
	reward: Address;
	ticker: string;
	name: string;
	decimals: number;
	startDate: number;
	setStartDate: React.Dispatch<React.SetStateAction<number>>;
	endDate: number;
	setEndDate: React.Dispatch<React.SetStateAction<number>>;
	stepBack: Function;
}

const Step2Modal = ({ setStepReady, ticker, name, amount, setAmount, reward, decimals, startDate, setStartDate, endDate, setEndDate, stepBack }: IStep2) => {
	const [loading, setLoading] = useState<boolean>(false);
	const [valid, setValid] = useState<boolean>(false);
	const [balance, setBalance] = useState<number>(0);

	const [validStartDate, setValidStartDate] = useState<boolean>(false);
	const [validEndDate, setValidEndDate] = useState<boolean>(false);

	useEffect(() => {
		const now = new Date().getTime();

		if (!startDate || !endDate || !amount) {
			setValid(false);
			return;
		}

		const _start = new Date(startDate as any).getTime();
		const _end = new Date(endDate as any).getTime();

		if (_start > now && _start < _end) {
			setValid(true);
		} else {
			setValid(false);
		}
	}, [startDate, endDate, amount]);

	const { address: account } = useAccount();

	const { data: rewardBalance } = useReadContract({
		abi: ERC20_ABI,
		address: reward,
		functionName: "balanceOf",
		args: [account],
		query: {
			refetchInterval: 3600,
			enabled: !!account,
		},
	});

	useEffect(() => {
		if (rewardBalance !== undefined && rewardBalance !== null) {
			setBalance(parseFloat(formatAmount(rewardBalance.toString(), decimals)));
		} else {
			setBalance(0);
		}
	}, [rewardBalance, decimals]);

	return (
		<div className="p-1">
			<header>
				<Title32 className="uppercase text-white">Reward settings</Title32>
				<p className="text-gray mt-3 mb-6">
					Set the <span className="text-white">reward amount, start and end date</span>
				</p>
			</header>
			<main>
				<div className="flex flex-col gap-2">
					<Label className="text-white">SELECTED TOKEN</Label>
					<div className="flex bg-neutral-black-secondary border border-neutral text-white">
						<div className="p-4 border-r border-neutral">{ticker}</div>
						<div className="p-4">{name}</div>
					</div>
				</div>
				<div className="flex flex-col gap-2 mt-8">
					<Label className="text-white">SET REWARD AMOUNT</Label>
					<div>
						<GenericInput token={{ symbol: ticker } as POD_TOKEN_INTERFACE} amount={amount} setAmount={setAmount} balance={balance} label="ENTER AMOUNT" />
						<Label className="text-right mt-2">Balance: {rewardBalance ? formatNumber(rewardBalance as any, decimals) : "-"}</Label>
					</div>
				</div>
				<div className="flex flex-col gap-2 mt-8">
					<Label className="text-white">SET REWARD DATE (LOCAL TIME)</Label>
					<div className="flex gap-2 sm:flex-col">
						<div className="flex-1">
							<Label>Start date</Label>
							<GenericDateTimeInput date={startDate} setDate={setStartDate} placeholder="SET START DATE" setValid={setValidStartDate} />
						</div>
						<div className="flex-1">
							<Label>End date</Label>
							<GenericDateTimeInput date={endDate} setDate={setEndDate} placeholder="SET END DATE" setValid={setValidStartDate} />
						</div>
					</div>
				</div>
			</main>
			<footer className="flex items-end mt-8 justify-end gap-2">
				<Button onClick={() => stepBack()}>BACK</Button>
				<Button
					disabled={!valid}
					onClick={() => {
						if (!valid) return;
						setStepReady(true);
					}}
				>
					NEXT
				</Button>
			</footer>
		</div>
	);
};

interface IStep3 extends IModal {
	reward: Address;
	name: string;
	amount: number;
	decimals: number;
	startDate: Date;
	endDate: Date;
	pod: POD_INTERFACE;
	stepBack: Function;
}

const Step3Modal = ({ name, reward, amount, startDate, endDate, decimals, pod, stepBack, setStepReady }: IStep3) => {
	const { address: account } = useAccount();
	const rewardAmount = ethers.parseUnits(amount.toString(), decimals);

	const { writeContract: writeApprove, status: statusApprove, isPending: isPendingApprove } = useWriteContract();
	const { writeContract: writeAction, status: statusAction, isPending: isPendingAction, error: actionError } = useWriteContract();

	const { data: allowance } = useReadContract({
		abi: ERC20_ABI,
		address: reward,
		functionName: "allowance",
		args: [account, pod.id],
		query: {
			refetchInterval: 3600,
			enabled: !!account,
		},
	});

	const performApprove = () => {
		if (isPendingAction || isPendingApprove) return;

		writeApprove({
			abi: ERC20_ABI,
			address: reward,
			functionName: "approve",
			args: [pod.id, rewardAmount],
		});
	};

	const performAction = () => {
		if (isPendingAction || isPendingApprove) return;

		writeAction(
			{
				abi: POD_ABI,
				address: pod.id,
				functionName: "addRewardToken",
				args: [
					reward,
					rewardAmount,
					{
						startTime: genericDateToUTCSeconds(startDate),
						endTime: genericDateToUTCSeconds(endDate),
					},
				],
			},
			{
				onSuccess: () => {
					setStepReady(true);
				},
			}
		);
	};

	return (
		<div className="p-1">
			<header>
				<Title32 className="uppercase text-white">Confirm reward</Title32>
				<p className="text-gray mt-3 mb-6">
					<span className="text-white">Review reward details</span> before creating.
				</p>
			</header>
			<main className="border border-neutral-border p-4 bg-neutral-black-secondary">
				<Label>REWARD INFO</Label>
				<div className=" text-gray mt-4 ">
					<div className="flex flex-col gap-2">
						<div className="flex gap-1 text-gray">
							<span>TOKEN:</span>
							<span className="text-white">{name}</span>
						</div>
					</div>
					<div className="flex flex-col gap-2">
						<div className="flex gap-1 text-gray">
							<span>AMOUNT:</span>
							<span className="text-white">{formatNumber(rewardAmount, decimals)}</span>
						</div>
					</div>
					<div className="flex flex-col gap-2">
						<div className="flex gap-1 text-gray">
							<span>START DATE:</span>
							<span className="text-white">{parseGenericDate(startDate)}</span>
						</div>
					</div>
					<div className="flex flex-col gap-2">
						<div className="flex gap-1 text-gray">
							<span>END DATE:</span>
							<span className="text-white">{parseGenericDate(endDate)}</span>
						</div>
					</div>
				</div>
			</main>
			<footer className="flex items-end mt-8 justify-end gap-2">
				<Button onClick={() => stepBack()}>BACK</Button>
				{allowance !== undefined && allowance !== null && parseFloat(formatAmount(allowance.toString(), decimals)) < amount ? (
					<Button onClick={performApprove} className="text-center" loading={isPendingApprove}>
						Approve
					</Button>
				) : (
					<Button onClick={performAction} className={`text-center transition-all ${!amount ? "opacity-70 pointer-events-none" : ""}`} loading={isPendingAction}>
						CREATE REWARD
					</Button>
				)}
			</footer>
		</div>
	);
};

const Step4Modal = () => {
	const { setModal } = useContext(ModalContext);
	return (
		<div className="p-1">
			<header>
				<Title32 className="uppercase text-white">REWARD CREATED</Title32>
				<p className="text-gray mt-3 mb-6">
					<span className="text-white">Your reward has been succesfully created.</span> It may take a while for the UI to index the new reward.
				</p>
			</header>
			<footer className="flex items-end mt-8 justify-end gap-2">
				<Button onClick={() => setModal(undefined)}>DONE</Button>
			</footer>
		</div>
	);
};

interface IAddRewardModal {
	pod: POD_INTERFACE;
}

const AddRewardModal = ({ pod }: IAddRewardModal) => {
	const [address, setAddress] = useState<string>("");
	const [amount, setAmount] = useState<number>(0);

	const [ticker, setTicker] = useState<string>("");
	const [name, setName] = useState<string>("");
	const [decimals, setDecimals] = useState<number>(18);

	const [startDate, setStartDate] = useState<number>(0);
	const [endDate, setEndDate] = useState<number>(0);

	const [step, setStep] = useState<number>(1);
	const [stepReady, setStepReady] = useState<boolean>(false);

	const stepBack = () => {
		setStep((_step) => {
			return _step - 1;
		});
	};

	useEffect(() => {
		if (stepReady) {
			setStep((_step) => {
				setStepReady(false);
				return _step + 1;
			});
		}
	}, [stepReady]);

	return (
		<div className="w-[432px] sm:w-full">
			{step === 1 && <Step1Modal address={address} setAddress={setAddress} setName={setName} setDecimals={setDecimals} setTicker={setTicker} setStepReady={setStepReady} />}
			{step === 2 && (
				<Step2Modal
					name={name}
					stepBack={stepBack}
					amount={amount}
					decimals={decimals}
					reward={address as Address}
					setAmount={setAmount}
					ticker={ticker}
					setStepReady={setStepReady}
					startDate={startDate}
					setStartDate={setStartDate}
					endDate={endDate}
					setEndDate={setEndDate}
				/>
			)}
			{step === 3 && <Step3Modal reward={address as Address} stepBack={stepBack} name={name} amount={amount} decimals={decimals} startDate={startDate as any} endDate={endDate as any} setStepReady={setStepReady} pod={pod} />}
			{step === 4 && <Step4Modal />}
		</div>
	);
};

export default AddRewardModal;

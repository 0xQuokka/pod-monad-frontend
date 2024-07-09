"use client";

import Title32 from "@/app/components/text/Title32";
import { useContext, useEffect, useState } from "react";
import StringInput from "../pod/[podAddress]/components/stringInput";
import { IModal } from "../interfaces/Modal";
import Button from "@/app/components/button";
import Label from "@/app/components/text/Label";
import Card from "@/app/components/cards/Card";
import { parseBytes32Address } from "@/utils/address";
import {
	useAccount,
	useReadContract,
	useTransactionReceipt,
	useWriteContract,
} from "wagmi";
import LAUNCHPOD_FACTORY_ABI from "@/abis/launchpodFactory";
import {
	DEFAULT_CHAIN_ID,
	LAUNCHPOD_FACTORY_ADDRESS,
	POD_TOKEN_ADDRESS,
} from "@/config/addresses";
import { ethers } from "ethers";
import ERC20_ABI from "@/abis/ERC20";
import { appURL } from "@/config/enviroment";
import Link from "next/link";
import { ModalContext } from "@/services/ModalProvider";

interface IStep1 extends IModal {
	name: string;
	setName: React.Dispatch<React.SetStateAction<string>>;
	symbol: string;
	setSymbol: React.Dispatch<React.SetStateAction<string>>;
}

const Step1Modal = ({
	setStepReady,
	name,
	setName,
	symbol,
	setSymbol,
}: IStep1) => {
	const [loading, setLoading] = useState<boolean>(false);
	const [valid, setValid] = useState<boolean>(false);

	useEffect(() => {
		if (!name || !symbol) {
			setValid(false);
		} else {
			setValid(true);
		}
	}, [name, symbol]);

	return (
		<div className="p-1">
			<header>
				<Title32 className="uppercase text-white">Create a seed</Title32>
				<p className="text-gray mt-3 mb-6">
					<span className="text-white">
						The Launch POD is the simplest and safest way
					</span>{" "}
					to create a new token on the Base ecosystem. By generating a new seed,
					you are{" "}
					<span className="text-white">
						creating a new fair-launched ERC-20
					</span>{" "}
					token with its corresponding single-staking vault.
				</p>
			</header>
			<main className="flex flex-col gap-2">
				<div className="flex flex-col gap-1">
					<Label className="text-white">SET SEED NAME</Label>
					<StringInput
						value={name}
						setValue={setName}
						placeholder="SEED NAME"
					/>
				</div>
				<div className="flex flex-col gap-1">
					<Label className="text-white">SET SEED SYMBOL</Label>
					<StringInput
						value={symbol}
						setValue={setSymbol}
						placeholder="SEED TICKER"
					/>
				</div>
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
	stepBack: Function;
	name: string;
	symbol: string;
	setCreatedSeedAddress: React.Dispatch<React.SetStateAction<string>>;
	setCreatedLiquidityPoolAddress: React.Dispatch<React.SetStateAction<string>>;
	setCreatedPodAddress: React.Dispatch<React.SetStateAction<string>>;
}

const Step2Modal = ({
	stepBack,
	name,
	symbol,
	setStepReady,
	setCreatedSeedAddress,
	setCreatedLiquidityPoolAddress,
	setCreatedPodAddress,
}: IStep2) => {
	const { address: account } = useAccount();

	const { data: fee } = useReadContract({
		abi: LAUNCHPOD_FACTORY_ABI,
		address: LAUNCHPOD_FACTORY_ADDRESS[DEFAULT_CHAIN_ID],
		functionName: "fee",
		args: [],
		query: {
			refetchInterval: 3600,
		},
	});

	const {
		writeContract: writeApprove,
		status: statusApprove,
		isPending: isPendingApprove,
	} = useWriteContract();

	const {
		writeContract: writeSeed,
		status: statusSeed,
		isPending: isPendingSeed,
		data,
		error,
	} = useWriteContract();

	const performApprove = () => {
		if (isPendingApprove || !fee) return;

		writeApprove({
			abi: ERC20_ABI,
			address: POD_TOKEN_ADDRESS[DEFAULT_CHAIN_ID],
			functionName: "approve",
			args: [
				LAUNCHPOD_FACTORY_ADDRESS[DEFAULT_CHAIN_ID],
				ethers.parseEther("1500"),
			],
		});
	};

	const { data: allowance } = useReadContract({
		abi: ERC20_ABI,
		address: POD_TOKEN_ADDRESS[DEFAULT_CHAIN_ID],
		functionName: "allowance",
		args: [account, LAUNCHPOD_FACTORY_ADDRESS[DEFAULT_CHAIN_ID]],
		query: {
			refetchInterval: 3600,
			enabled: !!account,
		},
	});

	const { data: seedData }: any = useTransactionReceipt({
		hash: data,
	});

	useEffect(() => {
		console.log({ error });
	}, [error]);

	const createSeed = () => {
		if (isPendingSeed || statusSeed == "success") return;

		writeSeed(
			{
				abi: LAUNCHPOD_FACTORY_ABI,
				address: LAUNCHPOD_FACTORY_ADDRESS[DEFAULT_CHAIN_ID],
				functionName: "createLaunchpod",
				args: [name, symbol],
			},
			{
				onSuccess: () => {},
			}
		);
	};

	useEffect(() => {
		if (seedData && seedData.logs) {
			if (
				seedData.logs[16].topics[1] &&
				seedData.logs[16].topics[2] &&
				seedData.logs[11].topics[2]
			) {
				setCreatedSeedAddress(parseBytes32Address(seedData.logs[16].topics[1]));
				setCreatedLiquidityPoolAddress(
					parseBytes32Address(seedData.logs[16].topics[2])
				);
				setCreatedPodAddress(parseBytes32Address(seedData.logs[11].topics[2]));
				setStepReady(true);
			}
		}
	}, [
		seedData,
		setCreatedSeedAddress,
		setCreatedPodAddress,
		setCreatedLiquidityPoolAddress,
		setStepReady,
	]);

	return (
		<div className="p-1">
			<header>
				<Title32 className="uppercase text-white">CONFIRM SEED</Title32>
				<p className="text-gray mt-3">
					<span className="text-white">Review seed</span> details before
					creating
				</p>
				<p className="text-gray mt-3 mb-6">
					An initial 2.5% of the supply is immediately transferred to the
					creator. Simultaneously, 10% of the supply goes to the single-staking
					vault. Remaining supply goes to a burned single-sided LP position in
					Uniswap-V3.
				</p>
			</header>
			<main className="flex flex-col gap-2">
				<Card className="mt-2 bg-neutral-black">
					<header>
						<Label>SEED INFO</Label>
						<div className="flex text-gray flex-col mt-4">
							<div>
								SEED NAME: <span className="text-white">{name}</span>
							</div>
							<div>
								SEED TICKER: <span className="text-white">{symbol}</span>
							</div>
						</div>
					</header>
				</Card>
				<div className="text-center">
					<span className="text-[#737E80]">Creation cost:</span>{" "}
					<span className="text-white">1500</span>{" "}
					<span className="text-white">POD</span>
				</div>
			</main>
			<footer className="flex items-end mt-8 justify-end gap-4">
				<Button onClick={() => stepBack()}>BACK</Button>
				{allowance !== undefined &&
				allowance !== null &&
				fee !== null &&
				fee !== undefined &&
				BigInt(allowance.toString()) < BigInt(fee.toString()) ? (
					<Button
						onClick={performApprove}
						className="text-center"
						loading={isPendingApprove}
					>
						Approve
					</Button>
				) : (
					<Button
						onClick={createSeed}
						className={`text-center transition-all`}
						loading={isPendingSeed}
					>
						CREATE SEED
					</Button>
				)}
			</footer>
		</div>
	);
};

interface IStep3 {
	createdPodAddress: string;
	createdSeedAddress: string;
	createdLiquidityPoolAddress: string;
}

const Step3Modal = ({
	createdPodAddress,
	createdSeedAddress,
	createdLiquidityPoolAddress,
}: IStep3) => {
	const { setModal } = useContext(ModalContext);
	return (
		<div className="p-1">
			<header>
				<Title32 className="uppercase text-white">SEED CREATED</Title32>
				<p className="text-gray mt-3 mb-6">
					<span className="text-white">
						Your seed, POD and liquidity pool has been succesfully created.{" "}
					</span>
					It may take a while for it to be indexed in the UI but you can{" "}
					<span className="text-white underline">see it in the explorer</span>
				</p>
			</header>
			<footer className="flex items-end mt-20 justify-end gap-4">
				<Link
					href={appURL(`/pod/${createdPodAddress}`)}
					onClick={() => {
						setModal(undefined);
					}}
				>
					<Button>VIEW POD</Button>
				</Link>
				<a
					href={`https://basescan.org/address/${createdSeedAddress}`}
					target="_blank"
					rel="noreferrer"
				>
					<Button>VIEW SEED</Button>
				</a>
				<a
					href={`https://dexscreener.com/base/${createdLiquidityPoolAddress}`}
					target="_blank"
					rel="noreferrer"
				>
					<Button>VIEW GRAPH</Button>
				</a>
			</footer>
		</div>
	);
};

const CreateSeedModal = () => {
	const [name, setName] = useState<string>("");
	const [symbol, setSymbol] = useState<string>("");

	const [createdPodAddress, setCreatedPodAddress] = useState<string>("");
	const [createdLiquidityPoolAddress, setCreatedLiquidityPoolAddress] =
		useState<string>("");
	const [createdSeedAddress, setCreatedSeedAddress] = useState<string>("");

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
		<div className="w-[432px] sm:w-full sm:text-sm">
			{step === 1 && (
				<Step1Modal
					name={name}
					setName={setName}
					symbol={symbol}
					setSymbol={setSymbol}
					setStepReady={setStepReady}
				></Step1Modal>
			)}
			{step === 2 && (
				<Step2Modal
					setCreatedSeedAddress={setCreatedSeedAddress}
					setCreatedLiquidityPoolAddress={setCreatedLiquidityPoolAddress}
					setCreatedPodAddress={setCreatedPodAddress}
					stepBack={stepBack}
					setStepReady={setStepReady}
					name={name}
					symbol={symbol}
				/>
			)}
			{step === 3 && (
				<Step3Modal
					createdSeedAddress={createdSeedAddress}
					createdLiquidityPoolAddress={createdLiquidityPoolAddress}
					createdPodAddress={createdPodAddress}
				/>
			)}
		</div>
	);
};

export default CreateSeedModal;

"use client";
import Title32 from "@/app/components/text/Title32";
import { useContext, useEffect, useState } from "react";
import TokenAddressInput from "../pod/[podAddress]/components/tokenAddressInput";
import Button from "@/app/components/button";
import StringInput from "../pod/[podAddress]/components/stringInput";
import Label from "@/app/components/text/Label";
import { isEthereumAddress, parseAddress, parseBytes32Address } from "@/utils/address";
import GenericAddressInput from "../pod/[podAddress]/components/genericAddressInput";
import { ethers } from "ethers";
import Card from "@/app/components/cards/Card";
import { parseOwnerAddress } from "@/utils/utils";
import { Address } from "viem";
import { useTransaction, useTransactionReceipt, useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import POD_FACTORY_ABI from "@/abis/podFactory";
import { DEFAULT_CHAIN_ID, POD_FACTORY_ADDRESS } from "@/config/addresses";
import Link from "next/link";
import { appURL } from "@/config/enviroment";
import { ModalContext } from "@/services/ModalProvider";
import { IModal } from "../interfaces/Modal";

interface IStep1 extends IModal {
	address: string;
	setAddress: React.Dispatch<React.SetStateAction<string>>;
}

const Step1Modal = ({ setStepReady, address, setAddress }: IStep1) => {
	const [loading, setLoading] = useState<boolean>(false);
	const [valid, setValid] = useState<boolean>(false);

	return (
		<div className="p-1">
			<header>
				<Title32 className="uppercase text-white">Create a pod</Title32>
				<p className="text-gray mt-3 mb-6">
					A <span className="text-white">pod</span> could be any underlying asset that you want to incentivize: a single ERC-20 token, an LP token, or even a yield-bearing position.
				</p>
			</header>
			<main>
				<TokenAddressInput setValid={setValid} setLoading={setLoading} address={address} setAddress={setAddress} />
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
	setName: React.Dispatch<React.SetStateAction<string>>;
	symbol: string;
	setSymbol: React.Dispatch<React.SetStateAction<string>>;
	description: string;
	setDescription: React.Dispatch<React.SetStateAction<string>>;
}

const Step2Modal = ({ setStepReady, stepBack, name, setName, symbol, setSymbol, description, setDescription }: IStep2) => {
	const [valid, setValid] = useState<boolean>(false);

	useEffect(() => {
		if (!name || !symbol || !description) {
			setValid(false);
		} else {
			setValid(true);
		}
	}, [name, symbol, description]);

	return (
		<div className="p-1">
			<header>
				<Title32 className="uppercase text-white">Config your pod</Title32>
				<p className="text-gray mt-3 mb-6">
					You can set <span className="text-white">pod name, ticker and description</span> which will then be shown in the pod list.
				</p>
			</header>
			<main className="flex flex-col gap-6">
				<div className="flex flex-col gap-1">
					<Label className="text-white">SET POD NAME</Label>
					<StringInput value={name} setValue={setName} placeholder="POD NAME" />
				</div>
				<div className="flex flex-col gap-1">
					<Label className="text-white">SET POD SYMBOL</Label>
					<StringInput value={symbol} setValue={setSymbol} placeholder="POD TICKER" />
				</div>
				<div className="flex flex-col gap-1">
					<Label className="text-white">SET POD DESCRIPTION</Label>
					<StringInput value={description} setValue={setDescription} placeholder="POD DESCRIPTION" />
				</div>
			</main>
			<footer className="flex items-end mt-8 justify-end gap-4">
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
	stepBack: Function;
	owner: string;
	setOwner: React.Dispatch<React.SetStateAction<string>>;
}

const Step3Modal = ({ setStepReady, stepBack, owner, setOwner }: IStep3) => {
	const [valid, setValid] = useState<boolean>(false);
	const [permissionless, setPermissionless] = useState<boolean>(false);

	useEffect(() => {
		if (!isEthereumAddress(owner)) {
			setValid(false);
		} else {
			setValid(true);
		}

		if (owner.toLowerCase() === ethers.ZeroAddress.toLowerCase()) {
			setPermissionless(true);
		} else {
			setPermissionless(false);
		}
	}, [owner]);

	useEffect(() => {
		if (permissionless) {
			setOwner(ethers.ZeroAddress);
		} else {
			setOwner("");
		}
	}, [permissionless, setOwner]);

	return (
		<div className="p-1">
			<header>
				<Title32 className="uppercase text-white">Type of POD</Title32>
				<p className="text-gray mt-3 mb-6">
					Pods can have an <span className="text-white">owner</span>, which means only the pod owner can add rewards, or they can be <span className="text-white">permisionless</span>, where everyone can add their rewards to the
					pod.
				</p>
			</header>
			<main className="flex flex-col gap-2">
				<div className="flex flex-col gap-1">
					<Label className="text-white">SET POD OWNER</Label>
					<GenericAddressInput address={owner} setAddress={setOwner} setValid={setValid} placeholder="OWNER ADDRESS" />
				</div>
				<div className="text-right text-white mt-2 cursor-pointer" onClick={() => setPermissionless((_permissionless) => !_permissionless)}>
					<div className="flex justify-end items-center gap-2">
						<input type="checkbox" checked={permissionless} onChange={() => {}} className="pointer-events-none" />
						<span className="pt-[1px]">MAKE POD PERMISSIONLESS</span>
					</div>
				</div>
			</main>
			<footer className="flex items-end mt-8 justify-end gap-4">
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

interface IStep4 extends IModal {
	stepBack: Function;
	underlying: string;
	name: string;
	symbol: string;
	description: string;
	owner: string;
	setCreatedPodAddress: React.Dispatch<React.SetStateAction<string>>;
}

const Step4Modal = ({ stepBack, name, symbol, description, owner, underlying, setStepReady, setCreatedPodAddress }: IStep4) => {
	const { writeContract: writePod, data, status: statusApprove, isPending: isPendignPod, error } = useWriteContract();

	const { data: podData }: any = useTransactionReceipt({
		hash: data,
	});

	useEffect(() => {
		console.log({ error });
	}, [error]);

	const createPod = () => {
		if (isPendignPod) return;

		writePod(
			{
				abi: POD_FACTORY_ABI,
				address: POD_FACTORY_ADDRESS[DEFAULT_CHAIN_ID],
				functionName: "createPod",
				args: [underlying, name, symbol, description, owner],
			},
			{
				onSuccess: () => {},
			}
		);
	};

	useEffect(() => {
		if (podData && podData.logs && podData.logs[0].topics[2]) {
			setCreatedPodAddress(parseBytes32Address(podData.logs[0].topics[2]));
			setStepReady(true);
		}
	}, [podData, setCreatedPodAddress, setStepReady]);

	return (
		<div className="p-1">
			<header>
				<Title32 className="uppercase text-white">CONFIRM POD</Title32>
				<p className="text-gray mt-3 mb-6">
					<span className="text-white">Review pod</span> details before creating
				</p>
			</header>
			<main className="flex flex-col gap-2">
				<Card className="mt-2 bg-neutral-black">
					<header>
						<Label>POD INFO</Label>
						<div className="flex text-gray flex-col mt-4">
							<div>
								POD UNDERLYING: <span className="text-white">{parseAddress(underlying)}</span>
							</div>
							<div>
								POD NAME: <span className="text-white">{name}</span>
							</div>
							<div>
								POD TICKER: <span className="text-white">{symbol}</span>
							</div>
							<div>
								POD DESCRIPTION: <span className="text-white">{description}</span>
							</div>
							<div>
								POD OWNER: <span className="text-white">{parseOwnerAddress(owner as Address)}</span>
							</div>
						</div>
					</header>
				</Card>
			</main>
			<footer className="flex items-end mt-8 justify-end gap-4">
				<Button onClick={() => stepBack()}>BACK</Button>
				<Button loading={isPendignPod} onClick={() => createPod()}>
					CREATE POD
				</Button>
			</footer>
		</div>
	);
};

interface IStep5 {
	createdPodAddress: string;
}

const Step5Modal = ({ createdPodAddress }: IStep5) => {
	const { setModal } = useContext(ModalContext);

	return (
		<div className="p-1">
			<header>
				<Title32 className="uppercase text-white">POD CREATED</Title32>
				<p className="text-gray mt-3 mb-6">
					<span className="text-white">Your pod has been succesfully created. </span>It may take a while for it to be indexed in the UI but you can <span className="text-white underline">see it in the explorer</span>
				</p>
			</header>
			<footer className="flex items-end mt-20 justify-end gap-4">
				<Link
					href={appURL(`/pod/${createdPodAddress}`)}
					onClick={() => {
						setModal(undefined);
					}}
				>
					<Button>VIEW MY POD</Button>
				</Link>
			</footer>
		</div>
	);
};

const CreatePodModal = () => {
	const [underlying, setUnderlying] = useState<string>("");

	const [name, setName] = useState<string>("");
	const [symbol, setSymbol] = useState<string>("");
	const [description, setDescription] = useState<string>("");

	const [createdPodAddress, setCreatedPodAddress] = useState<string>("");

	const [podOwner, setPodOwner] = useState<string>("");

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
			{step === 1 && <Step1Modal address={underlying} setAddress={setUnderlying} setStepReady={setStepReady}></Step1Modal>}
			{step === 2 && <Step2Modal stepBack={stepBack} setStepReady={setStepReady} name={name} setName={setName} symbol={symbol} setSymbol={setSymbol} description={description} setDescription={setDescription} />}
			{step === 3 && <Step3Modal owner={podOwner} setOwner={setPodOwner} stepBack={stepBack} setStepReady={setStepReady}></Step3Modal>}
			{step === 4 && <Step4Modal owner={podOwner} name={name} symbol={symbol} description={description} underlying={underlying} stepBack={stepBack} setStepReady={setStepReady} setCreatedPodAddress={setCreatedPodAddress}></Step4Modal>}
			{step === 5 && <Step5Modal createdPodAddress={createdPodAddress} />}
		</div>
	);
};

export default CreatePodModal;

"use client";
import { isEthereumAddress, parseAddress } from "@/utils/address";
import { ClipboardDocumentIcon, XCircleIcon } from "@heroicons/react/24/solid";
import useDebounce from "@/utils/useDebounce";
import { useEffect, useState } from "react";
import { useAccount, useReadContract } from "wagmi";
import POD_PERIPHERY_ABI from "@/abis/podPeriphery";
import { DEFAULT_CHAIN_ID, POD_PERIPHERY_ADDRESS } from "@/config/addresses";
import Card from "@/app/components/cards/Card";
import Label from "@/app/components/text/Label";

interface ITokenAddressInput {
	address: string;
	setAddress: React.Dispatch<React.SetStateAction<string>>;
	setLoading: React.Dispatch<React.SetStateAction<boolean>>;
	setValid: React.Dispatch<React.SetStateAction<boolean>>;
	setTicker?: React.Dispatch<React.SetStateAction<string>>;
	setName?: React.Dispatch<React.SetStateAction<string>>;
	setDecimals?: React.Dispatch<React.SetStateAction<number>>;
}

const TokenAddressInput = ({ address, setAddress, setLoading, setValid, setTicker, setName, setDecimals }: ITokenAddressInput) => {
	const paste = () => {
		navigator.clipboard.readText().then((value) => {
			setAddress(value);
		});
	};

	const debouncedAddress = useDebounce(address);
	const [lookupAddress, setLookupAddress] = useState<string>("");

	useEffect(() => {
		if (!isEthereumAddress(debouncedAddress)) {
			setLookupAddress("");
			return;
		}

		setLookupAddress(debouncedAddress);
	}, [debouncedAddress]);

	const { data: lookupData, isLoading }: any = useReadContract({
		abi: POD_PERIPHERY_ABI,
		address: POD_PERIPHERY_ADDRESS[DEFAULT_CHAIN_ID],
		functionName: "underlyingData",
		args: [lookupAddress],
		query: {
			enabled: !!lookupAddress,
		},
	});

	useEffect(() => {
		setLoading(isLoading);
	}, [isLoading, setLoading]);

	useEffect(() => {
		if (isEthereumAddress(debouncedAddress) && lookupData && lookupData[0] && lookupData[1] && lookupData[2]) {
			if (setTicker) {
				setTicker(lookupData[1]);
			}
			if (setName) {
				setName(lookupData[0]);
			}
			if (setDecimals) {
				setDecimals(parseInt(lookupData[2]));
			}
			setValid(true);
		} else {
			setValid(false);
		}
	}, [lookupData, setValid, debouncedAddress, setTicker, setName, setDecimals]);

	const onChangeInput = (e: any) => {
		setAddress(e.target.value);
	};
	return (
		<>
			<div className="flex-1 items-center justify-between flex w-full gap-1 border text-gray border-neutral-border p-4">
				{!isEthereumAddress(address) ? (
					<input
						type={`text`}
						className={`w-full flex-1 outline-none text-left text-white focus:placeholder:opacity-0 bg-neutral-black text-sm uppercase ${address && !isEthereumAddress(address) ? "text-[#C45151]" : "text-success"}`}
						value={address ? (isEthereumAddress(address) ? parseAddress(address) : address) : ""}
						onChange={onChangeInput}
						placeholder={"ENTER CONTRACT ADDRESS"}
					/>
				) : (
					<div className={`w-full flex-1 outline-none text-left focus:placeholder:opacity-0 text-sm font-bold ${address && !isEthereumAddress(address) ? "text-[#C45151]" : "text-success"}`}>{parseAddress(address)}</div>
				)}
				<div className="w-[20px] flex items-center justify-center cursor-pointer">
					{!address ? <ClipboardDocumentIcon className={`cursor-pointer w-5 h-5 scalable`} onClick={paste} /> : <XCircleIcon className={`cursor-pointer w-5 h-5 scalable`} onClick={() => setAddress("")} />}
				</div>
			</div>
			{lookupData && lookupData[0] ? (
				<Card className="mt-2 bg-neutral-black">
					<header>
						<Label>CONTRACT INFO</Label>
						<div className="flex text-white flex-col mt-4">
							<div>{`TOKEN NAME: ${lookupData[0]}`}</div>
							<div>{`TOKEN TICKER: ${lookupData[1]}`}</div>
							<div>{`TOKEN DECIMALS: ${lookupData[2]}`}</div>
						</div>
					</header>
				</Card>
			) : (
				<></>
			)}
		</>
	);
};

export default TokenAddressInput;

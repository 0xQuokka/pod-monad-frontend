"use client";
import { isEthereumAddress, parseAddress } from "@/utils/address";
import { ClipboardDocumentIcon, XCircleIcon } from "@heroicons/react/24/solid";
import { useEffect } from "react";

interface IGenericAddressInput {
	address: string;
	setAddress: React.Dispatch<React.SetStateAction<string>>;
	setValid: React.Dispatch<React.SetStateAction<boolean>>;
	placeholder: string;
}

const GenericAddressInput = ({ address, setAddress, setValid, placeholder }: IGenericAddressInput) => {
	const paste = () => {
		navigator.clipboard.readText().then((value) => {
			setAddress(value);
		});
	};

	useEffect(() => {
		if (isEthereumAddress(address)) {
			setValid(true);
		} else {
			setValid(false);
		}
	}, [setValid, address]);

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
						placeholder={placeholder}
					/>
				) : (
					<div className={`w-full flex-1 outline-none text-left focus:placeholder:opacity-0 text-sm font-bold ${address && !isEthereumAddress(address) ? "text-[#C45151]" : "text-success"}`}>{parseAddress(address)}</div>
				)}
				<div className="w-[20px] flex items-center justify-center cursor-pointer">
					{!address ? <ClipboardDocumentIcon className={`cursor-pointer w-5 h-5 scalable`} onClick={paste} /> : <XCircleIcon className={`cursor-pointer w-5 h-5 scalable`} onClick={() => setAddress("")} />}
				</div>
			</div>
		</>
	);
};

export default GenericAddressInput;

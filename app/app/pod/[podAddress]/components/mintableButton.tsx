"use client";
import ERC20_ABI from "@/abis/ERC20";
import Button from "@/app/components/button";
import { TESTNET_MINTABLE_UNDERLYING } from "@/config/enviroment";
import { ethers } from "ethers";
import { Address } from "viem";
import { useAccount, useWriteContract } from "wagmi";

interface IMintButton {
	token: Address;
}

export const MintButton = ({ token }: IMintButton) => {
	const { address: account } = useAccount();
	const { writeContract: writeMint, data, status, isPending, isSuccess, error } = useWriteContract();

	const mint = () => {
		if (isPending) return;

		const amount = ethers.parseEther("100");

		writeMint(
			{
				abi: ERC20_ABI,
				address: TESTNET_MINTABLE_UNDERLYING,
				functionName: "mint",
				args: [amount],
			},
			{
				onSuccess: () => {},
			}
		);
	};

	return (
		<>
			{account ? (
				<Button className="text-center" loading={isPending} disabled={isSuccess} onClick={() => mint()}>
					Mint mUNDER
				</Button>
			) : (
				<></>
			)}
		</>
	);
};

export default MintButton;

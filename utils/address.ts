import { ethers } from "ethers";
import { Address } from "viem";

export const isEthereumAddress = function (address: string) {
	return /^(0x){1}[0-9a-fA-F]{40}$/i.test(address);
};

export const parseAddress = (s: string) => {
	return isEthereumAddress(s) ? s.slice(0, 5) + "...." + s.slice(-5) : s;
};

export const parseTxHash = (s: string) => {
	return s.slice(0, 2) + "-" + s.slice(-5);
};

export function parseBytes32Address(bytes32address: string) {
	const without0x = bytes32address.slice(26);
	return "0x" + without0x;
}

export const parseOwnerAddress = (address: Address): string => {
	if (address.toLowerCase() === ethers.ZeroAddress.toLowerCase()) return "PERMISSIONLESS";

	return `0x${address.slice(2, 3)}...${address.slice(-5)}`;
};

export const isPermissionless = (address: Address): boolean => {
	return address.toLowerCase() === ethers.ZeroAddress.toLowerCase();
};

import { POD_TOKEN_INTERFACE } from "@/app/app/interfaces/Pod";
import { ethers } from "ethers";
import { Address } from "viem";

export const parseOwnerAddress = (address: Address): string => {
	if (address.toLowerCase() === ethers.ZeroAddress.toLowerCase()) return "PERMISSIONLESS";

	return `0x${address.slice(1, 3)}...${address.slice(-5)}`;
};

export function formatNumber(bignumber: BigInt, decimals: Number): any {
	const number = parseFloat(ethers.formatUnits(bignumber.toString(), parseInt(decimals.toString())).toString());

	if (number < 1000) {
		return number.toFixed(2);
	} else if (number < 1000000) {
		const thousands = (number / 1000).toFixed(1);
		return `${thousands}k`;
	} else {
		const millions = (number / 1000000).toFixed(1);
		return `${millions}M`;
	}
}

export function parseRewardDate(startDate: number, endDate: number): [string, string] {
	const now = parseInt(new Date().getTime().toString());
	const _rewardStartDateInUTC = new Date(startDate * 1000);
	const _rewardEndDateInUTC = new Date(endDate * 1000);

	if (now < _rewardStartDateInUTC.getTime()) {
		const _date = new Date(startDate * 1000);

		return ["STARTS", `${_date.getMonth() + 1}/${_date.getDay() + 1} ${_date.getHours()}:${_date.getMinutes()}`];
	}

	if (_rewardEndDateInUTC.getTime() < now) return ["ENDED", ""];

	const _date = new Date(startDate * 1000);
	return ["ENDS", `${_date.getMonth() + 1}/${_date.getDay() + 1} ${_date.getHours()}:${_date.getMinutes()}`];
}

export function formatAmount(n: string, decimals: POD_TOKEN_INTERFACE["decimals"]): string {
	return parseFloat(ethers.formatUnits(n, parseInt(decimals.toString()))).toFixed(2);
}

export function parseAmount(n: string, decimals: POD_TOKEN_INTERFACE["decimals"]): string {
	return ethers.parseUnits(n.toString(), parseInt(decimals.toString())).toString();
}

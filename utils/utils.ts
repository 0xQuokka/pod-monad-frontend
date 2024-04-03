import { ethers } from "ethers";
import { ReactNode } from "react";
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

	return number.toFixed(2);
}

export function parseRewardDate(d: number): string {
	const _rewardDateInUTC = Date.UTC(d * 1000);

	const now = parseInt(new Date().getTime().toString());
	if (_rewardDateInUTC < now) return "ENDED";

	const _date = new Date(d * 1000);

	return `${_date.getMonth() + 1}/${_date.getDay() + 1} ${_date.getHours()}:${_date.getMinutes()}`;
}

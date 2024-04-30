import { POD_TOKEN_INTERFACE } from "@/app/app/interfaces/Pod";
import { ethers } from "ethers";
import { Address } from "viem";

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

export function formatSmallNumber(n: number) {
	if (n < 1000) {
		return n;
	} else if (n < 1000000) {
		const thousands = (n / 1000).toFixed(1);
		return `${thousands}k`;
	} else {
		const millions = (n / 1000000).toFixed(1);
		return `${millions}M`;
	}
}

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function parseRewardDate(startDate: number, endDate: number): [string, string] {
	const now = parseInt(new Date().getTime().toString());
	const _rewardStartDateInUTC = new Date(startDate * 1000);
	const _rewardEndDateInUTC = new Date(endDate * 1000);

	if (now < _rewardStartDateInUTC.getTime()) {
		const _date = new Date(startDate * 1000);

		return ["STARTS", `${("0" + _date.getUTCDate()).slice(-2)} ${months[_date.getUTCMonth()]} ${("0" + _date.getUTCHours()).slice(-2)}:${("0" + _date.getUTCMinutes()).slice(-2)}`];
	}

	if (_rewardEndDateInUTC.getTime() < now) return ["ENDED", ""];

	const _date = new Date(endDate * 1000);
	return ["ENDS", `${("0" + _date.getUTCDate()).slice(-2)} ${months[_date.getUTCMonth()]} ${("0" + _date.getUTCHours()).slice(-2)}:${("0" + _date.getUTCMinutes()).slice(-2)}`];
}

export function parseGenericDate(d: Date): string {
	const _date = new Date(d);

	return `${("0" + _date.getUTCDate()).slice(-2)} ${months[_date.getUTCMonth()]} ${("0" + _date.getUTCHours()).slice(-2)}:${("0" + _date.getUTCMinutes()).slice(-2)}`;
}

export function genericDateToUTCSeconds(d: Date): number {
	const _date = new Date(d);

	return parseInt((_date.getTime() / 1000).toString());
}

export function formatAmount(n: string, decimals: POD_TOKEN_INTERFACE["decimals"]): string {
	return parseFloat(ethers.formatUnits(n, parseInt(decimals.toString()))).toFixed(2);
}

export function parseAmount(n: string, decimals: POD_TOKEN_INTERFACE["decimals"]): string {
	return ethers.parseUnits(n.toString(), parseInt(decimals.toString())).toString();
}

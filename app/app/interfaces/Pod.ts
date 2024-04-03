import { Address } from "viem";

export interface POD_USER_INTERFACE {
	id: Address;
}

export interface POD_TOKEN_INTERFACE {
	id: Address;
	name: string;
	symbol: string;
	decimals: Number;
}

export interface POD_REWARD_INTERFACE {
	id: Address;
	token: POD_TOKEN_INTERFACE;
	startDate: BigInt;
	endDate: BigInt;
	amount: BigInt;
	remainingAmount: BigInt;
}

export interface POD_INTERFACE {
	id: Address;
	name: string;
	symbol: string;
	description: string;
	decimals: string;
	reserve: BigInt;
	locked: BigInt;
	owner: POD_USER_INTERFACE;
	underlying: POD_TOKEN_INTERFACE;
	rewards: POD_REWARD_INTERFACE[];
}

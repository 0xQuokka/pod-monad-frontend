import { Address } from "viem";

export interface TOKEN_INTERFACE {
	address: Address | string;
	name: string;
	symbol: string;
	decimals: Number;
	logo: string | undefined;
	isWNative: boolean | undefined;
}

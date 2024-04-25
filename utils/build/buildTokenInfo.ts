import { TOKEN_INTERFACE } from "@/app/app/interfaces/Token";

interface IBuildTokenInfo {
	address: TOKEN_INTERFACE["address"];
	symbol: TOKEN_INTERFACE["symbol"];
	name: TOKEN_INTERFACE["name"];
	decimals: TOKEN_INTERFACE["decimals"];
}

export const buildTokenInfo = ({ address, symbol, name, decimals }: IBuildTokenInfo): TOKEN_INTERFACE => {
	return {
		address,
		symbol,
		name,
		decimals,
		logo: undefined,
		isWNative: false,
	};
};

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

const POD_PERIPHERY_ABI = [
	{
		inputs: [
			{
				internalType: "address",
				name: "_underlying",
				type: "address",
			},
		],
		name: "underlyingData",
		outputs: [
			{
				internalType: "string",
				name: "",
				type: "string",
			},
			{
				internalType: "string",
				name: "",
				type: "string",
			},
			{
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
		],
		stateMutability: "view",
		type: "function",
	},
];

export default POD_PERIPHERY_ABI;

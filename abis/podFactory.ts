const ABI = [
	{
		inputs: [],
		name: "PodFactoryInvalidParams",
		type: "error",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "underlying",
				type: "address",
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "index",
				type: "uint256",
			},
			{
				indexed: false,
				internalType: "address",
				name: "pod",
				type: "address",
			},
		],
		name: "PodCreated",
		type: "event",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "_underlying",
				type: "address",
			},
		],
		name: "availablePods",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "underlying",
				type: "address",
			},
			{
				internalType: "string",
				name: "_name",
				type: "string",
			},
			{
				internalType: "string",
				name: "_symbol",
				type: "string",
			},
			{
				internalType: "string",
				name: "_description",
				type: "string",
			},
			{
				internalType: "address",
				name: "_owner",
				type: "address",
			},
		],
		name: "createPod",
		outputs: [
			{
				internalType: "address",
				name: "pod",
				type: "address",
			},
		],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [],
		name: "owner",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "parameters",
		outputs: [
			{
				internalType: "uint256",
				name: "index",
				type: "uint256",
			},
			{
				internalType: "string",
				name: "name",
				type: "string",
			},
			{
				internalType: "string",
				name: "symbol",
				type: "string",
			},
			{
				internalType: "string",
				name: "description",
				type: "string",
			},
			{
				internalType: "address",
				name: "factory",
				type: "address",
			},
			{
				internalType: "address",
				name: "underlying",
				type: "address",
			},
			{
				internalType: "address",
				name: "owner",
				type: "address",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "_underlying",
				type: "address",
			},
			{
				internalType: "uint256",
				name: "_index",
				type: "uint256",
			},
		],
		name: "podByIndex",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address",
			},
		],
		stateMutability: "view",
		type: "function",
	},
];

export default ABI;

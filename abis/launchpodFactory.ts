const LAUNCHPOD_FACTORY_ABI = [
	{
		inputs: [
			{
				internalType: "address",
				name: "_uniswapV3Factory",
				type: "address",
			},
			{
				internalType: "address",
				name: "_uniswapV3PositionManager",
				type: "address",
			},
			{
				internalType: "address",
				name: "_launchpodBurner",
				type: "address",
			},
			{
				internalType: "address",
				name: "_podToken",
				type: "address",
			},
			{
				internalType: "address",
				name: "_podFactory",
				type: "address",
			},
			{
				internalType: "uint256",
				name: "_initialFee",
				type: "uint256",
			},
			{
				internalType: "uint256",
				name: "_podRewardAmount",
				type: "uint256",
			},
		],
		stateMutability: "nonpayable",
		type: "constructor",
	},
	{
		inputs: [],
		name: "LaunchpodFactoryInvalidFee",
		type: "error",
	},
	{
		inputs: [],
		name: "LaunchpodFactoryInvalidParams",
		type: "error",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "owner",
				type: "address",
			},
		],
		name: "OwnableInvalidOwner",
		type: "error",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "account",
				type: "address",
			},
		],
		name: "OwnableUnauthorizedAccount",
		type: "error",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "launchpod",
				type: "address",
			},
			{
				indexed: true,
				internalType: "address",
				name: "liquidityPool",
				type: "address",
			},
			{
				indexed: false,
				internalType: "string",
				name: "name",
				type: "string",
			},
			{
				indexed: false,
				internalType: "string",
				name: "symbol",
				type: "string",
			},
		],
		name: "LaunchpodCreated",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "previousOwner",
				type: "address",
			},
			{
				indexed: true,
				internalType: "address",
				name: "newOwner",
				type: "address",
			},
		],
		name: "OwnershipTransferred",
		type: "event",
	},
	{
		inputs: [],
		name: "LAUNCHPOD_BURNER",
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
		name: "POD_FACTORY",
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
		inputs: [
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
		],
		name: "createLaunchpod",
		outputs: [
			{
				internalType: "address",
				name: "launchpod",
				type: "address",
			},
			{
				internalType: "contract IUniswapV3Pool",
				name: "liquidityPool",
				type: "address",
			},
		],
		stateMutability: "payable",
		type: "function",
	},
	{
		inputs: [],
		name: "fee",
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
		name: "podRewardAmount",
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
		inputs: [],
		name: "renounceOwnership",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "_newFee",
				type: "uint256",
			},
		],
		name: "setFee",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "_newLaunchpodBurner",
				type: "address",
			},
		],
		name: "setLaunchpodBurner",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "_podFactory",
				type: "address",
			},
		],
		name: "setPodFactory",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "newOwner",
				type: "address",
			},
		],
		name: "transferOwnership",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
];

export default LAUNCHPOD_FACTORY_ABI;

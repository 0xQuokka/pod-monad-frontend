export const GENESIS_PODS: Record<string, boolean> = {
	"0x7ebab0a15a11136bfe3abfa3663e4ba150607c02": true,
	"0xca4aed99a2c62cab5b4b6269c02fdb25dc4bd987": true,
};

export const OVERRIDE_POD_DATA: Record<string, Record<string, string>> = {
	"0xca4aed99a2c62cab5b4b6269c02fdb25dc4bd987": {
		name: "FUNGI POD",
		description: "FUNGI ERC20i - SINGLE STAKE",
	},
};

export const CUSTOM_POD_IMAGE: Record<string, boolean> = {
	"0xca4aed99a2c62cab5b4b6269c02fdb25dc4bd987": true,
};

import FungiEgg from "@/app/components/grid/fungiEgg";
import { ReactNode } from "react";

export const GENESIS_PODS: Record<string, boolean> = {
	"0x7ebab0a15a11136bfe3abfa3663e4ba150607c02": true,
	"0xca4aed99a2c62cab5b4b6269c02fdb25dc4bd987": true,
	"0x394212bacfb3e25ad6ca19abe8189a4810296a1f": true,
	"0xfb8e5ff79e839b7351f85ee32c772885a7c1872e": true,
};

export const OVERRIDE_POD_DATA: Record<string, Record<string, string>> = {
	"0xca4aed99a2c62cab5b4b6269c02fdb25dc4bd987": {
		name: "FUNGI POD",
		description: "FUNGI ERC20i - SINGLE STAKE",
	},
};

export const CUSTOM_POD_IMAGE: Record<string, ReactNode> = {
	"0xca4aed99a2c62cab5b4b6269c02fdb25dc4bd987": true,
};

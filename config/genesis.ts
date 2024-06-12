import FungiEgg from "@/app/components/grid/fungiEgg";
import { ReactNode } from "react";

export const GENESIS_PODS: Record<string, boolean> = {
	"0x7ebab0a15a11136bfe3abfa3663e4ba150607c02": true,
	"0xca4aed99a2c62cab5b4b6269c02fdb25dc4bd987": true,
	"0x394212bacfb3e25ad6ca19abe8189a4810296a1f": true,
	"0xfb8e5ff79e839b7351f85ee32c772885a7c1872e": true,
	"0x710a8b92412f2644c7e4f48f6dfca4a5fcbb249a": true,
	"0x29382976cad99304347661303bb5e7852d851a38": true,
	"0x3bf11e1357d80702e468296231a8c1912cb20f0e": true,
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

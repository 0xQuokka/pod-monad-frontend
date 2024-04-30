"use client";

import { PodsContext } from "@/services/PodsProvider";
import { useContext } from "react";

const ProtocolTVL = () => {
	const { TVL } = useContext(PodsContext);
	return <div></div>;
};

export default ProtocolTVL;

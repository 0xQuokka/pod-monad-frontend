"use client";

import Label from "@/app/components/text/Label";
import { PodsContext } from "@/services/PodsProvider";
import { useContext } from "react";

const AvailablePods = () => {
	const { podFactory }: any = useContext(PodsContext);
	return <div>{podFactory && podFactory.availablePods ? <Label>{podFactory.availablePods} currently active</Label> : <Label>0 currently active</Label>}</div>;
};

export default AvailablePods;

import { MouseEventHandler, ReactNode } from "react";

export interface IText {
	children: ReactNode;
	className?: string;
	onClick?: MouseEventHandler<HTMLDivElement>;
}

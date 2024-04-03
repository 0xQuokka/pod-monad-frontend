"use client";
import { MouseEventHandler, ReactNode, useEffect, useState } from "react";

interface IButton {
	children?: ReactNode;
	onClick?: MouseEventHandler<HTMLDivElement>;
	className?: string;
	style?: any;
	onMouseLeaveValue?: string;
	onMouseEnterValue?: string;
}

const Button = ({ onClick, children, className, style, onMouseEnterValue, onMouseLeaveValue }: IButton) => {
	const [text, setText] = useState<string | undefined>(onMouseLeaveValue);

	useEffect(() => {
		setText(onMouseLeaveValue);
	}, [onMouseEnterValue, onMouseLeaveValue]);

	const onMouseOver = () => {
		setText(onMouseEnterValue);
	};

	const onMouseOut = () => {
		setText(onMouseLeaveValue);
	};

	return (
		<div
			onClick={onClick}
			className={`p-4 border border-[#323637] bg-[#17191A] transition-all hover:bg-[#202224] text-white uppercase cursor-pointer ${className}`}
			style={{ ...style }}
			onMouseEnter={onMouseOver}
			onMouseLeave={onMouseOut}
		>
			{text ? text : children}
		</div>
	);
};

export default Button;

"use client";
import { MouseEventHandler, ReactNode, useEffect, useState } from "react";
import Loading from "./icons/loading";

interface IButton {
	children?: ReactNode;
	onClick?: MouseEventHandler<HTMLDivElement>;
	className?: string;
	style?: any;
	onMouseLeaveValue?: string;
	onMouseEnterValue?: string;
	loading?: boolean;
	disabled?: boolean;
}

const Button = ({ onClick, children, className, style, onMouseEnterValue, onMouseLeaveValue, loading, disabled }: IButton) => {
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
			className={`p-4 border border-[#323637] sm:text-sm bg-white transition-all hover:opacity-80 text-[#17191A] uppercase ${disabled ? "opacity-50 cursor-no-drop pointer-events-none" : "cursor-pointer"} ${className}`}
			style={{ ...style }}
			onMouseEnter={onMouseOver}
			onMouseLeave={onMouseOut}
		>
			{loading ? (
				<div className="mx-auto flex justify-center items-center">
					<Loading />
				</div>
			) : text ? (
				text
			) : (
				children
			)}
		</div>
	);
};

export default Button;

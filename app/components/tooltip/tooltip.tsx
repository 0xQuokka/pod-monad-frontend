"use client";
import { ReactNode, useState } from "react";

interface ITooltip {
	children: ReactNode;
	className?: string;
	content: ReactNode;
	direction: "top";
}

const Tooltip = ({ children, className, content, direction }: ITooltip) => {
	const [active, setActive] = useState(false);

	const show = () => {
		if (active) return;

		setActive(true);
	};

	const hide = () => {
		if (!active) return;

		setActive(false);
	};
	return (
		<div className="relative inline-block" onMouseEnter={show} onMouseLeave={hide}>
			<div>{children}</div>
			{active && (
				<div className={`absolute tooltip ${direction}`}>
					<div className={`bg-black border relative border-neutral-border rounded-[40px] py-1 px-2 text-white`}>{content}</div>
				</div>
			)}
		</div>
	);
};

export default Tooltip;

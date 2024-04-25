import { MouseEventHandler, ReactNode } from "react";

interface ISearchItemContainer {
	children: ReactNode;
	className?: string;
	hoverable?: boolean;
	onClick?: MouseEventHandler<HTMLDivElement>;
}
const SearchItemContainer = ({ children, className, hoverable = true, onClick }: ISearchItemContainer) => {
	return (
		<div onClick={onClick} className={`items-center px-4 py-2 bg-black transition-all ${className} ${hoverable ? "hover:bg-neutral-black-secondary cursor-pointer" : ""}`}>
			{children}
		</div>
	);
};

export default SearchItemContainer;

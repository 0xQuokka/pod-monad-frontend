import TickIcon from "@/app/components/icons/tick";
import { MouseEventHandler, ReactNode } from "react";

interface ISearchItemContainer {
	children: ReactNode;
	className?: string;
	hoverable?: boolean;
	onClick?: MouseEventHandler<HTMLDivElement>;
	selected?: boolean;
}
const SearchItemContainer = ({ children, className, hoverable = true, onClick, selected = false }: ISearchItemContainer) => {
	return (
		<div onClick={onClick} className={`items-center px-4 py-2 ${selected ? "bg-[#101212]" : "bg-black hover:bg-neutral-black-secondary"} transition-all ${className} ${hoverable ? " cursor-pointer" : "hover:bg-black"}`}>
			<div className="flex gap-2 items-center">{children}</div>
			{selected && (
				<div className="w-[16px]">
					<TickIcon />
				</div>
			)}
		</div>
	);
};

export default SearchItemContainer;

import AllTokensIcon from "@/app/components/icons/allTokens";
import TokenLogo from "@/app/components/token/tokenLogo";
import SearchItemContainer from "./searchItemContainer";
import { MouseEventHandler } from "react";
interface ISearchItem {
	logo?: string | undefined;
	title: string;
	label?: string;
	isAllTokens?: boolean;
	onClick?: MouseEventHandler<HTMLDivElement>;
	selected?: boolean;
}

const SearchItem = ({ logo, title, label, isAllTokens = false, onClick, selected }: ISearchItem) => {
	return (
		<SearchItemContainer className="flex w-full gap-3" onClick={onClick} selected={selected}>
			<div className="flex">
				{isAllTokens ? (
					<div className="p-2 bg-neutral-black-secondary border border-neutral-border rounded-full">
						<div className="w-[24px]">
							<AllTokensIcon />
						</div>
					</div>
				) : (
					<TokenLogo logo={logo} name={title} />
				)}
			</div>
			<div className="flex flex-col">
				<div className="text-white">{title}</div>
				{!isAllTokens && <div className="text-gray">{label}</div>}
			</div>
		</SearchItemContainer>
	);
};

export default SearchItem;

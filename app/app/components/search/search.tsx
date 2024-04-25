"use client";
import { useEffect, useState } from "react";
import { TOKEN_INTERFACE } from "../../interfaces/Token";
import AllTokensIcon from "@/app/components/icons/allTokens";
import SearchItem from "./searchItem";
import SearchItemContainer from "./searchItemContainer";
import MagnifyingGlassIcon from "@/app/components/icons/magnifyingGlass";
import SearchInput from "./searchInput";
import TokenLogo from "@/app/components/token/tokenLogo";
import { addUserTokenList } from "@/utils/localStorage/localStorage";
import { mergeUserTokenList } from "@/utils/build/mergeUserTokenList";

export const ALL_TOKENS = "ALL";

type Selected = TOKEN_INTERFACE | typeof ALL_TOKENS;

interface ISearch {
	tokenList: TOKEN_INTERFACE[];
	tokenMapping: Record<string, TOKEN_INTERFACE>;
}

const renderSelected = (selected: Selected) => {
	return (
		<div className="flex gap-2 items-center">
			<div className="w-[16px] flex items-center">{selected === ALL_TOKENS ? <AllTokensIcon /> : <TokenLogo logo={selected.logo} name={selected.name} />}</div>
			<div>{selected === ALL_TOKENS ? "ALL TOKENS" : selected.name}</div>
		</div>
	);
};

const Search = ({ tokenList, tokenMapping }: ISearch) => {
	const [_tokenList, _setTokenList] = useState(tokenList);
	useEffect(() => {
		const __tokenList = mergeUserTokenList(tokenList);
		_setTokenList(__tokenList);
	}, [tokenList]);

	const [selected, setSelected] = useState<Selected>(ALL_TOKENS);
	const [openList, setOpenList] = useState(false);
	const [result, setResult] = useState<TOKEN_INTERFACE[]>(_tokenList);

	const select = (_token: Selected) => {
		setSelected(_token);
		setOpenList(false);
		if (_token !== ALL_TOKENS && !tokenMapping[_token.address.toLowerCase()]) {
			addUserTokenList(_token);
		}
	};

	return (
		<div className="relative text-white">
			<div onClick={() => setOpenList((_openList) => !_openList)} className="p-4 bg-black border border-neutral-border z-50 cursor-pointer">
				{renderSelected(selected)}
			</div>
			{openList && (
				<div className="absolute z-50 w-[310px] right-0 top-[70px] border border-neutral-border">
					<SearchItemContainer hoverable={false} className="border-b border-neutral-border">
						<div className="text-gray uppercase py-3">Token list</div>
					</SearchItemContainer>
					<SearchItemContainer className="border-b border-neutral-border" hoverable={false}>
						<SearchInput tokenList={_tokenList} setResult={setResult} />
					</SearchItemContainer>
					<SearchItem title="ALL TOKENS" onClick={() => select(ALL_TOKENS)} isAllTokens={true} />
					{result.map((_token) => {
						return <SearchItem onClick={() => select(_token)} key={`SEARCH_${_token.address}`} logo={_token.logo} title={_token.symbol} label={_token.name} />;
					})}
				</div>
			)}
		</div>
	);
};

export default Search;

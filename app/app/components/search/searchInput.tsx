"use client";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { TOKEN_INTERFACE } from "../../interfaces/Token";
import MagnifyingGlassIcon from "@/app/components/icons/magnifyingGlass";
import useDebounce from "@/utils/useDebounce";
import POD_PERIPHERY_ABI from "@/abis/podPeriphery";
import { DEFAULT_CHAIN_ID, POD_PERIPHERY_ADDRESS } from "@/config/addresses";
import { useReadContract } from "wagmi";
import { isEthereumAddress } from "@/utils/address";
import { buildTokenInfo } from "@/utils/build/buildTokenInfo";

interface ISearchInput {
	tokenList: TOKEN_INTERFACE[];
	setResult: Dispatch<SetStateAction<TOKEN_INTERFACE[]>>;
}

const SearchInput = ({ tokenList, setResult }: ISearchInput) => {
	const [search, setSearch] = useState("");
	const [lookupAddress, setLookupAddress] = useState<false | string>(false);

	const debouncedSearch = useDebounce(search);

	const { data: lookupData, isLoading }: any = useReadContract({
		abi: POD_PERIPHERY_ABI,
		address: POD_PERIPHERY_ADDRESS[DEFAULT_CHAIN_ID],
		functionName: "underlyingData",
		args: [lookupAddress],
		query: {
			enabled: !!lookupAddress,
		},
	});

	useEffect(() => {
		// Ticker lookupdata 1
		// Name lookupdata 0
		// decimals lookupdata 2
		if (lookupAddress && isEthereumAddress(lookupAddress) && lookupData && lookupData[0] && lookupData[1] && lookupData[2]) {
			const _tokenInfo = buildTokenInfo({ address: lookupAddress, name: lookupData[0], symbol: lookupData[1], decimals: lookupData[2] });
			setResult([_tokenInfo]);
		}
	}, [lookupData, lookupAddress, setResult]);

	useEffect(() => {
		const _parsedDebouncedSearch = debouncedSearch.toLowerCase();
		const _result = tokenList.filter((_token) => {
			return _token.name.toLowerCase().includes(_parsedDebouncedSearch) || _token.symbol.toLowerCase().includes(_parsedDebouncedSearch) || _token.address.toLowerCase() === _parsedDebouncedSearch;
		});

		if (_result.length > 0) {
			setResult(_result);
		} else if (isEthereumAddress(_parsedDebouncedSearch)) {
			setLookupAddress(_parsedDebouncedSearch);
		}
	}, [debouncedSearch, tokenList, setResult]);
	return (
		<div className="py-2 text-gray uppercase flex gap-2">
			<div className="w-[16px]">
				<MagnifyingGlassIcon />
			</div>
			<div className="flex-1">
				<input
					type="text"
					value={search}
					onChange={(e) => {
						setSearch(e.target.value);
					}}
					spellCheck="false"
					autoComplete="off"
					className="w-full flex-1 outline-none text-left text-white focus:placeholder:opacity-0 bg-neutral-black"
					placeholder="SEARCH TOKEN OR PASTE ADDRESS"
				/>
			</div>
		</div>
	);
};

export default SearchInput;

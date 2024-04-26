"use client";
import { POD_TOKEN_INTERFACE } from "@/app/app/interfaces/Pod";
import { TOKEN_INTERFACE } from "@/app/app/interfaces/Token";
import { getUserTokenList } from "@/utils/localStorage/localStorage";
import { createContext, useContext, useEffect, useState } from "react";

export interface ITokensContext {
	tokenList: TOKEN_INTERFACE[];
	tokenMapping: Record<string, TOKEN_INTERFACE>;
	getTokenInfo: Function;
}

export const TokensContext = createContext<ITokensContext>({
	tokenList: [],
	tokenMapping: {},
	getTokenInfo: () => {},
});

const mergeUserTokenList = (tokenList: TOKEN_INTERFACE[]) => {
	const _userTokenList = getUserTokenList();

	return tokenList.concat(Object.values(_userTokenList));
};

export const TokensProvider = ({ children }: { children: React.ReactNode }) => {
	async function getTokenList() {
		const res = await fetch(process.env.NEXT_PUBLIC_TOKEN_LIST as string, {
			next: {
				revalidate: 120,
				tags: ["pod-token-list"],
			},
		});

		if (!res.ok) throw new Error("Failed to fetch token list");

		return res.json();
	}

	async function getTokenMapping() {
		const res = await fetch(process.env.NEXT_PUBLIC_TOKEN_MAPPING as string, {
			next: {
				revalidate: 120,
				tags: ["pod-token-list"],
			},
		});

		if (!res.ok) throw new Error("Failed to fetch token list");

		const mapping = await res.json();
		return mapping as Record<string, TOKEN_INTERFACE>;
	}

	const getTokenInfo = (token: POD_TOKEN_INTERFACE): TOKEN_INTERFACE => {
		const extendedToken = tokenMapping[token.id.toLowerCase()];

		if (!extendedToken)
			return {
				...token,
				address: token.id,
				logo: undefined,
				isWNative: undefined,
			};

		return {
			...token,
			address: token.id,
			logo: extendedToken.logo,
			isWNative: extendedToken.isWNative,
		};
	};

	const [tokenList, setTokenList] = useState<TOKEN_INTERFACE[]>([]);
	const [tokenMapping, setTokenMapping] = useState<Record<string, TOKEN_INTERFACE>>({});

	useEffect(() => {
		const populate = async () => {
			const _tokenList = await getTokenList();

			const tokenList = mergeUserTokenList(_tokenList);
			const tokenMapping = await getTokenMapping();

			setTokenList(tokenList);
			setTokenMapping(tokenMapping);
		};
		populate();
	}, []);

	return (
		<TokensContext.Provider
			value={{
				tokenList,
				tokenMapping,
				getTokenInfo,
			}}
		>
			{children}
		</TokensContext.Provider>
	);
};

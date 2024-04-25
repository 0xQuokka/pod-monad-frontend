"use client";

import { TOKEN_INTERFACE } from "@/app/app/interfaces/Token";

const USER_TOKEN_LIST_KEY = "LS_USER_TOKEN_LIST";

export const getUserTokenList = (): Record<string, TOKEN_INTERFACE> => {
	const _userTokenList = localStorage.getItem(USER_TOKEN_LIST_KEY);
	if (!_userTokenList) {
		localStorage.setItem(USER_TOKEN_LIST_KEY, JSON.stringify({}));
		return {};
	}
	return JSON.parse(_userTokenList);
};

export const addUserTokenList = (token: TOKEN_INTERFACE): Record<string, TOKEN_INTERFACE> => {
	const _userTokenList = getUserTokenList();

	// Convert decimals from BigInt to int number
	_userTokenList[token.address.toLowerCase()] = { ...token, decimals: parseInt(token.decimals.toString()) };

	localStorage.setItem(USER_TOKEN_LIST_KEY, JSON.stringify(_userTokenList));

	return _userTokenList;
};

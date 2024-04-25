"use client";

import { TOKEN_INTERFACE } from "@/app/app/interfaces/Token";
import { getUserTokenList } from "../localStorage/localStorage";

export const mergeUserTokenList = (tokenList: TOKEN_INTERFACE[]) => {
	const _userTokenList = getUserTokenList();

	return tokenList.concat(Object.values(_userTokenList));
};

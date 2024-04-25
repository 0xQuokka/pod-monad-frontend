import { POD_TOKEN_INTERFACE } from "@/app/app/interfaces/Pod";
import { TOKEN_INTERFACE } from "@/app/app/interfaces/Token";
import { getTokenMapping } from "@/utils/build/getTokenMapping";

export const getTokenInfo = async (token: POD_TOKEN_INTERFACE): Promise<TOKEN_INTERFACE> => {
	const tokenMapping = await getTokenMapping();

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

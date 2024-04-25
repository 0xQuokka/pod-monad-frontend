export async function getTokenList() {
	const res = await fetch(process.env.TOKEN_LIST as string, {
		next: {
			revalidate: 21600,
			tags: ["pod-token-list"],
		},
	});

	if (!res.ok) throw new Error("Failed to fetch token list");

	return res.json();
}

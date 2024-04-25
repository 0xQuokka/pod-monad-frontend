import { TOKEN_INTERFACE } from "@/app/app/interfaces/Token";

export async function getTokenMapping() {
	const res = await fetch(process.env.TOKEN_MAPPING as string, {
		next: {
			revalidate: 21600,
			tags: ["pod-token-list"],
		},
	});

	if (!res.ok) throw new Error("Failed to fetch token list");

	const mapping = await res.json();
	return mapping as Record<string, TOKEN_INTERFACE>;
}

import { ALLOW_ORIGIN } from "@/config/enviroment";
import { getClient } from "@/lib/apolloClientRC";
import { getPodsQuery } from "@/utils/queries";

export async function GET() {
	const query = getPodsQuery();

	let res;
	try {
		res = await getClient().query({
			query: query,
			context: {
				fetchOptions: {
					next: { revalidate: 120 },
				},
			},
		});
	} catch (e) {
		return new Response(
			JSON.stringify({
				pods: [],
				podFactories: {
					availablePods: 0,
				},
			}),
			{
				status: 200,
				headers: {
					"Access-Control-Allow-Origin": ALLOW_ORIGIN,
					"Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
				},
			}
		);
	}

	const { data } = res;

	let tvl = 0;
	try {
		const tvlQuery = await fetch(process.env.DEFILLAMA_API_URL as string, {
			next: { revalidate: 90 },
		});

		const tvlJSON = await tvlQuery.json();
		const currentTVL = tvlJSON.currentChainTvls;
		if (currentTVL) {
			tvl = currentTVL["Base"] + currentTVL["Base-staking"] + currentTVL["Base-pool2"];
		}
	} catch (e) {
		console.log("Error fetching DefiLlama TVL", e);
	}

	return new Response(
		JSON.stringify({
			pods: data.pods,
			podFactories: data.podFactories,
			tvl,
		}),
		{
			status: 200,
			headers: {
				"Access-Control-Allow-Origin": ALLOW_ORIGIN,
				"Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
			},
		}
	);
}

export const revalidate = 120;

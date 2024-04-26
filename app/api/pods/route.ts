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
					"Access-Control-Allow-Origin": "https://app.pod.finance",
					"Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
				},
			}
		);
	}

	const { data } = res;

	return new Response(
		JSON.stringify({
			pods: data.pods,
			podFactories: data.podFactories,
		}),
		{
			status: 200,
			headers: {
				"Access-Control-Allow-Origin": "https://app.pod.finance",
				"Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
			},
		}
	);
}

export const revalidate = 120;

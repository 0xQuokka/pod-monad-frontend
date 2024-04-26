import { getClient } from "@/lib/apolloClientRC";
import { getPodsQuery } from "@/utils/queries";

export async function GET() {
	const query = getPodsQuery();
	const { data } = await getClient().query({
		query: query,
		context: {
			fetchOptions: {
				next: { revalidate: 120 },
			},
		},
	});

	return new Response(
		JSON.stringify({
			pods: data.pods,
			podFactories: data.podFactories,
		}),
		{
			status: 200,
			headers: {
				"Access-Control-Allow-Origin": "*",
				"Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
			},
		}
	);
}

export const revalidate = 120;

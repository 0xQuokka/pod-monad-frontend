import { getClient } from "@/lib/apolloClientRC";
import { isEthereumAddress } from "@/utils/address";
import { getPodsQuery } from "@/utils/queries";

export async function GET(req: Request, { params }: { params: { underlying: string } }) {
	const underlying = params.underlying;
	if (!isEthereumAddress(underlying)) return new Response("Bad request", { status: 400 });

	const query = getPodsQuery(underlying);
	const { data } = await getClient().query({
		query: query,
		context: {
			fetchOptions: {
				next: { revalidate: 1800, tags: [`underlying_${underlying.toLowerCase()}`] },
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

export const revalidate = 1800;

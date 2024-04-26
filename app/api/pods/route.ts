import { getClient } from "@/lib/apolloClientRC";
import { gql } from "@apollo/client";

export const getPodsQuery = (underlying: false | string = false) => {
	return gql`
		query GetPods {
			podFactories(first: 1) {
				availablePods
			}
			pods(first: 20, orderBy: reserve, orderDirection: desc, ${underlying ? `where: { underlying: "${underlying.toLowerCase()}" }` : ""}) {
				id
				name
				symbol
				reserve
				locked
				decimals
				description
				underlying {
					id
					name
					symbol
					decimals
				}
				decimals
				rewards {
					id
					amount
					remainingAmount
					token {
						id
						name
						symbol
						decimals
					}
				}
				owner {
					id
				}
			}
		}
	`;
};

export async function GET() {
	const query = getPodsQuery();
	const { data } = await getClient().query({
		query: query,
		context: {
			fetchOptions: {
				//TODO change revalidation to next: { revalidate: 60 },
				next: { revalidate: 3600 },
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

export const revalidate = 60;

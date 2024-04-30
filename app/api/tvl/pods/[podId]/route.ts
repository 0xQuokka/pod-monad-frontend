import { POD_REWARD_INTERFACE } from "@/app/app/interfaces/Pod";
import { ALLOW_ORIGIN } from "@/config/enviroment";
import { getClient } from "@/lib/apolloClientRC";
import { isEthereumAddress } from "@/utils/address";
import { calculateAPR } from "@/utils/pod";
import { getPodQueryById } from "@/utils/queries";
import { ethers } from "ethers";

type DEBANK_RESPONSE = {
	id: string;
	chain: string;
	name: string;
	symbol: string;
	display_symbol?: string;
	optimized_symbol: string;
	decimals: number;
	logo_url: string;
	protocol_id: string;
	price: number;
	price_24h_change: number;
	is_verified: boolean;
	is_core: boolean;
	is_wallet: boolean;
	time_at: number;
	amount: number;
	raw_amount: BigInt;
	raw_amount_hex_str: string;
};

export async function GET(req: Request, { params }: { params: { podId: string } }) {
	const podId = params.podId;
	if (!isEthereumAddress(podId)) return new Response("Bad request", { status: 400 });

	const headers = {
		"Access-Control-Allow-Origin": ALLOW_ORIGIN,
		"Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
	};

	const query = getPodQueryById(podId);
	try {
		const {
			data: { pod },
		} = await getClient().query({
			query: query,
			context: {
				fetchOptions: {
					next: { revalidate: 300, tags: [`pod_${podId.toLowerCase()}`] },
				},
			},
		});
		const debankData = await fetch(`${process.env.DEBANK_API_URL}/user/token_list?chain_id=base&id=${podId}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				AccessKey: process.env.DEBANK_API_KEY as string,
			},
			next: {
				revalidate: 660,
				tags: [`pod_debank_${podId.toLowerCase()}`],
			},
		});

		const debank = await debankData.json();
		const reverseMapping = debank.reduce((acc: Record<string, DEBANK_RESPONSE>, d: DEBANK_RESPONSE) => {
			acc[d.id.toLowerCase()] = d;
			return acc;
		}, {}) as Record<string, DEBANK_RESPONSE>;

		const underlying = reverseMapping[pod.underlying.id.toLowerCase()];
		if (!underlying) {
			return new Response(
				JSON.stringify({
					apr: calculateAPR(pod),
				}),
				{
					status: 200,
					headers,
				}
			); // Generic APR calculation
		}
		const dollarsDeposited = underlying.price * parseFloat(ethers.formatUnits(pod.reserve, parseInt(pod.underlying.decimals.toString())));
		if (dollarsDeposited == 0) {
			return new Response(
				JSON.stringify({
					apr: calculateAPR(pod),
				}),
				{
					status: 200,
					headers,
				}
			); // generic APR calculation
		}

		let dollarsInRewards = 0;
		pod.rewards.forEach((_reward: POD_REWARD_INTERFACE) => {
			const _price = reverseMapping[_reward.token.id.toLowerCase()].price;
			dollarsInRewards = dollarsInRewards + _price * parseFloat(ethers.formatUnits(_reward.remainingAmount.toString(), parseInt(_reward.token.decimals.toString())));
		});

		return new Response(
			JSON.stringify({
				apr: (dollarsInRewards * 100) / dollarsDeposited,
			}),
			{
				status: 200,
				headers,
			}
		);
	} catch (e) {
		console.log({ e });
		return new Response(JSON.stringify({}), {
			status: 400,
			headers,
		});
	}
}

export const revalidate = 720;

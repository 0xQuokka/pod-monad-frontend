import { Address } from "viem";
import Sidebar from "./components/sidebar";
import { gql, useQuery } from "@apollo/client";
import RewardList from "./partial/RewardList";
import DepositBox from "./partial/DepositBox";
import LockBox from "./partial/LockBox";
import { getClient } from "@/lib/apolloClientRC";

interface PodPageParams {
	params: {
		podAddress: Address;
	};
}

const GET_PODS = gql`
	query GetPod($id: String!) {
		pod(id: $id) {
			id
			name
			symbol
			decimals
			reserve
			locked
			description
			underlying {
				id
				name
				symbol
				decimals
			}
			owner {
				id
			}
			rewards {
				id
				token {
					name
					symbol
					decimals
				}
				startDate
				endDate
				amount
				remainingAmount
			}
		}
	}
`;

const PodPage = async ({ params }: PodPageParams) => {
	const { data } = await getClient().query({
		query: GET_PODS,
		variables: {
			id: params.podAddress,
		},
		context: {
			fetchOptions: {
				next: { revalidate: 60 },
			},
		},
	});

	return (
		<>
			{data && data.pod ? (
				<div className="flex gap-16 md:flex-col">
					<Sidebar pod={data.pod} />
					<div className="flex-1 flex flex-col gap-16">
						<DepositBox pod={data.pod} />
						<LockBox pod={data.pod} />
						<RewardList rewards={data.pod.rewards} pod={data.pod} />
					</div>
				</div>
			) : (
				<></>
			)}
		</>
	);
};

export default PodPage;

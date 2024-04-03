"use client";
import { Address } from "viem";
import Sidebar from "./components/sidebar";
import { gql, useQuery } from "@apollo/client";
import RewardList from "./partial/RewardList";
import DepositBox from "./partial/DepositBox";

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
			reserve
			locked
			description
			underlying {
				id
				name
				symbol
			}
			decimals
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

const PodPage = ({ params }: PodPageParams) => {
	const { loading, error, data } = useQuery(GET_PODS, {
		variables: { id: params.podAddress },
	});

	return (
		<>
			{data && data.pod ? (
				<div className="flex gap-16">
					<Sidebar pod={data.pod} />
					<div className="flex-1">
						<DepositBox pod={data.pod} />
						<RewardList rewards={data.pod.rewards} />
					</div>
				</div>
			) : (
				<></>
			)}
		</>
	);
};

export default PodPage;

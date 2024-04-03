"use client";
import { POD_INTERFACE } from "@/app/app/interfaces/Pod";
import { useQuery, gql } from "@apollo/client";
import { useEffect } from "react";
import PodCard from "./podCard";

const GET_PODS = gql`
	query GetPods {
		pods(first: 10) {
			id
			name
			symbol
			reserve
			description
			underlying {
				id
				name
				symbol
				decimals
			}
			decimals
			owner {
				id
			}
		}
	}
`;

const PodList = () => {
	const { loading, error, data } = useQuery(GET_PODS);

	return (
		<div>
			{data && data.pods ? (
				data.pods.map((pod: POD_INTERFACE) => {
					return <PodCard pod={pod} key={pod.id} />;
				})
			) : (
				<></>
			)}
		</div>
	);
};

export default PodList;

import { gql } from "@apollo/client";

export const getPodQueryById = (id: string) => {
	return gql`
		query GetPod {
			pod(id: "${id}") {
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

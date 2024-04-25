import { gql } from "@apollo/client";
import Label from "../components/text/Label";
import Title32 from "../components/text/Title32";
import { getClient } from "@/lib/apolloClientRC";
import CreatePodButton from "./components/createPodButton";
import PodGrid from "../components/grid/podGrid";
import Search from "./components/search/search";
import { getTokenList } from "@/utils/build/getTokenList";
import { getTokenMapping } from "@/utils/build/getTokenMapping";

const GET_PODS = gql`
	query GetPods {
		podFactories(first: 1) {
			availablePods
		}
		pods(first: 20, orderBy: reserve, orderDirection: desc) {
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

const PageWrapper = async () => {
	const { data } = await getClient().query({
		query: GET_PODS,
		context: {
			fetchOptions: {
				//TODO change revalidation to next: { revalidate: 60 },
				next: { revalidate: 3600 },
			},
		},
	});

	const tokenList = await getTokenList();
	const tokenMapping = await getTokenMapping();

	return (
		<>
			<div className="flex justify-between items-center">
				<div>
					<Title32 className="text-white">ALL PODS</Title32>
					{data && data.podFactories && data.podFactories[0] ? <Label>{data.podFactories[0].availablePods} currently active</Label> : <Label>0 currently active</Label>}
				</div>
				<div className="flex gap-2">
					<Search tokenList={tokenList} tokenMapping={tokenMapping} />
					<CreatePodButton />
				</div>
			</div>
			<div className="flex flex-col gap-2 mt-4">{data && data.pods ? <PodGrid pods={data.pods} /> : <></>}</div>
		</>
	);
};

export default PageWrapper;

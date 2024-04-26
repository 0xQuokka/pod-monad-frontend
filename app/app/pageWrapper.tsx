import Title32 from "../components/text/Title32";
import CreatePodButton from "./components/createPodButton";
import PodGrid from "../components/grid/podGrid";
import Search from "./components/search/search";
import AvailablePods from "./components/availablePods";

const PageWrapper = async () => {
	return (
		<>
			<div className="flex xmd:flex-col xmd:items-start xms:justify-start xmd:gap-2 justify-between items-center">
				<div>
					<Title32 className="text-white">ALL PODS</Title32>
					<AvailablePods />
				</div>
				<div className="flex gap-2">
					<Search />
					<CreatePodButton />
				</div>
			</div>
			<div className="flex flex-col gap-2 mt-4">
				<PodGrid />
			</div>
		</>
	);
};

export default PageWrapper;

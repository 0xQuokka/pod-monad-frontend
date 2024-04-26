import Title32 from "../components/text/Title32";
import CreatePodButton from "./components/createPodButton";
import PodGrid from "../components/grid/podGrid";
import Search from "./components/search/search";
import AvailablePods from "./components/availablePods";

const PageWrapper = async () => {
	return (
		<>
			<Title32 className="text-white">POD STATION</Title32>
			<p className="text-gray max-w-[400px] mt-2">
				Here you can find all of the <span className="text-white">created pods</span>, as well as genesis pods, which are pods created by <span className="text-white">verified communities.</span>
			</p>
			<div className="flex xmd:flex-col xmd:items-start xms:justify-start xmd:gap-2 justify-between items-center mt-6">
				<div className="flex gap-6 items-center sm:flex-col-reverse sm:items-start sm:gap-2">
					<div>
						<CreatePodButton />
					</div>
					<AvailablePods />
				</div>
				<div className="flex gap-2">
					<Search />
				</div>
			</div>
			<div className="flex flex-col gap-2 mt-4">
				<PodGrid />
			</div>
		</>
	);
};

export default PageWrapper;

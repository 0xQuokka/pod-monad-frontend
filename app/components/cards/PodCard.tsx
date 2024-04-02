import ArrowRight from "../icons/arrowRight";
import Label from "../text/Label";
import Title24 from "../text/Title24";

const PodCard = () => {
	return (
		<div className="bg-black border border-neutral p-4">
			<header className="flex items-center justify-between">
				<div>
					<Label>GREATEST POD OF ALL</Label>
					<Title24>ARB</Title24>
				</div>
				<div></div>
			</header>
			<footer className="flex justify-between items-center text-gray mt-2">
				<div className="flex items-center gap-2">
					<div className="border py-1 px-2 border-neutral">TVL: 672K</div>
					<div className="py-1 px-2 border border-neutral">PERMISIONLESS</div>
				</div>
				<div className="uppercase text-white flex gap-2 items-center">
					<span>ENTER POD</span>
					<span className="w-[14px]">
						<ArrowRight />
					</span>
				</div>
			</footer>
		</div>
	);
};

export default PodCard;

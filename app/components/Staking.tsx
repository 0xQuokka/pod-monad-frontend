const Staking = () => {
	return (
		<div className="w-full">
			<section className="grid grid-cols-2 md:flex md:flex-col md:gap-2">
				<div>
					<h1 className="text-white text-[28px] leading-[28px] -tracking-[1px] font-[500]">Stake your wMON</h1>
					<div className="text-[#737E80] mt-2">Protocol sneak peek</div>
				</div>
				<div>
					<header>
						<div className="inline-block">
							<div className="flex items-center gap-2 border border-gray rounded-[4px]">
								<div className="bg-violet text-white">Deposit</div>
								<div>Withdraw</div>
							</div>
						</div>
					</header>
				</div>
			</section>
		</div>
	);
};

export default Staking;

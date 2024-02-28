import Image from "next/image";
import Arbitrum from "./components/arbitrum";
import Button from "./components/button";

export default function Home() {
	return (
		<>
			{" "}
			<div className="absolute z-0 h-[100vh] top-0 left-0 right-0">
				<Image
					src={"/background.jpeg"}
					alt="podline"
					fill
					className="mix-blend-overlay object-cover"
				/>
				<div
					style={{
						background: "linear-gradient(#111012EE, #111012FF)",
					}}
					className="absolute z-10 h-[100vh] top-0 left-0 right-0"
				></div>
			</div>
			<main className="relative z-10 py-[80px] w-[864px] mx-auto md:w-full md:p-5">
				<header className="flex items-center">
					<div className="text-[50px] -tracking-[3px] text-white font-[500]">
						pod.
					</div>
				</header>
				<section className="grid grid-cols-2 md:flex md:flex-col md:gap-2">
					<div className="flex flex-col gap-4 justify-center max-w-[355px] md:max-w-full md:my-10">
						<header className="uppercase text-[#737E80] flex gap-2">
							<div>
								<Arbitrum />
							</div>
							<div>Arbitrum based protocol</div>
						</header>
						<div>
							<div className="flex flex-col gap-6">
								<h1 className="text-white text-[40px] leading-[40px] -tracking-[3px] font-[500]">
									Get ready, pods are about to land.
								</h1>
								<p className="text-[#737E80] -tracking-[1px]">
									Maximize your liquid assets&apos; value—stake any liquid token
									and boost your earnings with enhanced multi-rewards.
								</p>
							</div>
							<div className="gap-2 flex items-center mt-10">
								<Button>GITBOOK</Button>
								<Button>TELEGRAM</Button>
							</div>
						</div>
					</div>
					<div className="flex items-center justify-center">
						<Image
							src={"/podcard.jpg"}
							alt="Pod Card"
							width={424}
							height={538}
							className="w-full"
						/>
					</div>
				</section>
				<section className="grid grid-cols-2 mt-20 md:flex md:flex-col md:gap-3">
					<div className="flex flex-col gap-1">
						<div className="font-[500] text-[24px] text-white ">
							Introducing pods
						</div>
						<div className="text-[#737E80] uppercase">ALPHA v0.1</div>
					</div>
					<div className="flex flex-col gap-14 md:mt-6">
						<div className="flex flex-col gap-1">
							<div className="text-white font-[24px] uppercase">
								Create your own pod
							</div>
							<p className="text-[#737E80]">
								Seamlessly <b className="text-white">create a pod</b> for a
								wide-range of liquid assets, including ERC-20 tokens, LP tokens,
								and liquid re-staking tokens (LRT), and customize it with
								multi-rewards in your preferred asset.
							</p>
						</div>
						<div className="flex flex-col gap-1">
							<div className="text-white font-[24px] uppercase">
								Stake any asset
							</div>
							<p className="text-[#737E80]">
								Whether it's a straightforward ERC-20 token, a liquidity pool
								token, or a liquid re-staking token, you have the freedom to
								<b className="text-white">
									stake any asset and earn rewards in return.
								</b>
							</p>
						</div>
						<div className="flex flex-col gap-1">
							<div className="text-white font-[24px] uppercase">
								Enhance your earnings
							</div>
							<p className="text-[#737E80]">
								Easily <b className="text-white">boost your pods</b> with
								multiple rewards over a fixed period of time, enhancing your
								potential returns without inconvenience.
							</p>
						</div>
					</div>
				</section>
				<section className="grid grid-cols-2 mt-20 md:flex md:flex-col md:gap-3">
					<div className="flex flex-col gap-1">
						<div className="font-[500] text-[24px] text-white ">Stay alert</div>
						<div className="text-[#737E80] uppercase">socials</div>
					</div>
					<div className="flex flex-col gap-14 md:mt-6">
						<div className="flex gap-4 items-center w-[200px]">
							<svg
								width="40"
								height="40"
								viewBox="0 0 40 40"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<g clipPath="url(#clip0_88_3839)">
									<circle
										cx="20"
										cy="20"
										r="19.5"
										fill="#101212"
										stroke="#323637"
									/>
									<line
										y1="-0.5"
										x2="95.0107"
										y2="-0.5"
										transform="matrix(0.707107 -0.707107 -0.707107 -0.707107 -14.0199 53.52)"
										stroke="#323637"
									/>
									<line
										x1="52.8092"
										y1="53.8736"
										x2="-14.3736"
										y2="-13.3092"
										stroke="#323637"
									/>
								</g>
								<defs>
									<clipPath id="clip0_88_3839">
										<rect width="40" height="40" rx="20" fill="white" />
									</clipPath>
								</defs>
							</svg>
							<div className="text-[#737E80] uppercase">TWITTER / X</div>
						</div>
						<div className="flex gap-4 items-center w-[200px]">
							<svg
								width="40"
								height="40"
								viewBox="0 0 40 40"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<g clip-path="url(#clip0_88_3845)">
									<circle
										cx="20"
										cy="20"
										r="19.5"
										fill="#101212"
										stroke="#323637"
									/>
									<line x1="19.5" y1="67" x2="19.5" y2="20" stroke="#323637" />
									<line x1="19.5" y1="58" x2="19.5" y2="11" stroke="#323637" />
									<line x1="-3.5" y1="11" x2="43.5" y2="11" stroke="#323637" />
								</g>
								<defs>
									<clipPath id="clip0_88_3845">
										<rect width="40" height="40" rx="20" fill="white" />
									</clipPath>
								</defs>
							</svg>

							<div className="text-[#737E80] uppercase">COMMUNITY</div>
						</div>
						<div className="flex gap-4 items-center w-[200px]">
							<svg
								width="40"
								height="40"
								viewBox="0 0 40 40"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<g clipPath="url(#clip0_88_3852)">
									<circle
										cx="20"
										cy="20"
										r="19.5"
										fill="#101212"
										stroke="#323637"
									/>
									<line
										x1="19.5"
										y1="67"
										x2="19.5"
										y2="-3.61403e-06"
										stroke="#323637"
									/>
									<line
										x1="16.5"
										y1="67"
										x2="16.5"
										y2="-3.61403e-06"
										stroke="#323637"
									/>
									<line
										x1="13.5"
										y1="67"
										x2="13.5"
										y2="-3.61403e-06"
										stroke="#323637"
									/>
									<line
										x1="10.5"
										y1="67"
										x2="10.5"
										y2="-3.61403e-06"
										stroke="#323637"
									/>
									<line
										x1="7.5"
										y1="67"
										x2="7.5"
										y2="-3.61403e-06"
										stroke="#323637"
									/>
									<line
										x1="4.5"
										y1="67"
										x2="4.5"
										y2="-3.61403e-06"
										stroke="#323637"
									/>
									<line
										x1="1.5"
										y1="67"
										x2="1.5"
										y2="-3.61403e-06"
										stroke="#323637"
									/>
								</g>
								<defs>
									<clipPath id="clip0_88_3852">
										<rect width="40" height="40" rx="20" fill="white" />
									</clipPath>
								</defs>
							</svg>

							<div className="text-[#737E80] uppercase">DOCUMENTATION</div>
						</div>
					</div>
				</section>
			</main>
		</>
	);
}

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
								<Button link="#">GITBOOK</Button>
								<Button link="https://app.camelot.exchange/">GET $POD</Button>
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
				<section className="grid grid-cols-2 mt-40 md:mt-20 md:flex md:flex-col md:gap-3">
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
								Whether it&apos;s a straightforward ERC-20 token, a liquidity
								pool token, or a liquid re-staking token, you have the freedom
								to
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
				<section className="grid grid-cols-2 mt-40 md:mt-20 md:flex md:flex-col md:gap-3">
					<div className="flex flex-col gap-1">
						<div className="font-[500] text-[24px] text-white ">Stay alert</div>
						<div className="text-[#737E80] uppercase">socials</div>
					</div>
					<div className="flex flex-col gap-14 md:mt-6">
						<a
							href="https://twitter.com/PodFinance"
							rel="noreferrer"
							target="_blank"
							className="flex gap-4 items-center w-[200px] text-[#737E80] hover:text-white"
						>
							<svg
								width="40"
								height="40"
								viewBox="0 0 40 40"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
								className="transition-all"
							>
								<g clipPath="url(#clip0_88_3839)">
									<circle
										cx="20"
										cy="20"
										r="19.5"
										fill="#101212"
										stroke="currentColor"
									/>
									<line
										y1="-0.5"
										x2="95.0107"
										y2="-0.5"
										transform="matrix(0.707107 -0.707107 -0.707107 -0.707107 -14.0199 53.52)"
										stroke="currentColor"
									/>
									<line
										x1="52.8092"
										y1="53.8736"
										x2="-14.3736"
										y2="-13.3092"
										stroke="currentColor"
									/>
								</g>
								<defs>
									<clipPath id="clip0_88_3839">
										<rect width="40" height="40" rx="20" fill="white" />
									</clipPath>
								</defs>
							</svg>
							<div className="uppercase transition-all">TWITTER / X</div>
						</a>
						<a
							href="https://t.me/podfinance"
							target="_blank"
							rel="noreferrer"
							className="flex gap-4 items-center w-[200px] text-[#737E80] hover:text-white"
						>
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
										stroke="currentColor"
									/>
									<line
										x1="19.5"
										y1="67"
										x2="19.5"
										y2="20"
										stroke="currentColor"
									/>
									<line
										x1="19.5"
										y1="58"
										x2="19.5"
										y2="11"
										stroke="currentColor"
									/>
									<line
										x1="-3.5"
										y1="11"
										x2="43.5"
										y2="11"
										stroke="currentColor"
									/>
								</g>
								<defs>
									<clipPath id="clip0_88_3845">
										<rect width="40" height="40" rx="20" fill="white" />
									</clipPath>
								</defs>
							</svg>

							<div className=" uppercase transition-all hover:text-white">
								COMMUNITY
							</div>
						</a>
						<a
							href="#"
							target="_blank"
							rel="noreferrer"
							className="flex gap-4 items-center w-[200px] text-[#737E80] hover:text-white"
						>
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
										stroke="currentColor"
									/>
									<line
										x1="19.5"
										y1="67"
										x2="19.5"
										y2="-3.61403e-06"
										stroke="currentColor"
									/>
									<line
										x1="16.5"
										y1="67"
										x2="16.5"
										y2="-3.61403e-06"
										stroke="currentColor"
									/>
									<line
										x1="13.5"
										y1="67"
										x2="13.5"
										y2="-3.61403e-06"
										stroke="currentColor"
									/>
									<line
										x1="10.5"
										y1="67"
										x2="10.5"
										y2="-3.61403e-06"
										stroke="currentColor"
									/>
									<line
										x1="7.5"
										y1="67"
										x2="7.5"
										y2="-3.61403e-06"
										stroke="currentColor"
									/>
									<line
										x1="4.5"
										y1="67"
										x2="4.5"
										y2="-3.61403e-06"
										stroke="currentColor"
									/>
									<line
										x1="1.5"
										y1="67"
										x2="1.5"
										y2="-3.61403e-06"
										stroke="currentColor"
									/>
								</g>
								<defs>
									<clipPath id="clip0_88_3852">
										<rect width="40" height="40" rx="20" fill="white" />
									</clipPath>
								</defs>
							</svg>

							<div className="uppercase">DOCUMENTATION</div>
						</a>
					</div>
				</section>
			</main>
			<footer>
				<div className="w-[150px] mx-auto flex items-center gap-4 mt-40 md:mt-20 mb-10 justify-center text-[12px]">
					<div className="text-right">
						<div className="text-white">1. POD</div>
						<div className="text-right text-[#737E80]">
							DEFI PROTOCOL BUILT ON ARBITRUM
						</div>
					</div>
					<div>
						<svg
							width="25"
							height="25"
							viewBox="0 0 25 25"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<g opacity="0.6">
								<path
									d="M2.86327 7.42496V16.9654C2.86327 17.5787 3.18453 18.1336 3.71996 18.4452L11.9851 23.2154C12.5108 23.5172 13.1631 23.5172 13.6888 23.2154L21.9539 18.4452C22.4796 18.1434 22.8106 17.5787 22.8106 16.9654V7.42496C22.8106 6.81164 22.4894 6.25673 21.9539 5.94521L13.6888 1.17498C13.1631 0.873186 12.5108 0.873186 11.9851 1.17498L3.71996 5.94521C3.19426 6.247 2.873 6.81164 2.873 7.42496H2.86327Z"
									fill="#213147"
								/>
								<path
									d="M14.6415 14.0488L13.4636 17.2808C13.4344 17.3685 13.4344 17.4658 13.4636 17.5632L15.4885 23.122L17.8347 21.7688L15.0212 14.0488C14.9531 13.8735 14.7097 13.8735 14.6415 14.0488Z"
									fill="#12AAFF"
								/>
								<path
									d="M17.0048 8.61047C16.9366 8.43524 16.6933 8.43524 16.6251 8.61047L15.4472 11.8425C15.4179 11.9302 15.4179 12.0275 15.4472 12.1249L18.7668 21.2273L21.113 19.8741L17.0048 8.6202V8.61047Z"
									fill="#12AAFF"
								/>
								<path
									d="M12.8322 1.53483C12.8906 1.53483 12.949 1.5543 12.9977 1.58351L21.9346 6.74315C22.0417 6.80156 22.1001 6.91838 22.1001 7.0352V17.3545C22.1001 17.4713 22.0319 17.5881 21.9346 17.6465L12.9977 22.8062C12.949 22.8354 12.8906 22.8549 12.8322 22.8549C12.7738 22.8549 12.7154 22.8354 12.6667 22.8062L3.72982 17.6465C3.62274 17.5881 3.56433 17.4713 3.56433 17.3545V7.02547C3.56433 6.90864 3.63247 6.79182 3.72982 6.73341L12.6667 1.57377C12.7154 1.54457 12.7738 1.5251 12.8322 1.5251V1.53483ZM12.8322 0.0258789C12.5109 0.0258789 12.1994 0.10376 11.9074 0.269258L2.97048 5.4289C2.3961 5.75989 2.04564 6.36348 2.04564 7.02547V17.3447C2.04564 18.0067 2.3961 18.6103 2.97048 18.9413L11.9074 24.101C12.1897 24.2665 12.5109 24.3443 12.8322 24.3443C13.1535 24.3443 13.465 24.2665 13.7571 24.101L22.6939 18.9413C23.2683 18.6103 23.6188 18.0067 23.6188 17.3447V7.02547C23.6188 6.36348 23.2683 5.75989 22.6939 5.4289L13.7473 0.269258C13.465 0.10376 13.1437 0.0258789 12.8225 0.0258789H12.8322Z"
									fill="#9DCCED"
								/>
								<path
									d="M6.91219 21.2369L7.73968 18.9783L9.39466 20.351L7.84677 21.7723L6.91219 21.2369Z"
									fill="#213147"
								/>
								<path
									d="M12.0764 6.29733H9.80815C9.64265 6.29733 9.48689 6.40442 9.42848 6.56018L4.57063 19.8779L6.9168 21.2311L12.2711 6.56018C12.3198 6.42389 12.2225 6.2876 12.0862 6.2876L12.0764 6.29733Z"
									fill="white"
								/>
								<path
									d="M16.0504 6.2973H13.7821C13.6166 6.2973 13.4608 6.40439 13.4024 6.56015L7.85335 21.7665L10.1995 23.1197L16.2353 6.56015C16.284 6.42386 16.1867 6.28756 16.0504 6.28756V6.2973Z"
									fill="white"
								/>
								<path
									d="M0.662109 0.0258789H25V24.3638H0.662109V0.0258789Z"
									fill="black"
									style={{ mixBlendMode: "saturation" }}
								/>
							</g>
						</svg>
					</div>
				</div>
			</footer>
		</>
	);
}

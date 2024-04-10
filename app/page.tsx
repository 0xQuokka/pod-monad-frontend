import Image from "next/image";
import Button from "./components/button";
import LinkButton from "./components/linkButton";

export default function Home() {
	return (
		<>
			{" "}
			<div className="absolute z-0 h-[100vh] top-0 left-0 right-0">
				<Image src={"/background.jpeg"} alt="podline" fill quality={100} className="mix-blend-overlay object-cover" />
			</div>
			<main className="relative z-10 py-[80px] w-[864px] mx-auto md:w-full md:p-5">
				<header className="flex items-center justify-between">
					<div className="text-[50px] -tracking-[3px] text-white font-[500]">pod.</div>
					<div>
						<LinkButton link="https://app.pod.finance" white>
							Launch app
						</LinkButton>
					</div>
				</header>
				<section className="grid grid-cols-2 md:flex md:flex-col md:gap-2">
					<div className="flex flex-col gap-4 justify-center max-w-[355px] md:max-w-full md:my-10">
						<header className="uppercase text-[#737E80] flex gap-2">
							<div>Base based protocol</div>
						</header>
						<div>
							<div className="flex flex-col gap-6">
								<h1 className="text-white text-[40px] leading-[40px] -tracking-[3px] font-[500]">Get ready, pods are about to land.</h1>
								<p className="text-[#737E80] -tracking-[1px]">
									POD is a fully permissionless protocol that maximize your assets&apos; value. Create a Pod or stake any token including ERC-20 tokens or LP tokens and boost your earnings with enhanced multi-rewards.
								</p>
							</div>
							<div className="gap-2 flex items-center mt-10">
								<LinkButton link="https://pod-finance.gitbook.io/welcome-to-pod-finance">GITBOOK</LinkButton>
								<LinkButton link="https://app.uniswap.org/explore/tokens/base/0xbef5d404548fab05820e64f92cf043b6a06f9c72"> GET $POD</LinkButton>
							</div>
						</div>
					</div>
					<div className="flex items-center justify-center">
						<Image src={"/podcard.jpg"} alt="Pod Card" width={848} height={1076} quality={100} className="w-full" />
					</div>
				</section>
				<section className="grid grid-cols-2 mt-40 md:mt-20 md:flex md:flex-col md:gap-3">
					<div className="flex flex-col gap-1">
						<div className="font-[500] text-[24px] text-white ">Introducing pods.</div>
						<div className="text-[#737E80] uppercase">ALPHA v0.1</div>
					</div>
					<div className="flex flex-col gap-20 md:mt-6">
						<div className="flex flex-col gap-4">
							<div className="text-white font-[24px] uppercase">Create your own pod</div>
							<p className="text-[#737E80]">
								Seamlessly <b className="text-white">create a pod</b> for a wide-range of assets, including ERC-20 tokens, LP tokens, liquid re-staking tokens (LRT) or even ERC-404 tokens, and customize it with multi-rewards
								in your preferred asset.
							</p>
						</div>
						<div className="flex flex-col gap-4">
							<div className="text-white font-[24px] uppercase">Stake any asset</div>
							<p className="text-[#737E80]">
								Whether it&apos;s a straightforward ERC-20 token, a liquidity pool token, or a liquid re-staking token, you have the freedom to <b className="text-white">stake any asset and earn rewards in return.</b>
							</p>
						</div>
						<div className="flex flex-col gap-4">
							<div className="text-white font-[24px] uppercase">Enhance your earnings</div>
							<p className="text-[#737E80]">
								Easily <b className="text-white">boost any pod</b> with multiple rewards over a custom period of time providing value to any asset you&apos;re interested in, including ERC-20 or LPs.
							</p>
						</div>
					</div>
				</section>
				<section className="grid grid-cols-2 mt-40 md:mt-20 md:flex md:flex-col md:gap-3">
					<div className="flex flex-col gap-1">
						<div className="font-[500] text-[24px] text-white ">Stay alert.</div>
						<div className="text-[#737E80] uppercase">socials</div>
					</div>
					<div className="flex flex-col gap-4 md:mt-6">
						<a href="https://twitter.com/PodFinance" rel="noreferrer" target="_blank" className="flex gap-4 items-center w-[200px] text-[#737E80] hover:text-white">
							<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-all">
								<g clipPath="url(#clip0_88_3839)">
									<circle cx="20" cy="20" r="19.5" fill="#101212" stroke="currentColor" />
									<line y1="-0.5" x2="95.0107" y2="-0.5" transform="matrix(0.707107 -0.707107 -0.707107 -0.707107 -14.0199 53.52)" stroke="currentColor" />
									<line x1="52.8092" y1="53.8736" x2="-14.3736" y2="-13.3092" stroke="currentColor" />
								</g>
								<defs>
									<clipPath id="clip0_88_3839">
										<rect width="40" height="40" rx="20" fill="white" />
									</clipPath>
								</defs>
							</svg>
							<div className="uppercase transition-all">TWITTER / X</div>
						</a>
						<a href="https://t.me/podfinance" target="_blank" rel="noreferrer" className="flex gap-4 items-center w-[200px] text-[#737E80] hover:text-white">
							<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
								<g clipPath="url(#clip0_88_3845)">
									<circle cx="20" cy="20" r="19.5" fill="#101212" stroke="currentColor" />
									<line x1="19.5" y1="67" x2="19.5" y2="20" stroke="currentColor" />
									<line x1="19.5" y1="58" x2="19.5" y2="11" stroke="currentColor" />
									<line x1="-3.5" y1="11" x2="43.5" y2="11" stroke="currentColor" />
								</g>
								<defs>
									<clipPath id="clip0_88_3845">
										<rect width="40" height="40" rx="20" fill="white" />
									</clipPath>
								</defs>
							</svg>

							<div className=" uppercase transition-all hover:text-white">COMMUNITY</div>
						</a>
						<a href="https://pod-finance.gitbook.io/welcome-to-pod-finance" target="_blank" rel="noreferrer" className="flex gap-4 items-center w-[200px] text-[#737E80] hover:text-white">
							<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
								<g clipPath="url(#clip0_88_3852)">
									<circle cx="20" cy="20" r="19.5" fill="#101212" stroke="currentColor" />
									<line x1="19.5" y1="67" x2="19.5" y2="-3.61403e-06" stroke="currentColor" />
									<line x1="16.5" y1="67" x2="16.5" y2="-3.61403e-06" stroke="currentColor" />
									<line x1="13.5" y1="67" x2="13.5" y2="-3.61403e-06" stroke="currentColor" />
									<line x1="10.5" y1="67" x2="10.5" y2="-3.61403e-06" stroke="currentColor" />
									<line x1="7.5" y1="67" x2="7.5" y2="-3.61403e-06" stroke="currentColor" />
									<line x1="4.5" y1="67" x2="4.5" y2="-3.61403e-06" stroke="currentColor" />
									<line x1="1.5" y1="67" x2="1.5" y2="-3.61403e-06" stroke="currentColor" />
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
						<div className="text-right text-[#737E80]">DEFI PROTOCOL BUILT ON BASE</div>
					</div>
				</div>
			</footer>
		</>
	);
}

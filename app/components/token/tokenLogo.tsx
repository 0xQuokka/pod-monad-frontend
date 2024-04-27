import Image from "next/image";

interface ITokenLogo {
	logo: string | undefined;
	name: string;
	size?: number;
}

const TokenLogo = ({ logo, name, size = 24 }: ITokenLogo) => {
	const defaultLogo = !logo;
	const logoURL = logo ? `${process.env.NEXT_PUBLIC_CDN_ASSET_URI as string}${logo}` : "https://pod.finance/default-token-logo.png";

	// offset padding (8px) + border left and right
	const _size = defaultLogo ? size : size + 18;
	return (
		<div className={`${defaultLogo ? "p-2 bg-neutral-black-secondary" : ""}  border border-neutral-border rounded-full overflow-hidden inline-block`}>
			<Image src={logoURL} alt={`${name} logo`} quality={100} width={_size} height={_size} className="rounded-full" />
		</div>
	);
};

export default TokenLogo;

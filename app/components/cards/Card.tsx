interface CARD_INTERFACE {
	children: React.ReactNode;
	className?: string;
	noPadding?: boolean;
}

const Card = ({ children, className, noPadding }: CARD_INTERFACE) => {
	return <div className={`border border-neutral-border ${noPadding ? "p-0" : "p-4"} bg-neutral-black ${className}`}>{children}</div>;
};

export default Card;

const LinkButton = ({ children, link, white }: any) => {
	return (
		<a href={link} target="_blank" rel="noreferrer" className={`p-4 border border-[#323637] transition-all ${white ? "bg-white hover:opacity-80 text-[#17191A]" : "bg-[#17191A] hover:bg-[#202224] text-white"}  uppercase cursor-pointer`}>
			{children}
		</a>
	);
};

export default LinkButton;

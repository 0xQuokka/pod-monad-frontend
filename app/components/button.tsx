const Button = ({ children, link }: any) => {
	return (
		<a
			href={link}
			target="_blank"
			rel="noreferrer"
			className="p-4 border border-[#323637] bg-[#17191A] transition-all hover:bg-[#202224] text-white uppercase cursor-pointer"
		>
			{children}
		</a>
	);
};

export default Button;

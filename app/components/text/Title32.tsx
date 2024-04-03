import { IText } from "./interface";

const Title32 = ({ children, className, onClick }: IText) => {
	return (
		<div onClick={onClick} className={`text-[32px] leading-10 -tracking-[1px] ${className}`}>
			{children}
		</div>
	);
};

export default Title32;

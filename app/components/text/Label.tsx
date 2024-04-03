import { IText } from "./interface";

const Label = ({ children, className, onClick }: IText) => {
	return (
		<div onClick={onClick} className={`text-gray uppercase ${className}`}>
			{children}
		</div>
	);
};

export default Label;

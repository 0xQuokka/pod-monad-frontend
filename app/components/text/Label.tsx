import { IText } from "./interface";

const Label = ({ children, className, onClick }: IText) => {
	return (
		<div onClick={onClick} className={`${className} text-gray uppercase`}>
			{children}
		</div>
	);
};

export default Label;

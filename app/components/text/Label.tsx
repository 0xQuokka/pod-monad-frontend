import { IText } from "./interface";

const Label = ({ children, className }: IText) => {
	return <div className={`${className} text-gray uppercase`}>{children}</div>;
};

export default Label;

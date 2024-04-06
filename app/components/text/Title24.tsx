import { IText } from "./interface";

const Title24 = ({ children }: IText) => {
	return <div className="text-[24px] md:text-[20px] text-white  leading-10 -tracking-[1px]">{children}</div>;
};

export default Title24;

import { ReactNode } from "react";

interface IExternalLink {
	link: string;
	className?: string;
	children: ReactNode;
}
const ExternalLink = ({ link, className, children }: IExternalLink) => {
	return (
		<a className={className} href={link} rel="noreferrer" target="_blank">
			{children}
		</a>
	);
};

export default ExternalLink;

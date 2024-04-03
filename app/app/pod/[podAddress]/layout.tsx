import { ReactNode } from "react";

interface POD_LAYOUT {
	children: ReactNode;
}

const Layout = ({ children }: POD_LAYOUT) => {
	return <div>{children}</div>;
};

export default Layout;

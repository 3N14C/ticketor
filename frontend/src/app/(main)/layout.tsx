import { FC } from "react";

interface IProps {
	children: React.ReactNode;
}

const Layout: FC<IProps> = ({ children }) => {
	return <>{children}</>;
};

export default Layout;
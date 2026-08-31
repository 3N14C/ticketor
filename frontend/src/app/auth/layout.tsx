import { FC } from "react";
import Image from "next/image";

interface IProps {
	children: React.ReactNode;
}

const Layout: FC<IProps> = ({ children }) => {
	return (
		<div className={"bg-black flex items-center justify-between"}>
			{children}

			<Image
				src={"/images/png/auth-hero.png"}
				alt={"auth-hero"}
				width={816}
				height={1029}
				className={"w-auto h-auto"}
				loading={"eager"}
			/>
		</div>
	);
};

export default Layout;
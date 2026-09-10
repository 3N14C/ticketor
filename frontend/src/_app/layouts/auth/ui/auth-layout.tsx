import Image from "next/image";

export const AuthLayout = ({ children }: LayoutProps<"/auth">) => {
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
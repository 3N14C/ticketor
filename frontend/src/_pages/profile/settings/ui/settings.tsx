import { NextPage } from "next";
import { Header } from "@widgets/header";

export const Settings: NextPage = () => {
	return (
		<div className={"bg-linear-180 from-[#0E0E11] to-[#010108] h-screen"}>
			<Header className={"mt-5"} />
		</div>
	);
};
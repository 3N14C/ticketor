"use client";

import { FC } from "react";
import { Button } from "@shared/ui/button";
import { Typography } from "@shared/ui/typography";

export const GoogleOauth: FC = () => {
	return (
		<Button
			variant={"outline"}
			size={"56"}
			className={"border-neutral-500 [&_*]:text-white"}
		>
			<Typography size={"button-xl"}>Continue with Google</Typography>
		</Button>
	);
};
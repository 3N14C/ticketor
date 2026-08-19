"use client";

import { FC } from "react";
import { Header } from "@widgets/header";
import { Typography } from "@shared/ui/typography";
import { Button } from "@shared/ui/button";

export const Home: FC = () => {
	return (
		<div>
			<div
				className={
					"bg-[url('/images/png/home-poster.png')] bg-cover bg-center h-screen"
				}
			>
				<Header className={"pt-6"} />

				<div
					className={
						"flex flex-col items-center gap-16 max-w-[760px] w-full mx-auto h-[calc(100vh-90px)] justify-center"
					}
				>
					<div className={"flex flex-col gap-[37px] items-center"}>
						<Typography size={"display-xl"} className={"uppercase text-center"}>
							book your movie tickets now!
						</Typography>
						<Typography
							size={"h5"}
							className={"capitalize max-w-[410px] w-full text-center"}
						>
							watch the latest movies at your favorite cinemas
						</Typography>
					</div>

					<div className={"flex items-center max-w-[310px] w-full"}>
						<Button size={"48"}>
							<Typography size={"button-xl"}>Explore Movies</Typography>
						</Button>
						<Button variant={"text"}>
							<Typography size={"button-xl"} className={"text-white!"}>
								Find Cinema
							</Typography>
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};
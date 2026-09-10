import { FC } from "react";
import { Header } from "@widgets/header";
import { Typography } from "@shared/ui/typography";
import { Button } from "@shared/ui/button";
import { CHIPS } from "../model/chips";

export const Home: FC = () => {
	return (
		<div>
			<section id={"hero"} className={"bg-[url('/images/png/home-poster.png')] bg-cover bg-center h-screen"}>
				<Header className={"pt-6"} />

				<div className={"flex flex-col items-center gap-16 max-w-[760px] w-full mx-auto h-[calc(100vh-90px)] justify-center"}>
					<div className={"flex flex-col gap-[37px] items-center"}>
						<Typography size={"display-xl"} className={"uppercase text-center"}>
							book your movie tickets now!
						</Typography>
						<Typography size={"h5"} className={"capitalize max-w-[410px] w-full text-center"}>
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

					<div className={"grid grid-cols-3 w-full"}>
						{CHIPS.map((chip) => (
							<div key={chip.id} className={"flex flex-col items-center gap-2"}>
								<Typography size={"display-m"}>{chip.count}</Typography>
								<Typography size={"body-xl"}>{chip.label}</Typography>
							</div>
						))}
					</div>
				</div>
			</section>

			<div className={"bg-[#0E0E11] relative h-[75px] flex items-center justify-center"}>
				<div className={"absolute bg-radial from-[#B3D5E5] from-30% to-80% top-0 bottom-0 z-40 h-full" + " w-2/3"} />
				<Typography tag={"h5"} className={"text-white text-center"}>
					Special Offer: Buy 2 Tickets, Get 1 FREE! Valid This Weekend Only.
				</Typography>
			</div>
		</div>
	);
};
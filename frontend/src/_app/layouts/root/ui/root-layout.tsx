import "@app/styles/globals.css";
import { cn } from "@shared/lib/style";
import { Toaster } from "@shared/ui/toaster";
import { figtree, geistMono, geistSans } from "../model/fonts";
import { ReactQuery } from "@/_app/providers";

export const RootLayout = ({ children }: LayoutProps<"/">) => {
	return (
		<html lang="en" className={cn("h-full antialiased font-sans", geistSans.variable, geistMono.variable, figtree.variable)}>
			<body className="min-h-full flex flex-col bg-black ">
				<ReactQuery>
					<Toaster />
					{children}
				</ReactQuery>
			</body>
		</html>
	);
};
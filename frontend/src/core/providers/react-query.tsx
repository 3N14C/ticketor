"use client";

import { FC } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@shared/config";
import { ReactQueryDevtoolsPanel } from "@tanstack/react-query-devtools";
import { TanStackDevtools } from "@tanstack/react-devtools";
import { formDevtoolsPlugin } from "@tanstack/react-form-devtools";

interface IProps {
	children: React.ReactNode;
}

export const ReactQuery: FC<IProps> = ({ children }) => {
	return (
		<>
			<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
			<TanStackDevtools
				config={{ defaultOpen: false, position: "top-right" }}
				plugins={[
					formDevtoolsPlugin(),
					{
						name: "Queries",
						render: <ReactQueryDevtoolsPanel client={queryClient} />,
						defaultOpen: false,
					},
				]}
			/>
		</>
	);
};
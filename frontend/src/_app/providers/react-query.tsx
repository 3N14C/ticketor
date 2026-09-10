"use client";

import { FC, PropsWithChildren, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtoolsPanel } from "@tanstack/react-query-devtools";
import { TanStackDevtools } from "@tanstack/react-devtools";
import { formDevtoolsPlugin } from "@tanstack/react-form-devtools";

export const ReactQuery: FC<PropsWithChildren> = ({ children }) => {
	const [queryClient] = useState(
		() =>
			new QueryClient({
				defaultOptions: {
					queries: {
						refetchOnWindowFocus: false,
					},
				},
			})
	);

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
"use client";

import { FC } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@shared/config";

interface IProps {
	children: React.ReactNode;
}

export const ReactQuery: FC<IProps> = ({ children }) => {
	return (
		<>
			<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
		</>
	);
};
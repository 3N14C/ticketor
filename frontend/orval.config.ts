import { defineConfig } from "orval";

export default defineConfig({
	"ticketor-api": {
		input: {
			target: "http://localhost:4200/docs-json",
		},
		output: {
			target: "./src/shared/api/generated",
			schemas: "./src/shared/api/generated/model",
			mode: "tags-operations",
			clean: true,
			client: "react-query",
			namingConvention: "kebab-case",
			httpClient: "axios",
			formatter: "prettier",
			indexFiles: true,
			override: {
				query: {
					useInvalidate: true,
					useGetQueryData: true,
				},
			},
		},
	},
});

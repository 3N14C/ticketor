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
				mutator: {
					path: "./src/shared/api/api-mutator.ts",
					name: "apiMutator",
				},
				query: {
					useInvalidate: true,
					useGetQueryData: true,
				},
			},
		},
	},
});

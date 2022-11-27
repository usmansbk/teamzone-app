import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "http://localhost:4000/graphql",
  documents: ["src/graphql/queries/*.ts"],
  ignoreNoDocuments: true,
  generates: {
    "./src/__generated__/": {
      preset: "client",
      config: {
        useTypeImports: true,
      },
      plugins: [],
      presetConfig: {
        gqlTagName: "gql",
      },
    },
  },
};

export default config;

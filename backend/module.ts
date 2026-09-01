import {module} from "@prisma/composer";
import {postgres} from "@prisma/composer-prisma-cloud/orm";

import {appContract} from "./src/infrastructure/prisma/composer";
import app from "./service";

export default module("backend", ({ provision }) => {
  const database = provision(
    postgres({
      name: "database",
      contract: appContract,
      config: "./prisma.config.ts",
    }),
    { id: "database" },
  );

  provision(app, { deps: { database } });
});
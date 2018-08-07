import * as cors from "cors";
import * as express from "express";
import * as graphqlHTTP from "express-graphql";
import { rootValue } from "./root";
import { rootValueV2, schemaV2 } from "./root.v2";
import { schema } from "./schema";

const app = express();

app.use("/api", cors(), graphqlHTTP({
  graphiql: true,
  rootValue,
  schema,
}));

app.use("/v2", cors(), graphqlHTTP({
  graphiql: true,
  rootValue: rootValueV2,
  schema: schemaV2,
}));

app.listen(80);

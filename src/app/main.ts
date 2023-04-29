
import { schema } from "./graphql/schema";

import { ApolloServer } from "apollo-server-express";
import cors from "cors";
import express from "express";
import { context } from "./graphql/context";

const server = new ApolloServer({
  schema,
  context: context,
  introspection: true,
  cache: "bounded",

});

const app = express();

app.use(cors());

server.start().then(async () => {
  app.get("/", async (req, res) => {
      res.send(200);
  });
  
  server.applyMiddleware({
      app,
      path: "/graphql"
  });

  // listenToChainEvents();

  app.listen({ port: process.env.PORT || 3000 }, async () => {
      console.log(`graphql api running at }/graphql: ${process.env.PORT || 3000}`);
  });
});

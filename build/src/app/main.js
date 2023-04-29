"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
const context_1 = require("./graphql/context");
const schema_1 = require("./graphql/schema");
const server = new apollo_server_1.ApolloServer({
    schema: schema_1.schema,
    context: context_1.context,
    introspection: true, // 1
});
server.listen({ port: process.env.PORT || 3000 }).then(({ url }) => {
    console.log(`graphql api running at ${url}graphql`);
    console.log(`Server ready at ${url}`);
    console.log(`Listening on port ${process.env.PORT || 3000}`);
});

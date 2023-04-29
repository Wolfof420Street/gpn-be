import { ApolloServer } from "apollo-server";
import { context } from "./graphql/context";
import { schema } from "./graphql/schema";



const server = new ApolloServer({
    schema,
    context,
    introspection: true, // 1
});



server.listen({ port: process.env.PORT || 3000 }).then(({ url }) => {
    console.log(`graphql api running at ${url}graphql`);
    console.log(`Server ready at ${url}`);
    console.log(`Listening on port ${process.env.PORT || 3000}`);
});
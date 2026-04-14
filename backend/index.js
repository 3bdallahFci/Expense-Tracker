import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import mergedTypeDefs from "./typedefs/index.js";
import mergedResolvers from "./resolvers/index.js";


const server = new ApolloServer({
    typeDefs: mergedTypeDefs,
    resolvers: mergedResolvers
});

const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 }
});

console.log(`Server is running at ${url}`);
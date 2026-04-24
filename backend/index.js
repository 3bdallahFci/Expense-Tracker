import { ApolloServer } from "@apollo/server";
import express from "express";
import cors from "cors";
import http from "http";
import { expressMiddleware } from "@as-integrations/express5";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import mergedTypeDefs from "./typedefs/index.js";
import mergedResolvers from "./resolvers/index.js";
import dotenv from "dotenv";
import { connectDB } from "./db/connectDb.js";
import passport from "passport";
import session from "express-session";
import ConnectMongo from "connect-mongodb-session";
import { buildContext } from "graphql-passport";
import { passportConfig } from "./passport/passport.config.js";
dotenv.config();
passportConfig();
const app = express();

const httpServer = http.createServer(app);

const MongoStore = ConnectMongo(session);

const store = new MongoStore({
  uri: process.env.MONGO_URI,
  collection: "sessions",
});

store.on("error", function (error) {
  console.log(error);
});

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 day
      httpOnly: true,
    },
  }),
);

app.use(passport.initialize());
app.use(passport.session());

const server = new ApolloServer({
  typeDefs: mergedTypeDefs,
  resolvers: mergedResolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

await server.start();

app.use(
  "/graphql",
  cors({
      origin: "http://localhost:5173",
      credentials: true,
  }),
  express.json(),
  expressMiddleware(server, {
    context: async ({ req,res }) => buildContext({req,res}) ,
  }),
);

await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
await connectDB();

console.log(`🚀 Server ready at http://localhost:4000/graphql`);

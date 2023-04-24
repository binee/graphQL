import { ApolloServer, gql } from "apollo-server";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import mongoose from "mongoose";
import dotenv from "dotenv";
import  typeDefs  from "./graphql/schemaGql.js";
import { resolvers } from "./graphql/resolver.js";

dotenv.config();
const port = process.env.PORT || 9000;

const dburi = process.env.DB_URI;
console.log(dburi)
const db = process.env.DB;

const server = new ApolloServer({
typeDefs,
  resolvers,
  //context: verifyToken,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

server
  .listen({ port })
  .then((serverInfo) => console.log("Server running @ 9000 port"))
  .catch((err) => console.log("Error in running NodeJS"));
  console.log(process.env.MONGO_URL);
//mongodb+srv://root:<password>@cluster0.zkfsvbt.mongodb.net/?retryWrites=true&w=majority
//mongodb+srv://root:12345@cluster0.lu2cove.mongodb.net/gql1?retryWrites=true&w=majority

mongoose.connect('mongodb+srv://root:12345@cluster0.zkfsvbt.mongodb.net/gql?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology:true
})
.then(()=>{
    console.log('Database connected Succesfully')
})
.catch(err => {
    console.error(`${err} Database connection Error sadsa`)
})

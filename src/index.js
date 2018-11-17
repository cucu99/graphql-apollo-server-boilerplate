import 'dotenv/config';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';

const app = express();
TODO:
const schema = gql``;
const resolvers = {};

const server = new ApolloServer({
  typeDefs: schema,
  resolvers
});

server.applyMiddleware({ app, path: '/grqphql' });

app.listen({ port:8000 }, () => {
  console.log('Apollo Server on http://localhost:8000/graphql');
});
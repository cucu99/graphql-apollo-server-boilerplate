import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';

const app = express();

app.use(cors());

const schema = gql`
  type Query {
    users: [User!]
    user(id: ID!): User
    me: User
  }

  type User {
    id: ID!
    username: String!
    firstname: String!
    lastname: String!
    age: Int!
  }
`;

//Temporary data
let users = {
  1: {
    id: '1',
    username: 'Daniel Kirchner',
    firstname: 'Daniel',
    lastname: 'Kirchner',
    age: '32'
  },
  2: {
    id: '2',
    username: 'Teszt Elek',
    firstname: 'Teszt',
    lastname: 'Elek',
    age: '25'
  }
};

const resolvers = {
  Query: {
    users: () => {
      return Object.values(users);
    },
    user: (parent, { id }) => {
      return users[id];
    },
    me: (parent, args, { me }) => {
      return me;
    }
  },

  User: {
    username: user => `${user.firstname}
${user.lastname}`
  }
};

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context: {
    me: users[1]
  }
});

server.applyMiddleware({ app, path: '/graphql' });

app.listen({ port: 8000 }, () => {
  console.log('Apollo Server on http://localhost:8000/graphql');
});

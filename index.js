require('dotenv').config();
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const cors = require('cors');
const express = require('express');
const { prismaClient } = require('./libs/db.js');

const PORT = Number(process.env.PORT) || 4000;

const startServer = async () => {
  const app = express();
  const server = new ApolloServer({
    typeDefs: `
      type Query {
        hello: String
      }

      type Mutation {
        createUser(firstName:String!, lastName:String!, email:String!, password:String!): Boolean
      }
    `,

    resolvers: {
      Query: {
        hello: () => 'I am from gql',
      },

      Mutation: {
        createUser: async (_, { firstName, lastName, email, password }) => {
          await prismaClient.user.create({
            data: {
              firstName,
              lastName,
              email,
              password,
              salt: 'random_salt',
            },
          });

          return true;
        },
      },
    },
  });

  await server.start();

  app.use(express.json());
  app.use(cors());

  app.use('/graphql', expressMiddleware(server));

  app.listen(PORT, () => console.log(`Server is started on PORT: ${PORT}`));
};

startServer();

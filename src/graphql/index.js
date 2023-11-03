const { ApolloServer } = require('@apollo/server');
const { User } = require('./user');

async function createApolloGraphqlServer() {
  const server = new ApolloServer({
    typeDefs: `
      type Query {
        ${User.queries}
      }

      type Mutation {
        ${User.mutations}
      }
    `,

    resolvers: {
      Query: {
        ...User.resolvers.queries,
      },

      Mutation: {
        ...User.resolvers.mutations,
      },
    },
  });

  await server.start();

  return server;
}

module.exports = createApolloGraphqlServer;

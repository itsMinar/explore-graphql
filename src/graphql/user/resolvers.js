const queries = {
  hello: () => 'Hello, I am from GraphQL',
};

const mutations = {
  createUser: async (_, { firstName, lastName, email, password }) => {
    return 'randomid';
  },
};

module.exports.resolvers = { queries, mutations };

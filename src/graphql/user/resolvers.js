const UserService = require('../../services/user');

const queries = {
  getUserToken: async (_, payload) => {
    const token = await UserService.getUserToken(payload);

    return token;
  },
};

const mutations = {
  createUser: async (_, payload) => {
    const res = await UserService.createUser(payload);

    return res.id;
  },
};

module.exports.resolvers = { queries, mutations };

const { mutations } = require('./mutations');
const { queries } = require('./queries');
const { resolvers } = require('./resolvers');
const { typeDefs } = require('./typedef');

module.exports.User = {
  typeDefs,
  queries,
  mutations,
  resolvers,
};

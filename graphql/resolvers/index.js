const timesResolvers = require('./times');
const usersResolvers = require('./users');

module.exports = {
  Query: {
    ...timesResolvers.Query
  },
  Mutation: {
    ...timesResolvers.Mutation,
    ...usersResolvers.Mutation
  }
}
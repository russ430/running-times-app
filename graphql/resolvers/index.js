const timesResolvers = require('./times');
const usersResolvers = require('./users');
const commentsResolvers = require('./comments');

module.exports = {
  Query: {
    ...timesResolvers.Query
  },
  Mutation: {
    ...timesResolvers.Mutation,
    ...usersResolvers.Mutation,
    ...commentsResolvers.Mutation
  }
}
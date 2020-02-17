const timesResolvers = require('./times');
const usersResolvers = require('./users');
const commentsResolvers = require('./comments');
const likesResolvers = require('./likes');

module.exports = {
  Query: {
    ...timesResolvers.Query
  },
  Mutation: {
    ...timesResolvers.Mutation,
    ...usersResolvers.Mutation,
    ...commentsResolvers.Mutation,
    ...likesResolvers.Mutation
  }
}
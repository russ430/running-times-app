const { gql } = require('apollo-server');

module.exports = gql`
  type Time {
    id: ID!
    time: String!
    miles: String!
    body: String!
    createdAt: String!
    username: String!
    comments: [Comment]!
    likes: [Like]!
    likeCount: Int!
    commentsCount: Int!
  }
  type Comment {
    id: ID!
    createdAt: String!
    username: String!
    body: String!
  }
  type Like {
    id: ID!
    createdAt: String!
    username: String!
  }
  type Query {
    getTimes: [Time]
    getTime(timeId: ID!): Time
  }
`;
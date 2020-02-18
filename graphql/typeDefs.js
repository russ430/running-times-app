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
    commentCount: Int!
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
  type User {
    id: ID!
    name: String!
    email: String!
    token: String!
    username: String!
    createdAt: String!  
  }
  input RegisterInput {
    name: String!
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
  }
  type Query {
    getTimes: [Time]
    getTime(timeId: ID!): Time
  }
  type Mutation {
    register(registerInput: RegisterInput): User!
    login(username: String!, password: String!): User!
    postTime(time: String!, miles: String!, body: String!): Time!
    deleteTime(timeId: ID!): String!
    postComment(timeId: String!, body: String!): Comment!
    deleteComment(timeId: String!, commentId: String!): Time!
    likeTime(timeId: ID!): Time!
  }
`;
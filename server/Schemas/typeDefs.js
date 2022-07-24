const { gql } = require('apollo-server-express');

const typeDefs = gql`
type Query {
    me: user
}
type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(savedBooks: BookInput!): User
    removeBook(bookId: String!): User
}
type User {
    _id: ID
    username: String
    email: String
    bookCount: Int
    savedBooks: [Kook]
}
type Book {
    bookId: ID
    authors: [String]
    description: String
    title: String
    image: String
    link: String
}
type BookInput {
    bookId: String
    authors: [String]
    description: String
    title: String
    image: String
    link: String
}
type Auth {
    token: ID!
    user: User
}`;

module.exports = typeDefs;
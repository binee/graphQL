import { gql } from "apollo-server";

import Book from '../models/books.js'
import User from '../models/users.js'


const typeDefs = gql`
  type Query {
    users:[User]
    user(_id:ID!):User
    books:[BookAndUser]
    userBook(userId:ID!):[Book]
    bookByID(_id:ID!):Book
  }


  type BookAndUser{
    _id:ID
    bookName:String
    description:String
    userId:[IdName]
  }

  type IdName{
    _id:ID
    username:String
  }


  type User{
    _id:ID!
    username:String!
    email:String!,
    books:[Book]

  }
  type Book{
    _id: ID
    bookName:String!
    description:String!
    userId:ID!
  }
  
  
  type Mutation{
    registerUser(userInput:userPayload!): User
    loginUser(userSignin:userSigninInfo!): Token
    createBook(bookInput:bookPayload!):BookAndUser
    updateBook(_id: ID!, input: bookUpdate!): Book
    deleteBook(_id: ID!) : Book
  }
  
  input bookPayload{
    bookName:String!
    description:String!
    userId:ID!
  }

  input bookUpdate{
    bookName:String!
    description:String!
  }

  type Token{
    token:String!
  }

  input userSigninInfo{
    email:String!
    password:String!
  }
  
  input userPayload{
    username: String!
    email: String!
    password: String!
  }
`;

export default typeDefs;

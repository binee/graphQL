import {gql} from '@apollo/client';

export const REGISTER_USER = gql`
mutation createUser($userInput:userPayload!){
    registerUser(userInput: $userInput){
      _id
      email
      username
    }
  }
  `
  export const LOGIN_USER = gql`
  mutation login($userSignin:userSigninInfo!){
    loginUser(userSignin:$userSignin){
      token
      
    }
  }`

  export const CREATE_BOOK = gql`
  mutation bookCreate ($bookInput : bookPayload!){
    createBook(bookInput :$bookInput){
      _id,
      bookName
    }
  }`

  export const UPDATE_BOOK = gql`
  mutation update ($input : bookUpdate!, $bookId: ID!){
    updateBook(_id: $bookId,input :$input){
      bookName,
      description
    }
  }`

  export const DELETE_BOOK =gql`
  mutation deleteBookID($bookId: ID!){
    deleteBook(_id:$bookId){
      _id
    }
  }
  `
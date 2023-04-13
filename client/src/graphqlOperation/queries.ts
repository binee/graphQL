import {gql} from '@apollo/client';

export const GET_ALL_BOOKS = gql`
query getAllBook{
    books{
      _id
      bookName
      description
     userId  {
      _id
      username
    }
    }
  }
`;


  export const GET_BOOK_BY_USER = gql`
  query bookByUser($userId: ID!) {
    userBook(userId: $userId) {
      _id
      bookName
      description
    }
  }
`;
export const GET_BOOK_BY_ID = gql`
query getOneBook($bookId : ID!){
  book : bookByID(_id: $bookId){
    bookName
    description
  }
}`;

export const GET_ALL_USER = gql`
query getAllUser {
  users{
    _id
    username
    email,
    books{
      _id,
      bookName
    }
  }
}`
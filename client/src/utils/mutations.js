import { gql } from '@apollo/client';

const LOGIN_USER = gql`
mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
        token
        user {
            _id
            username
        }
    }
}`;

const ADD_USER = gql`
mutation addUser($useranme: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
        token
        user {
            _id
            username
        }
    }
}`;

const SAVE_BOOK = gql`
mutation saveBook($book: BookInput!) {
    saveBook(book: $book) {
        _id
        username
        email
        bookCount
        savedBooks {
            _id
            authors
            description
            bookId
            title
            link
            image
        }
    }
}`;

const REMOVE_BOOK = gql`
mutation removeBook($bookId: String!) {
    removeBook(bookId: $bookId) {
        _id
        username
        email
        bookCount
        savedBooks {
            _id
            authors
            description
            bookId
            title
            link
            image
        }
    }
}`;

export { LOGIN_USER, ADD_USER, SAVE_BOOK, REMOVE_BOOK };
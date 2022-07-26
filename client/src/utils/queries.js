import { gql } from '@apollo/client';

export const GET_ME = gql`{
    me {
        _id
        username
        email
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
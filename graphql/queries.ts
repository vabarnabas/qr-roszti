import { gql } from "urql"

export const queryUsers = gql`
  query queryUsers {
    users_aggregate {
      nodes {
        id
        role
        code
        email
        displayname
        createdat
      }
    }
  }
`

export const queryEvents = gql`
  query queryEvents {
    events_aggregate {
      nodes {
        createdby
        deadline
        description
        displayname
        eventlocation
        eventdate
        eventtype
        id
        user {
          displayname
          email
        }
      }
    }
  }
`

export const queryUserByEmail = gql`
  query queryUserByEmail($_eq: String!) {
    users(where: { email: { _eq: $_eq } }) {
      id
      password
      email
    }
  }
`

export const queryUserById = gql`
  query queryUserById($id: uuid!) {
    users_by_pk(id: $id) {
      code
      createdat
      displayname
      email
      googleid
      id
      password
      role
    }
  }
`

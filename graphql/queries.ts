import { gql } from "urql"

export const queryUsers = gql`
  query queryUsers {
    users_aggregate {
      nodes {
        id
        role
        googleid
        email
        displayname
        createdat
      }
    }
  }
`

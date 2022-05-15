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

import { gql } from "urql"

export const mutateNewUser = gql`
  mutation mutateNewUser(
    $id: uuid!
    $displayname: String!
    $email: String!
    $role: String!
    $code: String!
    $password: String!
  ) {
    insert_users_one(
      object: {
        id: $id
        displayname: $displayname
        email: $email
        role: $role
        code: $code
        password: $password
      }
    ) {
      id
    }
  }
`

export const mutateDeleteUser = gql`
  mutation mutateDeleteUser($id: uuid!) {
    delete_users_by_pk(id: $id) {
      id
    }
  }
`

export const mutateDeleteEvent = gql`
  mutation mutateDeleteEvent($id: uuid!) {
    delete_events_by_pk(id: $id) {
      id
    }
  }
`

export const mutateUpdateUser = gql`
  mutation mutateUpdateUser(
    $id: uuid!
    $email: String!
    $displayname: String!
  ) {
    update_users_by_pk(
      pk_columns: { id: $id }
      _set: { email: $email, displayname: $displayname }
    ) {
      displayname
      email
      password
    }
  }
`

export const mutateUpdateUserPassword = gql`
  mutation mutateUpdateUserPassword($id: uuid!, $password: String!) {
    update_users_by_pk(pk_columns: { id: $id }, _set: { password: $password }) {
      displayname
      email
      password
    }
  }
`

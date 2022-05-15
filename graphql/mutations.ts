import { gql } from "urql"

export const mutateNewUser = gql`
  mutation mutateNewUser(
    $id: uuid = ""
    $googleid: String = ""
    $displayname: String = ""
    $email: String = ""
    $role: String = ""
    $code: String = ""
  ) {
    insert_users_one(
      object: {
        id: $id
        googleid: $googleid
        displayname: $displayname
        email: $email
        role: $role
        code: $code
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

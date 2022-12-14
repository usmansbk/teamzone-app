import { gql } from "src/__generated__";

export default gql(`
mutation DeleteMeeting($id: ID!, $reason: NonEmptyString) {
  deleteMeeting(id: $id, reason: $reason) {
    id
  }
}
`);

import { gql } from "src/__generated__";

export default gql(`
mutation DeleteMeeting($id: ID!) {
  deleteMeeting(id: $id) {
    id
  }
}
`);

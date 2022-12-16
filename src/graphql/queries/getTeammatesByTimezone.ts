import { gql } from "src/__generated__";

export default gql(`
query GetTeammatesByTimezone($id: ID!) {
  getTeammatesByTimezone(id: $id) {
    id
    member {
      id
      fullName
      picture
    }
  }
}
`);

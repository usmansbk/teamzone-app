import { gql } from "src/__generated__";

export default gql(`
mutation UnpinTeam($id: ID!) {
  unpinTeam(id: $id) {
    id
    isPinned
  }
}
`);

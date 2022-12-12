import { gql } from "src/__generated__";

export default gql(`
mutation PinTeam($id: ID!) {
  pinTeam(id: $id) {
    id
    isPinned
  }
}
`);

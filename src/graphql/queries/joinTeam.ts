import { gql } from "src/__generated__";

export default gql(`
mutation JoinTeam($inviteCode: ID!) {
  joinTeam(inviteCode: $inviteCode) {
		id
		name
  }
}
`);

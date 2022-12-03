import { gql } from "src/__generated__";

export default gql(`
	mutation RemoveTeamMemberFromAdmin($memberId: ID!) {
		removeTeamMemberFromAdmin(memberId: $memberId) {
			id
			role
		}
	}
`);

import { gql } from "src/__generated__";

export default gql(`
	mutation AddTeamMemberToAdmin($memberId: ID!) {
		addTeamMemberToAdmin(memberId: $memberId) {
			id
			role
			team {
				id
				isAdmin
			}
		}
	}`);

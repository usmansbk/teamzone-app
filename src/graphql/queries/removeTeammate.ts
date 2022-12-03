import { gql } from "src/__generated__";

export default gql(`
	mutation RemoveTeammate($memberId: ID!) {
		removeTeammate(memberId: $memberId) {
			id
		}
	}
`);

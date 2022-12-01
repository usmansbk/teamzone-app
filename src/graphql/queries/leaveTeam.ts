import { gql } from "src/__generated__";

export default gql(`
	mutation LeaveTeam($teamId: ID!) {
		leaveTeam(teamId: $teamId) {
			id
			teamId
			memberId
		}
	}
`);

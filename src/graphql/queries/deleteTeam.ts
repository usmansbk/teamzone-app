import { gql } from "src/__generated__";

export default gql(`
	mutation DeleteTeam($id: ID!) {
		deleteTeam(teamId: $id) {
			id
		}
	}
`);

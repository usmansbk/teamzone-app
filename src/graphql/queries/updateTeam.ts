import { gql } from "src/__generated__";

export default gql(`
	mutation UpdateTeam($input: UpdateTeamInput!) {
		updateTeam(input: $input) {
			id
			name
		}
	}
`);

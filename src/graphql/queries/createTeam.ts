import { gql } from "src/__generated__";

export default gql(`
	mutation CreateTeam($input: CreateTeamInput!) {
		createTeam(input: $input) {
			id
			name
			logo
			isOwner
			owner {
				id
			}
		}
	}
`);

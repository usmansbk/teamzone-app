import { gql } from "src/__generated__";

export default gql(`
	query GetTeamPreviewByCode($code: ID!) {
		getTeamPreviewByCode(code: $code)
	}
`);

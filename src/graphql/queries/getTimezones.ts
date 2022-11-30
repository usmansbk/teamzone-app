import { gql } from "src/__generated__";

export default gql(`
	query Timezones {
		timezones {
			name
			alternativeName
		}
	}
`);

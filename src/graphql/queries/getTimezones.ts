import { gql } from "src/__generated__";

export default gql(`
	query Timezones {
		timezones {
			name
			abbreviation
			alternativeName
			countryCode
			countryName
			countryFlag
			mainCities
		}
	}
`);

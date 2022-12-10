import { gql } from "src/__generated__";

export default gql(`
	mutation UpdateProfile($input: UpdateUserProfileInput!) {
		updateProfile(input: $input) {
			id
			fullName
			firstName
			lastName
			locale
			timezone
			updatedAt
			tzData {
				name
				countryName
			}
		}
	}
`);

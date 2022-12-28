import { gql } from "src/__generated__";

export default gql(`
	mutation CreateTeam($input: CreateTeamInput!) {
		createTeam(input: $input) {
			id
			name
			logo
			isOwner
			isMember
			isAdmin
			isPinned
			inviteCode
			owner {
				id
				fullName
				picture
				isMe
			}
			teammates {
				id
				isMe
				role
				member {
					id
					fullName
					isMe
					picture
					timezone
					tzData {
						name
						countryName
						mainCities
						alternativeName
						abbreviation
					}
				}
			}
		}
	}
`);

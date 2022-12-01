import { gql } from "src/__generated__";

export default gql(`
	query Query($id: ID!) {
		getTeamById(id: $id) {
			id
			name
			logo
			isOwner
			isMember
			inviteCode
			createdAt
			updatedAt
			owner {
				id
				fullName
				picture
				isMe
			}
			teammates {
				id
				isMe
				joinedAt
				role
				member {
					id
					fullName
					isMe
					picture
					tzData {
						name
						abbreviation
						alternativeName
						continentCode
						continentName
						countryCode
						countryName
						currentTimeFormat
						currentTimeOffsetInMinutes
						group
						mainCities
						rawFormat
						rawOffsetInMinutes
					}
				}
			}
		}
	}
`);

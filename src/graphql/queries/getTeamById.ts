import { gql } from "src/__generated__";

export default gql(`
	query Query($id: ID!) {
		getTeamById(id: $id) {
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
						countryCode
						countryName
						mainCities
					}
				}
			}
		}
	}
`);

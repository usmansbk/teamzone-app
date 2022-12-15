import { gql } from "src/__generated__";

export default gql(`
mutation JoinTeam($inviteCode: ID!) {
  joinTeam(inviteCode: $inviteCode) {
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

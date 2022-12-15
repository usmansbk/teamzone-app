import { gql } from "src/__generated__";

export default gql(`
	mutation CreateTeam($input: CreateTeamInput!) {
		createTeam(input: $input) {
      id
      name
			isPinned
      isAdmin
      isOwner
			owner {
				id
			}
      teammates {
        id
        member {
          id
          fullName
          picture
			  	timezone
          tzData {
            name
            alternativeName
            countryCode
            countryName
            mainCities
          }
        }
      }
		}
	}
`);

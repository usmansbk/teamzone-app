import { gql } from "src/__generated__";

export default gql(`
  query Me {
    me {
      id
      fullName
      firstName
      lastName
      email
      locale
      timezone
      picture
      teams {
        id
        name
			  isPinned
        isAdmin
        isOwner
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
      createdTeams {
        id
        name
        logo
      }
      tzData {
        name
        countryCode
        countryName
        mainCities
      }
    }
  }
`);

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
        teammates {
          id
          member {
            id
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

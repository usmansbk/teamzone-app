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
      updatedAt
      teams {
        id
        name
        logo
      }
      createdTeams {
        id
        name
        logo
      }
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
`);

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

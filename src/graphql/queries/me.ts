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
        isOwner
        isMember
        isAdmin
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
              countryCode
              countryName
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
        abbreviation
        alternativeName
        countryCode
        countryName
      }
    }
  }
`);

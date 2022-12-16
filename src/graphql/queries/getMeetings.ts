import { gql } from "src/__generated__";

export default gql(`
query GetMeetings($sort: MeetingSort) {
  getMeetings(sort: $sort) {
    cursor
    meetings {
      id
      title
      from
      to
      timezone
      updatedAt
      createdAt
      description
      isOwner
      owner {
        id
        fullName
        picture
        isMe
      }
      teams {
        id
        name
        logo
        teammates {
          id
          member {
            id
            fullName
            picture
            timezone
            tzData {
              name
              abbreviation
              countryName
              alternativeName
            }
          }
        }
      }
    }
  }
}
`);

import { gql } from "src/__generated__";

export default gql(`
mutation CreateMeeting($input: CreateMeetingInput!) {
  createMeeting(input: $input) {
    id
    title
    timezone
    from
    to
    description
    isOwner
    owner {
      id
      fullName
      picture
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
          tzData {
            alternativeName
            countryName
            name
          }
        }
      }
    }
  }
}
`);

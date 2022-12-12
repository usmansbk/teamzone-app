import { gql } from "src/__generated__";

export default gql(`
mutation UpdateMeeting($input: UpdateMeetingInput!) {
  updateMeeting(input: $input) {
    id
    title
    timezone
    from
    to
    description
    isOwner
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

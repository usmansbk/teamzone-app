import { gql } from "src/__generated__";

export default gql(`
query GetMeetings {
  getMeetings {
    cursor
    meetings {
      id
      title
      from
      to
      timezone
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
}
`);

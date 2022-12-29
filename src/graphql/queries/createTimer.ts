import { gql } from "src/__generated__";

export default gql(`
mutation CreateTimer($input: CreateTimerInput!) {
  createTimer(input: $input) {
    id
    title
    timezone
    dateTime
    description
    direction
    durationInMinutes
    createdAt
    isOwner
    owner {
      id
      fullName
      picture
    }
    type
    updatedAt
    repeat {
      freq
      interval
    }
    startAt
    teams {
      id
      name
    }
  }
}
`);

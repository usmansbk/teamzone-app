import { gql } from "src/__generated__";

export default gql(`
mutation UpdateTimer($input: UpdateTimerInput!) {
  updateTimer(input: $input) {
    id
    title
    type
    timezone
    createdAt
    updatedAt
    dateTime
    description
    direction
    durationInMinutes
    isOwner
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
}`);

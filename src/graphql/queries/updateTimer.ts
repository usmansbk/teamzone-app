import { gql } from "src/__generated__";

export default gql(`
mutation UpdateTimer($input: UpdateTimerInput!) {
  updateTimer(input: $input) {
    id
    title
    type
    dateTime
    duration
    direction
    timezone
    createdAt
    updatedAt
    description
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

import { gql } from "src/__generated__";

export default gql(`
mutation UpdateTimer($input: UpdateTimerInput!) {
  updateTimer(input: $input) {
    id
    title
    type
    direction
    dateTime
    duration
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

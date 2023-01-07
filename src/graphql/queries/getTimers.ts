import { gql } from "src/__generated__";

export default gql(`
query GetTimers($state: TimerState) {
  getTimers(state: $state) {
    cursor
    timers {
      id
      title
      type
      duration
      direction
      description
      dateTime
      createdAt
      updatedAt
      timezone
      isOwner
      owner {
        id
        fullName
        picture
      }
      startAt
      repeat {
        freq
        interval
      }
      teams {
        id
        name
        teammates {
          id
          role
          member {
            id
            fullName
            picture
            timezone
          }
        }
      }
    }
  }
}
`);

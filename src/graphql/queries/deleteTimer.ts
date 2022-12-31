import { gql } from "src/__generated__";

export default gql(`
mutation DeleteTimer($deleteTimerId: ID!, $reason: NonEmptyString) {
  deleteTimer(id: $deleteTimerId, reason: $reason) {
    id
  }
}`);

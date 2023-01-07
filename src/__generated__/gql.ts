/* eslint-disable */
import * as types from "./graphql";
import type { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel-plugin for production.
 */
const documents = {
  "\nmutation CreateMeeting($input: CreateMeetingInput!) {\n  createMeeting(input: $input) {\n    id\n    title\n    from\n    to\n    timezone\n    updatedAt\n    createdAt\n    description\n    isOwner\n    repeat {\n      freq\n      interval\n    }\n    owner {\n      id\n      fullName\n      picture\n      isMe\n    }\n    teams {\n      id\n      name\n      logo\n      teammates {\n        id\n        member {\n          id\n          fullName\n          picture\n          timezone\n          tzData {\n\t\t\t\t\t\tname\n            abbreviation\n            countryName\n            alternativeName\n          }\n        }\n      }\n    }\n  }\n}\n":
    types.CreateMeetingDocument,
  "\n\tmutation CreateTeam($input: CreateTeamInput!) {\n\t\tcreateTeam(input: $input) {\n\t\t\tid\n\t\t\tname\n\t\t\tlogo\n\t\t\tisOwner\n\t\t\tisMember\n\t\t\tisAdmin\n\t\t\tisPinned\n\t\t\tinviteCode\n\t\t\towner {\n\t\t\t\tid\n\t\t\t\tfullName\n\t\t\t\tpicture\n\t\t\t\tisMe\n\t\t\t}\n\t\t\tteammates {\n\t\t\t\tid\n\t\t\t\tisMe\n\t\t\t\trole\n\t\t\t\tmember {\n\t\t\t\t\tid\n\t\t\t\t\tfullName\n\t\t\t\t\tisMe\n\t\t\t\t\tpicture\n\t\t\t\t\ttimezone\n\t\t\t\t\ttzData {\n\t\t\t\t\t\tname\n\t\t\t\t\t\tcountryName\n\t\t\t\t\t\tmainCities\n\t\t\t\t\t\talternativeName\n\t\t\t\t\t\tabbreviation\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n":
    types.CreateTeamDocument,
  "\nmutation CreateTimer($input: CreateTimerInput!) {\n  createTimer(input: $input) {\n    id\n    title\n    timezone\n    description\n    type\n    dateTime\n    duration\n    createdAt\n    isOwner\n    owner {\n      id\n      fullName\n      picture\n    }\n    type\n    updatedAt\n    repeat {\n      freq\n      interval\n    }\n    startAt\n    teams {\n      id\n      name\n    }\n  }\n}\n":
    types.CreateTimerDocument,
  "\nmutation DeleteMeeting($id: ID!, $reason: NonEmptyString) {\n  deleteMeeting(id: $id, reason: $reason) {\n    id\n  }\n}\n":
    types.DeleteMeetingDocument,
  "\n\tmutation DeleteTeam($id: ID!) {\n\t\tdeleteTeam(teamId: $id) {\n\t\t\tid\n\t\t}\n\t}\n":
    types.DeleteTeamDocument,
  "\nmutation DeleteTimer($deleteTimerId: ID!, $reason: NonEmptyString) {\n  deleteTimer(id: $deleteTimerId, reason: $reason) {\n    id\n  }\n}":
    types.DeleteTimerDocument,
  "\nquery GetMeetingById($id: ID!) {\n  getMeetingById(id: $id) {\n    id\n    title\n    from\n    to\n    timezone\n    updatedAt\n    createdAt\n    description\n    isOwner\n    repeat {\n      freq\n      interval\n    }\n    owner {\n      id\n      fullName\n      picture\n      isMe\n    }\n    teams {\n      id\n      name\n      logo\n      teammates {\n        id\n        member {\n          id\n          fullName\n          picture\n          timezone\n          tzData {\n\t\t\t\t\t\tname\n            abbreviation\n            countryName\n            alternativeName\n          }\n        }\n      }\n    }\n  }\n}\n":
    types.GetMeetingByIdDocument,
  "\nquery GetMeetings($sort: MeetingSort) {\n  getMeetings(sort: $sort) {\n    cursor\n    meetings {\n      id\n      title\n      from\n      to\n      timezone\n      updatedAt\n      createdAt\n      description\n      isOwner\n      repeat {\n        freq\n        interval\n      }\n      owner {\n        id\n        fullName\n        picture\n        isMe\n      }\n      teams {\n        id\n        name\n        logo\n        teammates {\n          id\n          member {\n            id\n            fullName\n            picture\n            timezone\n            tzData {\n              name\n              abbreviation\n              countryName\n              alternativeName\n            }\n          }\n        }\n      }\n    }\n  }\n}\n":
    types.GetMeetingsDocument,
  "\n\tquery Query($id: ID!) {\n\t\tgetTeamById(id: $id) {\n\t\t\tid\n\t\t\tname\n\t\t\tlogo\n\t\t\tisOwner\n\t\t\tisMember\n\t\t\tisAdmin\n\t\t\tisPinned\n\t\t\tinviteCode\n\t\t\towner {\n\t\t\t\tid\n\t\t\t\tfullName\n\t\t\t\tpicture\n\t\t\t\tisMe\n\t\t\t}\n\t\t\tteammates {\n\t\t\t\tid\n\t\t\t\tisMe\n\t\t\t\trole\n\t\t\t\tmember {\n\t\t\t\t\tid\n\t\t\t\t\tfullName\n\t\t\t\t\tisMe\n\t\t\t\t\tpicture\n\t\t\t\t\ttimezone\n\t\t\t\t\ttzData {\n\t\t\t\t\t\tname\n\t\t\t\t\t\tcountryName\n\t\t\t\t\t\tmainCities\n\t\t\t\t\t\talternativeName\n\t\t\t\t\t\tabbreviation\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n":
    types.QueryDocument,
  "\n\tquery GetTeamPreviewByCode($code: ID!) {\n\t\tgetTeamPreviewByCode(code: $code)\n\t}\n":
    types.GetTeamPreviewByCodeDocument,
  "\nquery GetTimezoneById($id: ID!) {\n  getTimezoneById(id: $id) {\n    name\n    countryName\n    abbreviation\n    alternativeName\n    mainCities\n  }\n}\n":
    types.GetTimezoneByIdDocument,
  "\nquery GetTimerById($id: ID!) {\n  getTimerById(id: $id) {\n\t\tid\n\t\ttitle\n\t\ttype\n\t\tduration\n\t\tdirection\n\t\tdescription\n\t\tdateTime\n\t\tcreatedAt\n\t\tupdatedAt\n\t\ttimezone\n\t\tisOwner\n\t\towner {\n\t\t\tid\n\t\t\tfullName\n\t\t\tpicture\n\t\t}\n\t\tstartAt\n\t\trepeat {\n\t\t\tfreq\n\t\t\tinterval\n\t\t}\n\t\tteams {\n\t\t\tid\n\t\t\tname\n\t\t\tteammates {\n\t\t\t\tid\n\t\t\t\trole\n\t\t\t\tmember {\n\t\t\t\t\tid\n\t\t\t\t\tfullName\n\t\t\t\t\tpicture\n\t\t\t\t\ttimezone\n\t\t\t\t}\n\t\t\t}\n\t\t}\n  }\n}":
    types.GetTimerByIdDocument,
  "\nquery GetTimers($state: TimerState) {\n  getTimers(state: $state) {\n    cursor\n    timers {\n      id\n      title\n      type\n      duration\n      direction\n      description\n      dateTime\n      createdAt\n      updatedAt\n      timezone\n      isOwner\n      owner {\n        id\n        fullName\n        picture\n      }\n      startAt\n      repeat {\n        freq\n        interval\n      }\n      teams {\n        id\n        name\n        teammates {\n          id\n          role\n          member {\n            id\n            fullName\n            picture\n            timezone\n          }\n        }\n      }\n    }\n  }\n}\n":
    types.GetTimersDocument,
  "\n\tquery Timezones {\n\t\ttimezones {\n\t\t\tname\n\t\t\tabbreviation\n\t\t\talternativeName\n\t\t\tcountryCode\n\t\t\tcountryName\n\t\t\tcountryFlag\n\t\t\tmainCities\n\t\t}\n\t}\n":
    types.TimezonesDocument,
  "\nmutation JoinTeam($inviteCode: ID!) {\n  joinTeam(inviteCode: $inviteCode) {\n\t\tid\n\t\tname\n\t\tlogo\n\t\tisOwner\n\t\tisMember\n\t\tisAdmin\n\t\tisPinned\n\t\tinviteCode\n\t\towner {\n\t\t\tid\n\t\t\tfullName\n\t\t\tpicture\n\t\t\tisMe\n\t\t}\n\t\tteammates {\n\t\t\tid\n\t\t\tisMe\n\t\t\trole\n\t\t\tmember {\n\t\t\t\tid\n\t\t\t\tfullName\n\t\t\t\tisMe\n\t\t\t\tpicture\n\t\t\t\ttimezone\n\t\t\t\ttzData {\n\t\t\t\t\tname\n\t\t\t\t\tcountryCode\n\t\t\t\t\tcountryName\n\t\t\t\t\tmainCities\n\t\t\t\t}\n\t\t\t}\n\t\t}\n  }\n}\n":
    types.JoinTeamDocument,
  "\n\tmutation LeaveTeam($teamId: ID!) {\n\t\tleaveTeam(teamId: $teamId) {\n\t\t\tid\n\t\t\tisMember\n\t\t}\n\t}\n":
    types.LeaveTeamDocument,
  "\n  mutation LoginWithSocialProvider($input: SocialLoginInput!) {\n    loginWithSocialProvider(input: $input) {\n      token\n    }\n  }\n":
    types.LoginWithSocialProviderDocument,
  "\n\tmutation AddTeamMemberToAdmin($memberId: ID!) {\n\t\taddTeamMemberToAdmin(memberId: $memberId) {\n\t\t\tid\n\t\t\trole\n\t\t\tteam {\n\t\t\t\tid\n\t\t\t\tisAdmin\n\t\t\t}\n\t\t}\n\t}":
    types.AddTeamMemberToAdminDocument,
  "\n\tmutation RemoveTeamMemberFromAdmin($memberId: ID!) {\n\t\tremoveTeamMemberFromAdmin(memberId: $memberId) {\n\t\t\tid\n\t\t\trole\n\t\t\tteam {\n\t\t\t\tid\n\t\t\t\tisAdmin\n\t\t\t}\n\t\t}\n\t}\n":
    types.RemoveTeamMemberFromAdminDocument,
  "\n  query Me {\n    me {\n      id\n      fullName\n      firstName\n      lastName\n      email\n      locale\n      timezone\n      picture\n      teams {\n        id\n        name\n        logo\n        isOwner\n        isMember\n        isAdmin\n        isPinned\n        inviteCode\n        owner {\n          id\n          fullName\n          picture\n          isMe\n        }\n        teammates {\n          id\n          isMe\n          role\n          member {\n            id\n            fullName\n            isMe\n            picture\n            timezone\n            tzData {\n              name\n              countryName\n              mainCities\n              alternativeName\n              abbreviation\n            }\n          }\n        }\n      }\n      createdTeams {\n        id\n        name\n        logo\n      }\n      tzData {\n        name\n        countryCode\n        countryName\n        mainCities\n      }\n    }\n  }\n":
    types.MeDocument,
  "\nmutation PinTeam($id: ID!) {\n  pinTeam(id: $id) {\n    id\n    isPinned\n  }\n}\n":
    types.PinTeamDocument,
  "\n\tmutation RemoveTeammate($memberId: ID!) {\n\t\tremoveTeammate(memberId: $memberId) {\n\t\t\tid\n\t\t}\n\t}\n":
    types.RemoveTeammateDocument,
  "\nmutation UnpinTeam($id: ID!) {\n  unpinTeam(id: $id) {\n    id\n    isPinned\n  }\n}\n":
    types.UnpinTeamDocument,
  "\nmutation UpdateMeeting($input: UpdateMeetingInput!) {\n  updateMeeting(input: $input) {\n    id\n    title\n    timezone\n    from\n    to\n    description\n    isOwner\n    repeat {\n      freq\n      interval\n    }\n    teams {\n      id\n      name\n      logo\n      teammates {\n        id\n        member {\n          id\n          fullName\n          picture\n          tzData {\n            alternativeName\n            countryName\n            name\n          }\n        }\n      }\n    }\n  }\n}\n":
    types.UpdateMeetingDocument,
  "\n\tmutation UpdateProfile($input: UpdateUserProfileInput!) {\n\t\tupdateProfile(input: $input) {\n\t\t\tid\n\t\t\tfullName\n\t\t\tfirstName\n\t\t\tlastName\n\t\t\tlocale\n\t\t\ttimezone\n\t\t\tupdatedAt\n\t\t\ttzData {\n\t\t\t\tname\n\t\t\t\tcountryName\n\t\t\t}\n\t\t}\n\t}\n":
    types.UpdateProfileDocument,
  "\n\tmutation UpdateTeam($input: UpdateTeamInput!) {\n\t\tupdateTeam(input: $input) {\n\t\t\tid\n\t\t\tname\n\t\t}\n\t}\n":
    types.UpdateTeamDocument,
  "\nmutation UpdateTimer($input: UpdateTimerInput!) {\n  updateTimer(input: $input) {\n    id\n    title\n    type\n    dateTime\n    duration\n    timezone\n    createdAt\n    updatedAt\n    description\n    isOwner\n    repeat {\n      freq\n      interval\n    }\n    startAt\n    teams {\n      id\n      name\n    }\n  }\n}":
    types.UpdateTimerDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 **/
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\nmutation CreateMeeting($input: CreateMeetingInput!) {\n  createMeeting(input: $input) {\n    id\n    title\n    from\n    to\n    timezone\n    updatedAt\n    createdAt\n    description\n    isOwner\n    repeat {\n      freq\n      interval\n    }\n    owner {\n      id\n      fullName\n      picture\n      isMe\n    }\n    teams {\n      id\n      name\n      logo\n      teammates {\n        id\n        member {\n          id\n          fullName\n          picture\n          timezone\n          tzData {\n\t\t\t\t\t\tname\n            abbreviation\n            countryName\n            alternativeName\n          }\n        }\n      }\n    }\n  }\n}\n"
): typeof documents["\nmutation CreateMeeting($input: CreateMeetingInput!) {\n  createMeeting(input: $input) {\n    id\n    title\n    from\n    to\n    timezone\n    updatedAt\n    createdAt\n    description\n    isOwner\n    repeat {\n      freq\n      interval\n    }\n    owner {\n      id\n      fullName\n      picture\n      isMe\n    }\n    teams {\n      id\n      name\n      logo\n      teammates {\n        id\n        member {\n          id\n          fullName\n          picture\n          timezone\n          tzData {\n\t\t\t\t\t\tname\n            abbreviation\n            countryName\n            alternativeName\n          }\n        }\n      }\n    }\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n\tmutation CreateTeam($input: CreateTeamInput!) {\n\t\tcreateTeam(input: $input) {\n\t\t\tid\n\t\t\tname\n\t\t\tlogo\n\t\t\tisOwner\n\t\t\tisMember\n\t\t\tisAdmin\n\t\t\tisPinned\n\t\t\tinviteCode\n\t\t\towner {\n\t\t\t\tid\n\t\t\t\tfullName\n\t\t\t\tpicture\n\t\t\t\tisMe\n\t\t\t}\n\t\t\tteammates {\n\t\t\t\tid\n\t\t\t\tisMe\n\t\t\t\trole\n\t\t\t\tmember {\n\t\t\t\t\tid\n\t\t\t\t\tfullName\n\t\t\t\t\tisMe\n\t\t\t\t\tpicture\n\t\t\t\t\ttimezone\n\t\t\t\t\ttzData {\n\t\t\t\t\t\tname\n\t\t\t\t\t\tcountryName\n\t\t\t\t\t\tmainCities\n\t\t\t\t\t\talternativeName\n\t\t\t\t\t\tabbreviation\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"
): typeof documents["\n\tmutation CreateTeam($input: CreateTeamInput!) {\n\t\tcreateTeam(input: $input) {\n\t\t\tid\n\t\t\tname\n\t\t\tlogo\n\t\t\tisOwner\n\t\t\tisMember\n\t\t\tisAdmin\n\t\t\tisPinned\n\t\t\tinviteCode\n\t\t\towner {\n\t\t\t\tid\n\t\t\t\tfullName\n\t\t\t\tpicture\n\t\t\t\tisMe\n\t\t\t}\n\t\t\tteammates {\n\t\t\t\tid\n\t\t\t\tisMe\n\t\t\t\trole\n\t\t\t\tmember {\n\t\t\t\t\tid\n\t\t\t\t\tfullName\n\t\t\t\t\tisMe\n\t\t\t\t\tpicture\n\t\t\t\t\ttimezone\n\t\t\t\t\ttzData {\n\t\t\t\t\t\tname\n\t\t\t\t\t\tcountryName\n\t\t\t\t\t\tmainCities\n\t\t\t\t\t\talternativeName\n\t\t\t\t\t\tabbreviation\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\nmutation CreateTimer($input: CreateTimerInput!) {\n  createTimer(input: $input) {\n    id\n    title\n    timezone\n    description\n    type\n    dateTime\n    duration\n    createdAt\n    isOwner\n    owner {\n      id\n      fullName\n      picture\n    }\n    type\n    updatedAt\n    repeat {\n      freq\n      interval\n    }\n    startAt\n    teams {\n      id\n      name\n    }\n  }\n}\n"
): typeof documents["\nmutation CreateTimer($input: CreateTimerInput!) {\n  createTimer(input: $input) {\n    id\n    title\n    timezone\n    description\n    type\n    dateTime\n    duration\n    createdAt\n    isOwner\n    owner {\n      id\n      fullName\n      picture\n    }\n    type\n    updatedAt\n    repeat {\n      freq\n      interval\n    }\n    startAt\n    teams {\n      id\n      name\n    }\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\nmutation DeleteMeeting($id: ID!, $reason: NonEmptyString) {\n  deleteMeeting(id: $id, reason: $reason) {\n    id\n  }\n}\n"
): typeof documents["\nmutation DeleteMeeting($id: ID!, $reason: NonEmptyString) {\n  deleteMeeting(id: $id, reason: $reason) {\n    id\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n\tmutation DeleteTeam($id: ID!) {\n\t\tdeleteTeam(teamId: $id) {\n\t\t\tid\n\t\t}\n\t}\n"
): typeof documents["\n\tmutation DeleteTeam($id: ID!) {\n\t\tdeleteTeam(teamId: $id) {\n\t\t\tid\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\nmutation DeleteTimer($deleteTimerId: ID!, $reason: NonEmptyString) {\n  deleteTimer(id: $deleteTimerId, reason: $reason) {\n    id\n  }\n}"
): typeof documents["\nmutation DeleteTimer($deleteTimerId: ID!, $reason: NonEmptyString) {\n  deleteTimer(id: $deleteTimerId, reason: $reason) {\n    id\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\nquery GetMeetingById($id: ID!) {\n  getMeetingById(id: $id) {\n    id\n    title\n    from\n    to\n    timezone\n    updatedAt\n    createdAt\n    description\n    isOwner\n    repeat {\n      freq\n      interval\n    }\n    owner {\n      id\n      fullName\n      picture\n      isMe\n    }\n    teams {\n      id\n      name\n      logo\n      teammates {\n        id\n        member {\n          id\n          fullName\n          picture\n          timezone\n          tzData {\n\t\t\t\t\t\tname\n            abbreviation\n            countryName\n            alternativeName\n          }\n        }\n      }\n    }\n  }\n}\n"
): typeof documents["\nquery GetMeetingById($id: ID!) {\n  getMeetingById(id: $id) {\n    id\n    title\n    from\n    to\n    timezone\n    updatedAt\n    createdAt\n    description\n    isOwner\n    repeat {\n      freq\n      interval\n    }\n    owner {\n      id\n      fullName\n      picture\n      isMe\n    }\n    teams {\n      id\n      name\n      logo\n      teammates {\n        id\n        member {\n          id\n          fullName\n          picture\n          timezone\n          tzData {\n\t\t\t\t\t\tname\n            abbreviation\n            countryName\n            alternativeName\n          }\n        }\n      }\n    }\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\nquery GetMeetings($sort: MeetingSort) {\n  getMeetings(sort: $sort) {\n    cursor\n    meetings {\n      id\n      title\n      from\n      to\n      timezone\n      updatedAt\n      createdAt\n      description\n      isOwner\n      repeat {\n        freq\n        interval\n      }\n      owner {\n        id\n        fullName\n        picture\n        isMe\n      }\n      teams {\n        id\n        name\n        logo\n        teammates {\n          id\n          member {\n            id\n            fullName\n            picture\n            timezone\n            tzData {\n              name\n              abbreviation\n              countryName\n              alternativeName\n            }\n          }\n        }\n      }\n    }\n  }\n}\n"
): typeof documents["\nquery GetMeetings($sort: MeetingSort) {\n  getMeetings(sort: $sort) {\n    cursor\n    meetings {\n      id\n      title\n      from\n      to\n      timezone\n      updatedAt\n      createdAt\n      description\n      isOwner\n      repeat {\n        freq\n        interval\n      }\n      owner {\n        id\n        fullName\n        picture\n        isMe\n      }\n      teams {\n        id\n        name\n        logo\n        teammates {\n          id\n          member {\n            id\n            fullName\n            picture\n            timezone\n            tzData {\n              name\n              abbreviation\n              countryName\n              alternativeName\n            }\n          }\n        }\n      }\n    }\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n\tquery Query($id: ID!) {\n\t\tgetTeamById(id: $id) {\n\t\t\tid\n\t\t\tname\n\t\t\tlogo\n\t\t\tisOwner\n\t\t\tisMember\n\t\t\tisAdmin\n\t\t\tisPinned\n\t\t\tinviteCode\n\t\t\towner {\n\t\t\t\tid\n\t\t\t\tfullName\n\t\t\t\tpicture\n\t\t\t\tisMe\n\t\t\t}\n\t\t\tteammates {\n\t\t\t\tid\n\t\t\t\tisMe\n\t\t\t\trole\n\t\t\t\tmember {\n\t\t\t\t\tid\n\t\t\t\t\tfullName\n\t\t\t\t\tisMe\n\t\t\t\t\tpicture\n\t\t\t\t\ttimezone\n\t\t\t\t\ttzData {\n\t\t\t\t\t\tname\n\t\t\t\t\t\tcountryName\n\t\t\t\t\t\tmainCities\n\t\t\t\t\t\talternativeName\n\t\t\t\t\t\tabbreviation\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"
): typeof documents["\n\tquery Query($id: ID!) {\n\t\tgetTeamById(id: $id) {\n\t\t\tid\n\t\t\tname\n\t\t\tlogo\n\t\t\tisOwner\n\t\t\tisMember\n\t\t\tisAdmin\n\t\t\tisPinned\n\t\t\tinviteCode\n\t\t\towner {\n\t\t\t\tid\n\t\t\t\tfullName\n\t\t\t\tpicture\n\t\t\t\tisMe\n\t\t\t}\n\t\t\tteammates {\n\t\t\t\tid\n\t\t\t\tisMe\n\t\t\t\trole\n\t\t\t\tmember {\n\t\t\t\t\tid\n\t\t\t\t\tfullName\n\t\t\t\t\tisMe\n\t\t\t\t\tpicture\n\t\t\t\t\ttimezone\n\t\t\t\t\ttzData {\n\t\t\t\t\t\tname\n\t\t\t\t\t\tcountryName\n\t\t\t\t\t\tmainCities\n\t\t\t\t\t\talternativeName\n\t\t\t\t\t\tabbreviation\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n\tquery GetTeamPreviewByCode($code: ID!) {\n\t\tgetTeamPreviewByCode(code: $code)\n\t}\n"
): typeof documents["\n\tquery GetTeamPreviewByCode($code: ID!) {\n\t\tgetTeamPreviewByCode(code: $code)\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\nquery GetTimezoneById($id: ID!) {\n  getTimezoneById(id: $id) {\n    name\n    countryName\n    abbreviation\n    alternativeName\n    mainCities\n  }\n}\n"
): typeof documents["\nquery GetTimezoneById($id: ID!) {\n  getTimezoneById(id: $id) {\n    name\n    countryName\n    abbreviation\n    alternativeName\n    mainCities\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\nquery GetTimerById($id: ID!) {\n  getTimerById(id: $id) {\n\t\tid\n\t\ttitle\n\t\ttype\n\t\tduration\n\t\tdirection\n\t\tdescription\n\t\tdateTime\n\t\tcreatedAt\n\t\tupdatedAt\n\t\ttimezone\n\t\tisOwner\n\t\towner {\n\t\t\tid\n\t\t\tfullName\n\t\t\tpicture\n\t\t}\n\t\tstartAt\n\t\trepeat {\n\t\t\tfreq\n\t\t\tinterval\n\t\t}\n\t\tteams {\n\t\t\tid\n\t\t\tname\n\t\t\tteammates {\n\t\t\t\tid\n\t\t\t\trole\n\t\t\t\tmember {\n\t\t\t\t\tid\n\t\t\t\t\tfullName\n\t\t\t\t\tpicture\n\t\t\t\t\ttimezone\n\t\t\t\t}\n\t\t\t}\n\t\t}\n  }\n}"
): typeof documents["\nquery GetTimerById($id: ID!) {\n  getTimerById(id: $id) {\n\t\tid\n\t\ttitle\n\t\ttype\n\t\tduration\n\t\tdirection\n\t\tdescription\n\t\tdateTime\n\t\tcreatedAt\n\t\tupdatedAt\n\t\ttimezone\n\t\tisOwner\n\t\towner {\n\t\t\tid\n\t\t\tfullName\n\t\t\tpicture\n\t\t}\n\t\tstartAt\n\t\trepeat {\n\t\t\tfreq\n\t\t\tinterval\n\t\t}\n\t\tteams {\n\t\t\tid\n\t\t\tname\n\t\t\tteammates {\n\t\t\t\tid\n\t\t\t\trole\n\t\t\t\tmember {\n\t\t\t\t\tid\n\t\t\t\t\tfullName\n\t\t\t\t\tpicture\n\t\t\t\t\ttimezone\n\t\t\t\t}\n\t\t\t}\n\t\t}\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\nquery GetTimers($state: TimerState) {\n  getTimers(state: $state) {\n    cursor\n    timers {\n      id\n      title\n      type\n      duration\n      direction\n      description\n      dateTime\n      createdAt\n      updatedAt\n      timezone\n      isOwner\n      owner {\n        id\n        fullName\n        picture\n      }\n      startAt\n      repeat {\n        freq\n        interval\n      }\n      teams {\n        id\n        name\n        teammates {\n          id\n          role\n          member {\n            id\n            fullName\n            picture\n            timezone\n          }\n        }\n      }\n    }\n  }\n}\n"
): typeof documents["\nquery GetTimers($state: TimerState) {\n  getTimers(state: $state) {\n    cursor\n    timers {\n      id\n      title\n      type\n      duration\n      direction\n      description\n      dateTime\n      createdAt\n      updatedAt\n      timezone\n      isOwner\n      owner {\n        id\n        fullName\n        picture\n      }\n      startAt\n      repeat {\n        freq\n        interval\n      }\n      teams {\n        id\n        name\n        teammates {\n          id\n          role\n          member {\n            id\n            fullName\n            picture\n            timezone\n          }\n        }\n      }\n    }\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n\tquery Timezones {\n\t\ttimezones {\n\t\t\tname\n\t\t\tabbreviation\n\t\t\talternativeName\n\t\t\tcountryCode\n\t\t\tcountryName\n\t\t\tcountryFlag\n\t\t\tmainCities\n\t\t}\n\t}\n"
): typeof documents["\n\tquery Timezones {\n\t\ttimezones {\n\t\t\tname\n\t\t\tabbreviation\n\t\t\talternativeName\n\t\t\tcountryCode\n\t\t\tcountryName\n\t\t\tcountryFlag\n\t\t\tmainCities\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\nmutation JoinTeam($inviteCode: ID!) {\n  joinTeam(inviteCode: $inviteCode) {\n\t\tid\n\t\tname\n\t\tlogo\n\t\tisOwner\n\t\tisMember\n\t\tisAdmin\n\t\tisPinned\n\t\tinviteCode\n\t\towner {\n\t\t\tid\n\t\t\tfullName\n\t\t\tpicture\n\t\t\tisMe\n\t\t}\n\t\tteammates {\n\t\t\tid\n\t\t\tisMe\n\t\t\trole\n\t\t\tmember {\n\t\t\t\tid\n\t\t\t\tfullName\n\t\t\t\tisMe\n\t\t\t\tpicture\n\t\t\t\ttimezone\n\t\t\t\ttzData {\n\t\t\t\t\tname\n\t\t\t\t\tcountryCode\n\t\t\t\t\tcountryName\n\t\t\t\t\tmainCities\n\t\t\t\t}\n\t\t\t}\n\t\t}\n  }\n}\n"
): typeof documents["\nmutation JoinTeam($inviteCode: ID!) {\n  joinTeam(inviteCode: $inviteCode) {\n\t\tid\n\t\tname\n\t\tlogo\n\t\tisOwner\n\t\tisMember\n\t\tisAdmin\n\t\tisPinned\n\t\tinviteCode\n\t\towner {\n\t\t\tid\n\t\t\tfullName\n\t\t\tpicture\n\t\t\tisMe\n\t\t}\n\t\tteammates {\n\t\t\tid\n\t\t\tisMe\n\t\t\trole\n\t\t\tmember {\n\t\t\t\tid\n\t\t\t\tfullName\n\t\t\t\tisMe\n\t\t\t\tpicture\n\t\t\t\ttimezone\n\t\t\t\ttzData {\n\t\t\t\t\tname\n\t\t\t\t\tcountryCode\n\t\t\t\t\tcountryName\n\t\t\t\t\tmainCities\n\t\t\t\t}\n\t\t\t}\n\t\t}\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n\tmutation LeaveTeam($teamId: ID!) {\n\t\tleaveTeam(teamId: $teamId) {\n\t\t\tid\n\t\t\tisMember\n\t\t}\n\t}\n"
): typeof documents["\n\tmutation LeaveTeam($teamId: ID!) {\n\t\tleaveTeam(teamId: $teamId) {\n\t\t\tid\n\t\t\tisMember\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  mutation LoginWithSocialProvider($input: SocialLoginInput!) {\n    loginWithSocialProvider(input: $input) {\n      token\n    }\n  }\n"
): typeof documents["\n  mutation LoginWithSocialProvider($input: SocialLoginInput!) {\n    loginWithSocialProvider(input: $input) {\n      token\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n\tmutation AddTeamMemberToAdmin($memberId: ID!) {\n\t\taddTeamMemberToAdmin(memberId: $memberId) {\n\t\t\tid\n\t\t\trole\n\t\t\tteam {\n\t\t\t\tid\n\t\t\t\tisAdmin\n\t\t\t}\n\t\t}\n\t}"
): typeof documents["\n\tmutation AddTeamMemberToAdmin($memberId: ID!) {\n\t\taddTeamMemberToAdmin(memberId: $memberId) {\n\t\t\tid\n\t\t\trole\n\t\t\tteam {\n\t\t\t\tid\n\t\t\t\tisAdmin\n\t\t\t}\n\t\t}\n\t}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n\tmutation RemoveTeamMemberFromAdmin($memberId: ID!) {\n\t\tremoveTeamMemberFromAdmin(memberId: $memberId) {\n\t\t\tid\n\t\t\trole\n\t\t\tteam {\n\t\t\t\tid\n\t\t\t\tisAdmin\n\t\t\t}\n\t\t}\n\t}\n"
): typeof documents["\n\tmutation RemoveTeamMemberFromAdmin($memberId: ID!) {\n\t\tremoveTeamMemberFromAdmin(memberId: $memberId) {\n\t\t\tid\n\t\t\trole\n\t\t\tteam {\n\t\t\t\tid\n\t\t\t\tisAdmin\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n  query Me {\n    me {\n      id\n      fullName\n      firstName\n      lastName\n      email\n      locale\n      timezone\n      picture\n      teams {\n        id\n        name\n        logo\n        isOwner\n        isMember\n        isAdmin\n        isPinned\n        inviteCode\n        owner {\n          id\n          fullName\n          picture\n          isMe\n        }\n        teammates {\n          id\n          isMe\n          role\n          member {\n            id\n            fullName\n            isMe\n            picture\n            timezone\n            tzData {\n              name\n              countryName\n              mainCities\n              alternativeName\n              abbreviation\n            }\n          }\n        }\n      }\n      createdTeams {\n        id\n        name\n        logo\n      }\n      tzData {\n        name\n        countryCode\n        countryName\n        mainCities\n      }\n    }\n  }\n"
): typeof documents["\n  query Me {\n    me {\n      id\n      fullName\n      firstName\n      lastName\n      email\n      locale\n      timezone\n      picture\n      teams {\n        id\n        name\n        logo\n        isOwner\n        isMember\n        isAdmin\n        isPinned\n        inviteCode\n        owner {\n          id\n          fullName\n          picture\n          isMe\n        }\n        teammates {\n          id\n          isMe\n          role\n          member {\n            id\n            fullName\n            isMe\n            picture\n            timezone\n            tzData {\n              name\n              countryName\n              mainCities\n              alternativeName\n              abbreviation\n            }\n          }\n        }\n      }\n      createdTeams {\n        id\n        name\n        logo\n      }\n      tzData {\n        name\n        countryCode\n        countryName\n        mainCities\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\nmutation PinTeam($id: ID!) {\n  pinTeam(id: $id) {\n    id\n    isPinned\n  }\n}\n"
): typeof documents["\nmutation PinTeam($id: ID!) {\n  pinTeam(id: $id) {\n    id\n    isPinned\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n\tmutation RemoveTeammate($memberId: ID!) {\n\t\tremoveTeammate(memberId: $memberId) {\n\t\t\tid\n\t\t}\n\t}\n"
): typeof documents["\n\tmutation RemoveTeammate($memberId: ID!) {\n\t\tremoveTeammate(memberId: $memberId) {\n\t\t\tid\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\nmutation UnpinTeam($id: ID!) {\n  unpinTeam(id: $id) {\n    id\n    isPinned\n  }\n}\n"
): typeof documents["\nmutation UnpinTeam($id: ID!) {\n  unpinTeam(id: $id) {\n    id\n    isPinned\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\nmutation UpdateMeeting($input: UpdateMeetingInput!) {\n  updateMeeting(input: $input) {\n    id\n    title\n    timezone\n    from\n    to\n    description\n    isOwner\n    repeat {\n      freq\n      interval\n    }\n    teams {\n      id\n      name\n      logo\n      teammates {\n        id\n        member {\n          id\n          fullName\n          picture\n          tzData {\n            alternativeName\n            countryName\n            name\n          }\n        }\n      }\n    }\n  }\n}\n"
): typeof documents["\nmutation UpdateMeeting($input: UpdateMeetingInput!) {\n  updateMeeting(input: $input) {\n    id\n    title\n    timezone\n    from\n    to\n    description\n    isOwner\n    repeat {\n      freq\n      interval\n    }\n    teams {\n      id\n      name\n      logo\n      teammates {\n        id\n        member {\n          id\n          fullName\n          picture\n          tzData {\n            alternativeName\n            countryName\n            name\n          }\n        }\n      }\n    }\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n\tmutation UpdateProfile($input: UpdateUserProfileInput!) {\n\t\tupdateProfile(input: $input) {\n\t\t\tid\n\t\t\tfullName\n\t\t\tfirstName\n\t\t\tlastName\n\t\t\tlocale\n\t\t\ttimezone\n\t\t\tupdatedAt\n\t\t\ttzData {\n\t\t\t\tname\n\t\t\t\tcountryName\n\t\t\t}\n\t\t}\n\t}\n"
): typeof documents["\n\tmutation UpdateProfile($input: UpdateUserProfileInput!) {\n\t\tupdateProfile(input: $input) {\n\t\t\tid\n\t\t\tfullName\n\t\t\tfirstName\n\t\t\tlastName\n\t\t\tlocale\n\t\t\ttimezone\n\t\t\tupdatedAt\n\t\t\ttzData {\n\t\t\t\tname\n\t\t\t\tcountryName\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n\tmutation UpdateTeam($input: UpdateTeamInput!) {\n\t\tupdateTeam(input: $input) {\n\t\t\tid\n\t\t\tname\n\t\t}\n\t}\n"
): typeof documents["\n\tmutation UpdateTeam($input: UpdateTeamInput!) {\n\t\tupdateTeam(input: $input) {\n\t\t\tid\n\t\t\tname\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\nmutation UpdateTimer($input: UpdateTimerInput!) {\n  updateTimer(input: $input) {\n    id\n    title\n    type\n    dateTime\n    duration\n    timezone\n    createdAt\n    updatedAt\n    description\n    isOwner\n    repeat {\n      freq\n      interval\n    }\n    startAt\n    teams {\n      id\n      name\n    }\n  }\n}"
): typeof documents["\nmutation UpdateTimer($input: UpdateTimerInput!) {\n  updateTimer(input: $input) {\n    id\n    title\n    type\n    dateTime\n    duration\n    timezone\n    createdAt\n    updatedAt\n    description\n    isOwner\n    repeat {\n      freq\n      interval\n    }\n    startAt\n    teams {\n      id\n      name\n    }\n  }\n}"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;

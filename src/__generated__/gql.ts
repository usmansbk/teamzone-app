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
  "\n\tmutation CreateTeam($input: CreateTeamInput!) {\n\t\tcreateTeam(input: $input) {\n\t\t\tid\n\t\t\tname\n\t\t\tlogo\n\t\t\tisOwner\n\t\t\towner {\n\t\t\t\tid\n\t\t\t}\n\t\t}\n\t}\n":
    types.CreateTeamDocument,
  "\n\tmutation DeleteTeam($id: ID!) {\n\t\tdeleteTeam(teamId: $id) {\n\t\t\tid\n\t\t}\n\t}\n":
    types.DeleteTeamDocument,
  "\n\tquery Query($id: ID!) {\n\t\tgetTeamById(id: $id) {\n\t\t\tid\n\t\t\tname\n\t\t\tlogo\n\t\t\tisOwner\n\t\t\tisMember\n\t\t\tinviteCode\n\t\t\tcreatedAt\n\t\t\tupdatedAt\n\t\t\towner {\n\t\t\t\tid\n\t\t\t\tfullName\n\t\t\t\tpicture\n\t\t\t\tisMe\n\t\t\t}\n\t\t\tteammates {\n\t\t\t\tid\n\t\t\t\tisMe\n\t\t\t\tjoinedAt\n\t\t\t\trole\n\t\t\t\tmember {\n\t\t\t\t\tid\n\t\t\t\t\tfullName\n\t\t\t\t\tisMe\n\t\t\t\t\tpicture\n\t\t\t\t\ttzData {\n\t\t\t\t\t\tname\n\t\t\t\t\t\tabbreviation\n\t\t\t\t\t\talternativeName\n\t\t\t\t\t\tcontinentCode\n\t\t\t\t\t\tcontinentName\n\t\t\t\t\t\tcountryCode\n\t\t\t\t\t\tcountryName\n\t\t\t\t\t\tcurrentTimeFormat\n\t\t\t\t\t\tcurrentTimeOffsetInMinutes\n\t\t\t\t\t\tgroup\n\t\t\t\t\t\tmainCities\n\t\t\t\t\t\trawFormat\n\t\t\t\t\t\trawOffsetInMinutes\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n":
    types.QueryDocument,
  "\n\tquery Timezones {\n\t\ttimezones {\n\t\t\tname\n\t\t\talternativeName\n\t\t}\n\t}\n":
    types.TimezonesDocument,
  "\nmutation JoinTeam($inviteCode: ID!) {\n  joinTeam(inviteCode: $inviteCode) {\n\t\tid\n\t\tname\n\t\tlogo\n\t\tisOwner\n\t\tisMember\n\t\tinviteCode\n\t\tcreatedAt\n\t\tupdatedAt\n\t\towner {\n\t\t\tid\n\t\t\tfullName\n\t\t\tpicture\n\t\t\tisMe\n\t\t}\n\t\tteammates {\n\t\t\tid\n\t\t\tisMe\n\t\t\tjoinedAt\n\t\t\trole\n\t\t\tmember {\n\t\t\t\tid\n\t\t\t\tfullName\n\t\t\t\tisMe\n\t\t\t\tpicture\n\t\t\t\ttzData {\n\t\t\t\t\tname\n\t\t\t\t\tabbreviation\n\t\t\t\t\talternativeName\n\t\t\t\t\tcontinentCode\n\t\t\t\t\tcontinentName\n\t\t\t\t\tcountryCode\n\t\t\t\t\tcountryName\n\t\t\t\t\tcurrentTimeFormat\n\t\t\t\t\tcurrentTimeOffsetInMinutes\n\t\t\t\t\tgroup\n\t\t\t\t\tmainCities\n\t\t\t\t\trawFormat\n\t\t\t\t\trawOffsetInMinutes\n\t\t\t\t}\n\t\t\t}\n\t\t}\n  }\n}\n":
    types.JoinTeamDocument,
  "\n\tmutation LeaveTeam($teamId: ID!) {\n\t\tleaveTeam(teamId: $teamId) {\n\t\t\tid\n\t\t\tteamId\n\t\t\tmemberId\n\t\t}\n\t}\n":
    types.LeaveTeamDocument,
  "\n  mutation LoginWithSocialProvider($input: SocialLoginInput!) {\n    loginWithSocialProvider(input: $input) {\n      token\n    }\n  }\n":
    types.LoginWithSocialProviderDocument,
  "\n  query Me {\n    me {\n      id\n      fullName\n      firstName\n      lastName\n      email\n      locale\n      timezone\n      picture\n      updatedAt\n      teams {\n        id\n        name\n        logo\n      }\n      createdTeams {\n        id\n        name\n        logo\n      }\n      tzData {\n        name\n        abbreviation\n        alternativeName\n        continentCode\n        continentName\n        countryCode\n        countryName\n        currentTimeFormat\n        currentTimeOffsetInMinutes\n        group\n        mainCities\n        rawFormat\n        rawOffsetInMinutes\n      }\n    }\n  }\n":
    types.MeDocument,
  "\n\tmutation UpdateProfile($input: UpdateUserProfileInput!) {\n\t\tupdateProfile(input: $input) {\n\t\t\tid\n\t\t\tfullName\n\t\t\tfirstName\n\t\t\tlastName\n\t\t\tlocale\n\t\t\ttimezone\n\t\t\tupdatedAt\n\t\t}\n\t}\n":
    types.UpdateProfileDocument,
  "\n\tmutation UpdateTeam($input: UpdateTeamInput!) {\n\t\tupdateTeam(input: $input) {\n\t\t\tid\n\t\t\tname\n\t\t}\n\t}\n":
    types.UpdateTeamDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n\tmutation CreateTeam($input: CreateTeamInput!) {\n\t\tcreateTeam(input: $input) {\n\t\t\tid\n\t\t\tname\n\t\t\tlogo\n\t\t\tisOwner\n\t\t\towner {\n\t\t\t\tid\n\t\t\t}\n\t\t}\n\t}\n"
): typeof documents["\n\tmutation CreateTeam($input: CreateTeamInput!) {\n\t\tcreateTeam(input: $input) {\n\t\t\tid\n\t\t\tname\n\t\t\tlogo\n\t\t\tisOwner\n\t\t\towner {\n\t\t\t\tid\n\t\t\t}\n\t\t}\n\t}\n"];
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
  source: "\n\tquery Query($id: ID!) {\n\t\tgetTeamById(id: $id) {\n\t\t\tid\n\t\t\tname\n\t\t\tlogo\n\t\t\tisOwner\n\t\t\tisMember\n\t\t\tinviteCode\n\t\t\tcreatedAt\n\t\t\tupdatedAt\n\t\t\towner {\n\t\t\t\tid\n\t\t\t\tfullName\n\t\t\t\tpicture\n\t\t\t\tisMe\n\t\t\t}\n\t\t\tteammates {\n\t\t\t\tid\n\t\t\t\tisMe\n\t\t\t\tjoinedAt\n\t\t\t\trole\n\t\t\t\tmember {\n\t\t\t\t\tid\n\t\t\t\t\tfullName\n\t\t\t\t\tisMe\n\t\t\t\t\tpicture\n\t\t\t\t\ttzData {\n\t\t\t\t\t\tname\n\t\t\t\t\t\tabbreviation\n\t\t\t\t\t\talternativeName\n\t\t\t\t\t\tcontinentCode\n\t\t\t\t\t\tcontinentName\n\t\t\t\t\t\tcountryCode\n\t\t\t\t\t\tcountryName\n\t\t\t\t\t\tcurrentTimeFormat\n\t\t\t\t\t\tcurrentTimeOffsetInMinutes\n\t\t\t\t\t\tgroup\n\t\t\t\t\t\tmainCities\n\t\t\t\t\t\trawFormat\n\t\t\t\t\t\trawOffsetInMinutes\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"
): typeof documents["\n\tquery Query($id: ID!) {\n\t\tgetTeamById(id: $id) {\n\t\t\tid\n\t\t\tname\n\t\t\tlogo\n\t\t\tisOwner\n\t\t\tisMember\n\t\t\tinviteCode\n\t\t\tcreatedAt\n\t\t\tupdatedAt\n\t\t\towner {\n\t\t\t\tid\n\t\t\t\tfullName\n\t\t\t\tpicture\n\t\t\t\tisMe\n\t\t\t}\n\t\t\tteammates {\n\t\t\t\tid\n\t\t\t\tisMe\n\t\t\t\tjoinedAt\n\t\t\t\trole\n\t\t\t\tmember {\n\t\t\t\t\tid\n\t\t\t\t\tfullName\n\t\t\t\t\tisMe\n\t\t\t\t\tpicture\n\t\t\t\t\ttzData {\n\t\t\t\t\t\tname\n\t\t\t\t\t\tabbreviation\n\t\t\t\t\t\talternativeName\n\t\t\t\t\t\tcontinentCode\n\t\t\t\t\t\tcontinentName\n\t\t\t\t\t\tcountryCode\n\t\t\t\t\t\tcountryName\n\t\t\t\t\t\tcurrentTimeFormat\n\t\t\t\t\t\tcurrentTimeOffsetInMinutes\n\t\t\t\t\t\tgroup\n\t\t\t\t\t\tmainCities\n\t\t\t\t\t\trawFormat\n\t\t\t\t\t\trawOffsetInMinutes\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n\tquery Timezones {\n\t\ttimezones {\n\t\t\tname\n\t\t\talternativeName\n\t\t}\n\t}\n"
): typeof documents["\n\tquery Timezones {\n\t\ttimezones {\n\t\t\tname\n\t\t\talternativeName\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\nmutation JoinTeam($inviteCode: ID!) {\n  joinTeam(inviteCode: $inviteCode) {\n\t\tid\n\t\tname\n\t\tlogo\n\t\tisOwner\n\t\tisMember\n\t\tinviteCode\n\t\tcreatedAt\n\t\tupdatedAt\n\t\towner {\n\t\t\tid\n\t\t\tfullName\n\t\t\tpicture\n\t\t\tisMe\n\t\t}\n\t\tteammates {\n\t\t\tid\n\t\t\tisMe\n\t\t\tjoinedAt\n\t\t\trole\n\t\t\tmember {\n\t\t\t\tid\n\t\t\t\tfullName\n\t\t\t\tisMe\n\t\t\t\tpicture\n\t\t\t\ttzData {\n\t\t\t\t\tname\n\t\t\t\t\tabbreviation\n\t\t\t\t\talternativeName\n\t\t\t\t\tcontinentCode\n\t\t\t\t\tcontinentName\n\t\t\t\t\tcountryCode\n\t\t\t\t\tcountryName\n\t\t\t\t\tcurrentTimeFormat\n\t\t\t\t\tcurrentTimeOffsetInMinutes\n\t\t\t\t\tgroup\n\t\t\t\t\tmainCities\n\t\t\t\t\trawFormat\n\t\t\t\t\trawOffsetInMinutes\n\t\t\t\t}\n\t\t\t}\n\t\t}\n  }\n}\n"
): typeof documents["\nmutation JoinTeam($inviteCode: ID!) {\n  joinTeam(inviteCode: $inviteCode) {\n\t\tid\n\t\tname\n\t\tlogo\n\t\tisOwner\n\t\tisMember\n\t\tinviteCode\n\t\tcreatedAt\n\t\tupdatedAt\n\t\towner {\n\t\t\tid\n\t\t\tfullName\n\t\t\tpicture\n\t\t\tisMe\n\t\t}\n\t\tteammates {\n\t\t\tid\n\t\t\tisMe\n\t\t\tjoinedAt\n\t\t\trole\n\t\t\tmember {\n\t\t\t\tid\n\t\t\t\tfullName\n\t\t\t\tisMe\n\t\t\t\tpicture\n\t\t\t\ttzData {\n\t\t\t\t\tname\n\t\t\t\t\tabbreviation\n\t\t\t\t\talternativeName\n\t\t\t\t\tcontinentCode\n\t\t\t\t\tcontinentName\n\t\t\t\t\tcountryCode\n\t\t\t\t\tcountryName\n\t\t\t\t\tcurrentTimeFormat\n\t\t\t\t\tcurrentTimeOffsetInMinutes\n\t\t\t\t\tgroup\n\t\t\t\t\tmainCities\n\t\t\t\t\trawFormat\n\t\t\t\t\trawOffsetInMinutes\n\t\t\t\t}\n\t\t\t}\n\t\t}\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n\tmutation LeaveTeam($teamId: ID!) {\n\t\tleaveTeam(teamId: $teamId) {\n\t\t\tid\n\t\t\tteamId\n\t\t\tmemberId\n\t\t}\n\t}\n"
): typeof documents["\n\tmutation LeaveTeam($teamId: ID!) {\n\t\tleaveTeam(teamId: $teamId) {\n\t\t\tid\n\t\t\tteamId\n\t\t\tmemberId\n\t\t}\n\t}\n"];
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
  source: "\n  query Me {\n    me {\n      id\n      fullName\n      firstName\n      lastName\n      email\n      locale\n      timezone\n      picture\n      updatedAt\n      teams {\n        id\n        name\n        logo\n      }\n      createdTeams {\n        id\n        name\n        logo\n      }\n      tzData {\n        name\n        abbreviation\n        alternativeName\n        continentCode\n        continentName\n        countryCode\n        countryName\n        currentTimeFormat\n        currentTimeOffsetInMinutes\n        group\n        mainCities\n        rawFormat\n        rawOffsetInMinutes\n      }\n    }\n  }\n"
): typeof documents["\n  query Me {\n    me {\n      id\n      fullName\n      firstName\n      lastName\n      email\n      locale\n      timezone\n      picture\n      updatedAt\n      teams {\n        id\n        name\n        logo\n      }\n      createdTeams {\n        id\n        name\n        logo\n      }\n      tzData {\n        name\n        abbreviation\n        alternativeName\n        continentCode\n        continentName\n        countryCode\n        countryName\n        currentTimeFormat\n        currentTimeOffsetInMinutes\n        group\n        mainCities\n        rawFormat\n        rawOffsetInMinutes\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n\tmutation UpdateProfile($input: UpdateUserProfileInput!) {\n\t\tupdateProfile(input: $input) {\n\t\t\tid\n\t\t\tfullName\n\t\t\tfirstName\n\t\t\tlastName\n\t\t\tlocale\n\t\t\ttimezone\n\t\t\tupdatedAt\n\t\t}\n\t}\n"
): typeof documents["\n\tmutation UpdateProfile($input: UpdateUserProfileInput!) {\n\t\tupdateProfile(input: $input) {\n\t\t\tid\n\t\t\tfullName\n\t\t\tfirstName\n\t\t\tlastName\n\t\t\tlocale\n\t\t\ttimezone\n\t\t\tupdatedAt\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n\tmutation UpdateTeam($input: UpdateTeamInput!) {\n\t\tupdateTeam(input: $input) {\n\t\t\tid\n\t\t\tname\n\t\t}\n\t}\n"
): typeof documents["\n\tmutation UpdateTeam($input: UpdateTeamInput!) {\n\t\tupdateTeam(input: $input) {\n\t\t\tid\n\t\t\tname\n\t\t}\n\t}\n"];

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

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;

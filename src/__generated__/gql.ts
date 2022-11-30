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
  "\n\tquery Timezones {\n\t\ttimezones {\n\t\t\tname\n\t\t\talternativeName\n\t\t}\n\t}\n":
    types.TimezonesDocument,
  "\n  mutation LoginWithSocialProvider($input: SocialLoginInput!) {\n    loginWithSocialProvider(input: $input) {\n      token\n    }\n  }\n":
    types.LoginWithSocialProviderDocument,
  "\n  query Me {\n    me {\n      id\n      fullName\n      firstName\n      lastName\n      email\n      locale\n      timezone\n      picture\n      updatedAt\n      teams {\n        id\n        name\n        logo\n        isOwner\n      }\n    }\n  }\n":
    types.MeDocument,
  "\n\tmutation UpdateProfile($input: UpdateUserProfileInput!) {\n\t\tupdateProfile(input: $input) {\n\t\t\tid\n\t\t\tfullName\n\t\t\tfirstName\n\t\t\tlastName\n\t\t\tlocale\n\t\t\ttimezone\n\t\t\tupdatedAt\n\t\t}\n\t}\n":
    types.UpdateProfileDocument,
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
  source: "\n\tquery Timezones {\n\t\ttimezones {\n\t\t\tname\n\t\t\talternativeName\n\t\t}\n\t}\n"
): typeof documents["\n\tquery Timezones {\n\t\ttimezones {\n\t\t\tname\n\t\t\talternativeName\n\t\t}\n\t}\n"];
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
  source: "\n  query Me {\n    me {\n      id\n      fullName\n      firstName\n      lastName\n      email\n      locale\n      timezone\n      picture\n      updatedAt\n      teams {\n        id\n        name\n        logo\n        isOwner\n      }\n    }\n  }\n"
): typeof documents["\n  query Me {\n    me {\n      id\n      fullName\n      firstName\n      lastName\n      email\n      locale\n      timezone\n      picture\n      updatedAt\n      teams {\n        id\n        name\n        logo\n        isOwner\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: "\n\tmutation UpdateProfile($input: UpdateUserProfileInput!) {\n\t\tupdateProfile(input: $input) {\n\t\t\tid\n\t\t\tfullName\n\t\t\tfirstName\n\t\t\tlastName\n\t\t\tlocale\n\t\t\ttimezone\n\t\t\tupdatedAt\n\t\t}\n\t}\n"
): typeof documents["\n\tmutation UpdateProfile($input: UpdateUserProfileInput!) {\n\t\tupdateProfile(input: $input) {\n\t\t\tid\n\t\t\tfullName\n\t\t\tfirstName\n\t\t\tlastName\n\t\t\tlocale\n\t\t\ttimezone\n\t\t\tupdatedAt\n\t\t}\n\t}\n"];

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

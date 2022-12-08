/* eslint-disable */
import type { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** Banking account number is a string of 5 to 17 alphanumeric values for representing an generic account number */
  AccountNumber: any;
  /** The `BigInt` scalar type represents non-fractional signed whole numeric values. */
  BigInt: any;
  /** The `Byte` scalar type represents byte value as a Buffer */
  Byte: any;
  /** A country code as defined by ISO 3166-1 alpha-2 */
  CountryCode: any;
  /** A field whose value conforms to the standard cuid format as specified in https://github.com/ericelliott/cuid#broken-down */
  Cuid: any;
  /** A field whose value is a Currency: https://en.wikipedia.org/wiki/ISO_4217. */
  Currency: any;
  /** A field whose value conforms to the standard DID format as specified in did-core: https://www.w3.org/TR/did-core/. */
  DID: any;
  /** A date string, such as 2007-12-03, compliant with the `full-date` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  Date: any;
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: any;
  /**
   *
   *     A string representing a duration conforming to the ISO8601 standard,
   *     such as: P1W1DT13H23M34S
   *     P is the duration designator (for period) placed at the start of the duration representation.
   *     Y is the year designator that follows the value for the number of years.
   *     M is the month designator that follows the value for the number of months.
   *     W is the week designator that follows the value for the number of weeks.
   *     D is the day designator that follows the value for the number of days.
   *     T is the time designator that precedes the time components of the representation.
   *     H is the hour designator that follows the value for the number of hours.
   *     M is the minute designator that follows the value for the number of minutes.
   *     S is the second designator that follows the value for the number of seconds.
   *
   *     Note the time designator, T, that precedes the time value.
   *
   *     Matches moment.js, Luxon and DateFns implementations
   *     ,/. is valid for decimal places and +/- is a valid prefix
   *
   */
  Duration: any;
  /** A field whose value conforms to the standard internet email address format as specified in RFC822: https://www.w3.org/Protocols/rfc822/. */
  EmailAddress: any;
  /** A field whose value is a generic Universally Unique Identifier: https://en.wikipedia.org/wiki/Universally_unique_identifier. */
  GUID: any;
  /** A field whose value is a CSS HSL color: https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#hsl()_and_hsla(). */
  HSL: any;
  /** A field whose value is a CSS HSLA color: https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#hsl()_and_hsla(). */
  HSLA: any;
  /** A field whose value is a hex color code: https://en.wikipedia.org/wiki/Web_colors. */
  HexColorCode: any;
  /** A field whose value is a hexadecimal: https://en.wikipedia.org/wiki/Hexadecimal. */
  Hexadecimal: any;
  /** A field whose value is an International Bank Account Number (IBAN): https://en.wikipedia.org/wiki/International_Bank_Account_Number. */
  IBAN: any;
  /** A field whose value is either an IPv4 or IPv6 address: https://en.wikipedia.org/wiki/IP_address. */
  IP: any;
  /** A field whose value is a IPv4 address: https://en.wikipedia.org/wiki/IPv4. */
  IPv4: any;
  /** A field whose value is a IPv6 address: https://en.wikipedia.org/wiki/IPv6. */
  IPv6: any;
  /** A field whose value is a ISBN-10 or ISBN-13 number: https://en.wikipedia.org/wiki/International_Standard_Book_Number. */
  ISBN: any;
  /**
   *
   *     A string representing a duration conforming to the ISO8601 standard,
   *     such as: P1W1DT13H23M34S
   *     P is the duration designator (for period) placed at the start of the duration representation.
   *     Y is the year designator that follows the value for the number of years.
   *     M is the month designator that follows the value for the number of months.
   *     W is the week designator that follows the value for the number of weeks.
   *     D is the day designator that follows the value for the number of days.
   *     T is the time designator that precedes the time components of the representation.
   *     H is the hour designator that follows the value for the number of hours.
   *     M is the minute designator that follows the value for the number of minutes.
   *     S is the second designator that follows the value for the number of seconds.
   *
   *     Note the time designator, T, that precedes the time value.
   *
   *     Matches moment.js, Luxon and DateFns implementations
   *     ,/. is valid for decimal places and +/- is a valid prefix
   *
   */
  ISO8601Duration: any;
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any;
  /** The `JSONObject` scalar type represents JSON objects as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSONObject: any;
  /** A field whose value is a JSON Web Token (JWT): https://jwt.io/introduction. */
  JWT: any;
  /** A field whose value is a valid decimal degrees latitude number (53.471): https://en.wikipedia.org/wiki/Latitude */
  Latitude: any;
  /** A local date string (i.e., with no associated timezone) in `YYYY-MM-DD` format, e.g. `2020-01-01`. */
  LocalDate: any;
  /** A local time string (i.e., with no associated timezone) in 24-hr `HH:mm[:ss[.SSS]]` format, e.g. `14:25` or `14:25:06` or `14:25:06.123`.  This scalar is very similar to the `LocalTime`, with the only difference being that `LocalEndTime` also allows `24:00` as a valid value to indicate midnight of the following day.  This is useful when using the scalar to represent the exclusive upper bound of a time block. */
  LocalEndTime: any;
  /** A local time string (i.e., with no associated timezone) in 24-hr `HH:mm[:ss[.SSS]]` format, e.g. `14:25` or `14:25:06` or `14:25:06.123`. */
  LocalTime: any;
  /** The locale in the format of a BCP 47 (RFC 5646) standard string */
  Locale: any;
  /** The `BigInt` scalar type represents non-fractional signed whole numeric values. */
  Long: any;
  /** A field whose value is a valid decimal degrees longitude number (53.471): https://en.wikipedia.org/wiki/Longitude */
  Longitude: any;
  /** A field whose value is a IEEE 802 48-bit MAC address: https://en.wikipedia.org/wiki/MAC_address. */
  MAC: any;
  /** Floats that will have a value less than 0. */
  NegativeFloat: any;
  /** Integers that will have a value less than 0. */
  NegativeInt: any;
  /** A string that cannot be passed as an empty value */
  NonEmptyString: any;
  /** Floats that will have a value of 0 or more. */
  NonNegativeFloat: any;
  /** Integers that will have a value of 0 or more. */
  NonNegativeInt: any;
  /** Floats that will have a value of 0 or less. */
  NonPositiveFloat: any;
  /** Integers that will have a value of 0 or less. */
  NonPositiveInt: any;
  /** A field whose value conforms with the standard mongodb object ID as described here: https://docs.mongodb.com/manual/reference/method/ObjectId/#ObjectId. Example: 5e5677d71bdc2ae76344968c */
  ObjectID: any;
  /** A field whose value conforms to the standard E.164 format as specified in: https://en.wikipedia.org/wiki/E.164. Basically this is +17895551234. */
  PhoneNumber: any;
  /** A field whose value is a valid TCP port within the range of 0 to 65535: https://en.wikipedia.org/wiki/Transmission_Control_Protocol#TCP_ports */
  Port: any;
  /** Floats that will have a value greater than 0. */
  PositiveFloat: any;
  /** Integers that will have a value greater than 0. */
  PositiveInt: any;
  /** A field whose value conforms to the standard postal code formats for United States, United Kingdom, Germany, Canada, France, Italy, Australia, Netherlands, Spain, Denmark, Sweden, Belgium, India, Austria, Portugal, Switzerland or Luxembourg. */
  PostalCode: any;
  /** A field whose value is a CSS RGB color: https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#rgb()_and_rgba(). */
  RGB: any;
  /** A field whose value is a CSS RGBA color: https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#rgb()_and_rgba(). */
  RGBA: any;
  /** In the US, an ABA routing transit number (`ABA RTN`) is a nine-digit code to identify the financial institution. */
  RoutingNumber: any;
  /** The `SafeInt` scalar type represents non-fractional signed whole numeric values that are considered safe as defined by the ECMAScript specification. */
  SafeInt: any;
  /** A field whose value is a Semantic Version: https://semver.org */
  SemVer: any;
  /** A time string at UTC, such as 10:15:30Z, compliant with the `full-time` format outlined in section 5.6 of the RFC 3339profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  Time: any;
  /** A field whose value exists in the standard IANA Time Zone Database: https://www.iana.org/time-zones */
  TimeZone: any;
  /** The javascript `Date` as integer. Type represents date and time as number of milliseconds from start of UNIX epoch. */
  Timestamp: any;
  /** A field whose value conforms to the standard URL format as specified in RFC3986: https://www.ietf.org/rfc/rfc3986.txt. */
  URL: any;
  /** A currency string, such as $21.25 */
  USCurrency: any;
  /** A field whose value is a generic Universally Unique Identifier: https://en.wikipedia.org/wiki/Universally_unique_identifier. */
  UUID: any;
  /** Floats that will have a value of 0 or more. */
  UnsignedFloat: any;
  /** Integers that will have a value of 0 or more. */
  UnsignedInt: any;
  /** A field whose value is a UTC Offset: https://en.wikipedia.org/wiki/List_of_tz_database_time_zones */
  UtcOffset: any;
  /** Represents NULL values */
  Void: any;
};

export type AuthPayload = {
  __typename?: "AuthPayload";
  token?: Maybe<Scalars["JWT"]>;
};

export type AuthRule = {
  allow: AuthStrategy;
  identityClaim?: InputMaybe<Scalars["String"]>;
};

export enum AuthStrategy {
  /**
   * To restrict a record's access to a specific user, use the `owner` strategy.
   * When `owner` authorization is configured, only the record's `owner` and admins are allowed the specified operations.
   */
  Owner = "owner",
}

export type CreateTeamInput = {
  name: Scalars["NonEmptyString"];
};

export type Mutation = {
  __typename?: "Mutation";
  addTeamMemberToAdmin: TeamMember;
  createTeam: Team;
  deleteTeam: Team;
  joinTeam: Team;
  leaveTeam: TeamMember;
  loginWithSocialProvider: AuthPayload;
  removeTeamMemberFromAdmin: TeamMember;
  removeTeammate: TeamMember;
  updateProfile: User;
  updateTeam: Team;
};

export type MutationAddTeamMemberToAdminArgs = {
  memberId: Scalars["ID"];
};

export type MutationCreateTeamArgs = {
  input: CreateTeamInput;
};

export type MutationDeleteTeamArgs = {
  teamId: Scalars["ID"];
};

export type MutationJoinTeamArgs = {
  inviteCode: Scalars["ID"];
};

export type MutationLeaveTeamArgs = {
  teamId: Scalars["ID"];
};

export type MutationLoginWithSocialProviderArgs = {
  input: SocialLoginInput;
};

export type MutationRemoveTeamMemberFromAdminArgs = {
  memberId: Scalars["ID"];
};

export type MutationRemoveTeammateArgs = {
  memberId: Scalars["ID"];
};

export type MutationUpdateProfileArgs = {
  input: UpdateUserProfileInput;
};

export type MutationUpdateTeamArgs = {
  input: UpdateTeamInput;
};

export type Query = {
  __typename?: "Query";
  getTeamById: Team;
  me: User;
  timezones: Array<TimezoneData>;
};

export type QueryGetTeamByIdArgs = {
  id: Scalars["ID"];
};

export type SocialLoginInput = {
  code: Scalars["String"];
  locale?: InputMaybe<Scalars["Locale"]>;
  provider: SocialProvider;
  timezone?: InputMaybe<Scalars["TimeZone"]>;
};

export enum SocialProvider {
  Github = "GITHUB",
  Google = "GOOGLE",
}

export type Team = {
  __typename?: "Team";
  createdAt: Scalars["DateTime"];
  id: Scalars["ID"];
  inviteCode?: Maybe<Scalars["ID"]>;
  isAdmin: Scalars["Boolean"];
  isMember: Scalars["Boolean"];
  isOwner: Scalars["Boolean"];
  logo?: Maybe<Scalars["URL"]>;
  name: Scalars["String"];
  owner: User;
  teammates: Array<Maybe<TeamMember>>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
};

export type TeamLogoArgs = {
  height?: InputMaybe<Scalars["PositiveInt"]>;
  width?: InputMaybe<Scalars["PositiveInt"]>;
};

export type TeamMember = {
  __typename?: "TeamMember";
  id: Scalars["ID"];
  isMe?: Maybe<Scalars["Boolean"]>;
  joinedAt: Scalars["DateTime"];
  member: User;
  memberId: Scalars["ID"];
  role?: Maybe<TeamRole>;
  team: Team;
  teamId: Scalars["ID"];
};

export enum TeamRole {
  Admin = "ADMIN",
  Teammate = "TEAMMATE",
}

export type TimezoneData = {
  __typename?: "TimezoneData";
  abbreviation: Scalars["String"];
  alternativeName?: Maybe<Scalars["String"]>;
  continentCode: Scalars["String"];
  continentName: Scalars["String"];
  countryCode?: Maybe<Scalars["CountryCode"]>;
  countryFlag: Scalars["URL"];
  countryName: Scalars["String"];
  currentTimeFormat: Scalars["String"];
  currentTimeOffsetInMinutes: Scalars["Int"];
  group?: Maybe<Array<Maybe<Scalars["TimeZone"]>>>;
  mainCities?: Maybe<Array<Maybe<Scalars["String"]>>>;
  name: Scalars["TimeZone"];
  rawFormat: Scalars["String"];
  rawOffsetInMinutes: Scalars["Int"];
  sunrise?: Maybe<Scalars["DateTime"]>;
  sunset?: Maybe<Scalars["DateTime"]>;
  teammates: Array<Maybe<TeamMember>>;
};

export type TimezoneDataCountryFlagArgs = {
  height?: InputMaybe<Scalars["PositiveInt"]>;
};

export type UpdateTeamInput = {
  id: Scalars["ID"];
  name: Scalars["NonEmptyString"];
};

export type UpdateUserProfileInput = {
  firstName: Scalars["NonEmptyString"];
  lastName: Scalars["NonEmptyString"];
  locale: Scalars["Locale"];
  timezone: Scalars["TimeZone"];
};

export type User = {
  __typename?: "User";
  countryCode?: Maybe<Scalars["CountryCode"]>;
  createdAt: Scalars["DateTime"];
  createdTeams: Array<Maybe<Team>>;
  email: Scalars["EmailAddress"];
  emailVerified: Scalars["Boolean"];
  firstName: Scalars["String"];
  fullName: Scalars["String"];
  id: Scalars["ID"];
  isMe: Scalars["Boolean"];
  lastName: Scalars["String"];
  locale?: Maybe<Scalars["Locale"]>;
  picture?: Maybe<Scalars["URL"]>;
  teams: Array<Maybe<Team>>;
  timezone?: Maybe<Scalars["TimeZone"]>;
  tzData?: Maybe<TimezoneData>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
};

export type UserPictureArgs = {
  height?: InputMaybe<Scalars["PositiveInt"]>;
  width?: InputMaybe<Scalars["PositiveInt"]>;
};

export type CreateTeamMutationVariables = Exact<{
  input: CreateTeamInput;
}>;

export type CreateTeamMutation = {
  __typename?: "Mutation";
  createTeam: {
    __typename?: "Team";
    id: string;
    name: string;
    logo?: any | null;
    isOwner: boolean;
    owner: { __typename?: "User"; id: string };
  };
};

export type DeleteTeamMutationVariables = Exact<{
  id: Scalars["ID"];
}>;

export type DeleteTeamMutation = {
  __typename?: "Mutation";
  deleteTeam: { __typename?: "Team"; id: string };
};

export type QueryQueryVariables = Exact<{
  id: Scalars["ID"];
}>;

export type QueryQuery = {
  __typename?: "Query";
  getTeamById: {
    __typename?: "Team";
    id: string;
    name: string;
    logo?: any | null;
    isOwner: boolean;
    isMember: boolean;
    isAdmin: boolean;
    inviteCode?: string | null;
    createdAt: any;
    updatedAt?: any | null;
    owner: {
      __typename?: "User";
      id: string;
      fullName: string;
      picture?: any | null;
      isMe: boolean;
    };
    teammates: Array<{
      __typename?: "TeamMember";
      id: string;
      isMe?: boolean | null;
      joinedAt: any;
      role?: TeamRole | null;
      member: {
        __typename?: "User";
        id: string;
        fullName: string;
        isMe: boolean;
        picture?: any | null;
        tzData?: {
          __typename?: "TimezoneData";
          name: any;
          abbreviation: string;
          alternativeName?: string | null;
          continentCode: string;
          continentName: string;
          countryCode?: any | null;
          countryName: string;
          countryFlag: any;
          currentTimeFormat: string;
          currentTimeOffsetInMinutes: number;
          group?: Array<any | null> | null;
          mainCities?: Array<string | null> | null;
          rawFormat: string;
          rawOffsetInMinutes: number;
        } | null;
      };
    } | null>;
  };
};

export type TimezonesQueryVariables = Exact<{ [key: string]: never }>;

export type TimezonesQuery = {
  __typename?: "Query";
  timezones: Array<{
    __typename?: "TimezoneData";
    name: any;
    alternativeName?: string | null;
  }>;
};

export type JoinTeamMutationVariables = Exact<{
  inviteCode: Scalars["ID"];
}>;

export type JoinTeamMutation = {
  __typename?: "Mutation";
  joinTeam: { __typename?: "Team"; id: string; name: string };
};

export type LeaveTeamMutationVariables = Exact<{
  teamId: Scalars["ID"];
}>;

export type LeaveTeamMutation = {
  __typename?: "Mutation";
  leaveTeam: {
    __typename?: "TeamMember";
    id: string;
    teamId: string;
    memberId: string;
  };
};

export type LoginWithSocialProviderMutationVariables = Exact<{
  input: SocialLoginInput;
}>;

export type LoginWithSocialProviderMutation = {
  __typename?: "Mutation";
  loginWithSocialProvider: { __typename?: "AuthPayload"; token?: any | null };
};

export type AddTeamMemberToAdminMutationVariables = Exact<{
  memberId: Scalars["ID"];
}>;

export type AddTeamMemberToAdminMutation = {
  __typename?: "Mutation";
  addTeamMemberToAdmin: {
    __typename?: "TeamMember";
    id: string;
    role?: TeamRole | null;
    team: { __typename?: "Team"; id: string; isAdmin: boolean };
  };
};

export type RemoveTeamMemberFromAdminMutationVariables = Exact<{
  memberId: Scalars["ID"];
}>;

export type RemoveTeamMemberFromAdminMutation = {
  __typename?: "Mutation";
  removeTeamMemberFromAdmin: {
    __typename?: "TeamMember";
    id: string;
    role?: TeamRole | null;
    team: { __typename?: "Team"; id: string; isAdmin: boolean };
  };
};

export type MeQueryVariables = Exact<{ [key: string]: never }>;

export type MeQuery = {
  __typename?: "Query";
  me: {
    __typename?: "User";
    id: string;
    fullName: string;
    firstName: string;
    lastName: string;
    email: any;
    locale?: any | null;
    timezone?: any | null;
    picture?: any | null;
    updatedAt?: any | null;
    teams: Array<{
      __typename?: "Team";
      id: string;
      name: string;
      logo?: any | null;
      isOwner: boolean;
      isMember: boolean;
      isAdmin: boolean;
      inviteCode?: string | null;
      createdAt: any;
      updatedAt?: any | null;
      owner: {
        __typename?: "User";
        id: string;
        fullName: string;
        picture?: any | null;
        isMe: boolean;
      };
      teammates: Array<{
        __typename?: "TeamMember";
        id: string;
        isMe?: boolean | null;
        joinedAt: any;
        role?: TeamRole | null;
        member: {
          __typename?: "User";
          id: string;
          fullName: string;
          isMe: boolean;
          picture?: any | null;
          tzData?: {
            __typename?: "TimezoneData";
            name: any;
            abbreviation: string;
            alternativeName?: string | null;
            continentCode: string;
            continentName: string;
            countryCode?: any | null;
            countryName: string;
            countryFlag: any;
            currentTimeFormat: string;
            currentTimeOffsetInMinutes: number;
            group?: Array<any | null> | null;
            mainCities?: Array<string | null> | null;
            rawFormat: string;
            rawOffsetInMinutes: number;
          } | null;
        };
      } | null>;
    } | null>;
    createdTeams: Array<{
      __typename?: "Team";
      id: string;
      name: string;
      logo?: any | null;
    } | null>;
    tzData?: {
      __typename?: "TimezoneData";
      name: any;
      abbreviation: string;
      alternativeName?: string | null;
      continentCode: string;
      continentName: string;
      countryCode?: any | null;
      countryName: string;
      currentTimeFormat: string;
      currentTimeOffsetInMinutes: number;
      group?: Array<any | null> | null;
      mainCities?: Array<string | null> | null;
      rawFormat: string;
      rawOffsetInMinutes: number;
    } | null;
  };
};

export type RemoveTeammateMutationVariables = Exact<{
  memberId: Scalars["ID"];
}>;

export type RemoveTeammateMutation = {
  __typename?: "Mutation";
  removeTeammate: { __typename?: "TeamMember"; id: string };
};

export type UpdateProfileMutationVariables = Exact<{
  input: UpdateUserProfileInput;
}>;

export type UpdateProfileMutation = {
  __typename?: "Mutation";
  updateProfile: {
    __typename?: "User";
    id: string;
    fullName: string;
    firstName: string;
    lastName: string;
    locale?: any | null;
    timezone?: any | null;
    updatedAt?: any | null;
  };
};

export type UpdateTeamMutationVariables = Exact<{
  input: UpdateTeamInput;
}>;

export type UpdateTeamMutation = {
  __typename?: "Mutation";
  updateTeam: { __typename?: "Team"; id: string; name: string };
};

export const CreateTeamDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "CreateTeam" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "input" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "CreateTeamInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "createTeam" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "input" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
                { kind: "Field", name: { kind: "Name", value: "logo" } },
                { kind: "Field", name: { kind: "Name", value: "isOwner" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "owner" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CreateTeamMutation, CreateTeamMutationVariables>;
export const DeleteTeamDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "DeleteTeam" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "deleteTeam" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "teamId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<DeleteTeamMutation, DeleteTeamMutationVariables>;
export const QueryDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "Query" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "getTeamById" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
                { kind: "Field", name: { kind: "Name", value: "logo" } },
                { kind: "Field", name: { kind: "Name", value: "isOwner" } },
                { kind: "Field", name: { kind: "Name", value: "isMember" } },
                { kind: "Field", name: { kind: "Name", value: "isAdmin" } },
                { kind: "Field", name: { kind: "Name", value: "inviteCode" } },
                { kind: "Field", name: { kind: "Name", value: "createdAt" } },
                { kind: "Field", name: { kind: "Name", value: "updatedAt" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "owner" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "fullName" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "picture" },
                      },
                      { kind: "Field", name: { kind: "Name", value: "isMe" } },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "teammates" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "isMe" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "joinedAt" },
                      },
                      { kind: "Field", name: { kind: "Name", value: "role" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "member" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "id" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "fullName" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "isMe" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "picture" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "tzData" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "name" },
                                  },
                                  {
                                    kind: "Field",
                                    name: {
                                      kind: "Name",
                                      value: "abbreviation",
                                    },
                                  },
                                  {
                                    kind: "Field",
                                    name: {
                                      kind: "Name",
                                      value: "alternativeName",
                                    },
                                  },
                                  {
                                    kind: "Field",
                                    name: {
                                      kind: "Name",
                                      value: "continentCode",
                                    },
                                  },
                                  {
                                    kind: "Field",
                                    name: {
                                      kind: "Name",
                                      value: "continentName",
                                    },
                                  },
                                  {
                                    kind: "Field",
                                    name: {
                                      kind: "Name",
                                      value: "countryCode",
                                    },
                                  },
                                  {
                                    kind: "Field",
                                    name: {
                                      kind: "Name",
                                      value: "countryName",
                                    },
                                  },
                                  {
                                    kind: "Field",
                                    name: {
                                      kind: "Name",
                                      value: "countryFlag",
                                    },
                                  },
                                  {
                                    kind: "Field",
                                    name: {
                                      kind: "Name",
                                      value: "currentTimeFormat",
                                    },
                                  },
                                  {
                                    kind: "Field",
                                    name: {
                                      kind: "Name",
                                      value: "currentTimeOffsetInMinutes",
                                    },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "group" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "mainCities" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "rawFormat" },
                                  },
                                  {
                                    kind: "Field",
                                    name: {
                                      kind: "Name",
                                      value: "rawOffsetInMinutes",
                                    },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<QueryQuery, QueryQueryVariables>;
export const TimezonesDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "Timezones" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "timezones" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "name" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "alternativeName" },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<TimezonesQuery, TimezonesQueryVariables>;
export const JoinTeamDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "JoinTeam" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "inviteCode" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "joinTeam" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "inviteCode" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "inviteCode" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<JoinTeamMutation, JoinTeamMutationVariables>;
export const LeaveTeamDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "LeaveTeam" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "teamId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "leaveTeam" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "teamId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "teamId" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "teamId" } },
                { kind: "Field", name: { kind: "Name", value: "memberId" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<LeaveTeamMutation, LeaveTeamMutationVariables>;
export const LoginWithSocialProviderDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "LoginWithSocialProvider" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "input" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "SocialLoginInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "loginWithSocialProvider" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "input" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "token" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  LoginWithSocialProviderMutation,
  LoginWithSocialProviderMutationVariables
>;
export const AddTeamMemberToAdminDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "AddTeamMemberToAdmin" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "memberId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "addTeamMemberToAdmin" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "memberId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "memberId" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "role" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "team" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "isAdmin" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  AddTeamMemberToAdminMutation,
  AddTeamMemberToAdminMutationVariables
>;
export const RemoveTeamMemberFromAdminDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "RemoveTeamMemberFromAdmin" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "memberId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "removeTeamMemberFromAdmin" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "memberId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "memberId" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "role" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "team" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "isAdmin" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  RemoveTeamMemberFromAdminMutation,
  RemoveTeamMemberFromAdminMutationVariables
>;
export const MeDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "Me" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "me" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "fullName" } },
                { kind: "Field", name: { kind: "Name", value: "firstName" } },
                { kind: "Field", name: { kind: "Name", value: "lastName" } },
                { kind: "Field", name: { kind: "Name", value: "email" } },
                { kind: "Field", name: { kind: "Name", value: "locale" } },
                { kind: "Field", name: { kind: "Name", value: "timezone" } },
                { kind: "Field", name: { kind: "Name", value: "picture" } },
                { kind: "Field", name: { kind: "Name", value: "updatedAt" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "teams" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                      { kind: "Field", name: { kind: "Name", value: "logo" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "isOwner" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "isMember" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "isAdmin" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "inviteCode" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "createdAt" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "updatedAt" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "owner" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "id" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "fullName" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "picture" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "isMe" },
                            },
                          ],
                        },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "teammates" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "id" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "isMe" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "joinedAt" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "role" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "member" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "id" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "fullName" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "isMe" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "picture" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "tzData" },
                                    selectionSet: {
                                      kind: "SelectionSet",
                                      selections: [
                                        {
                                          kind: "Field",
                                          name: { kind: "Name", value: "name" },
                                        },
                                        {
                                          kind: "Field",
                                          name: {
                                            kind: "Name",
                                            value: "abbreviation",
                                          },
                                        },
                                        {
                                          kind: "Field",
                                          name: {
                                            kind: "Name",
                                            value: "alternativeName",
                                          },
                                        },
                                        {
                                          kind: "Field",
                                          name: {
                                            kind: "Name",
                                            value: "continentCode",
                                          },
                                        },
                                        {
                                          kind: "Field",
                                          name: {
                                            kind: "Name",
                                            value: "continentName",
                                          },
                                        },
                                        {
                                          kind: "Field",
                                          name: {
                                            kind: "Name",
                                            value: "countryCode",
                                          },
                                        },
                                        {
                                          kind: "Field",
                                          name: {
                                            kind: "Name",
                                            value: "countryName",
                                          },
                                        },
                                        {
                                          kind: "Field",
                                          name: {
                                            kind: "Name",
                                            value: "countryFlag",
                                          },
                                        },
                                        {
                                          kind: "Field",
                                          name: {
                                            kind: "Name",
                                            value: "currentTimeFormat",
                                          },
                                        },
                                        {
                                          kind: "Field",
                                          name: {
                                            kind: "Name",
                                            value: "currentTimeOffsetInMinutes",
                                          },
                                        },
                                        {
                                          kind: "Field",
                                          name: {
                                            kind: "Name",
                                            value: "group",
                                          },
                                        },
                                        {
                                          kind: "Field",
                                          name: {
                                            kind: "Name",
                                            value: "mainCities",
                                          },
                                        },
                                        {
                                          kind: "Field",
                                          name: {
                                            kind: "Name",
                                            value: "rawFormat",
                                          },
                                        },
                                        {
                                          kind: "Field",
                                          name: {
                                            kind: "Name",
                                            value: "rawOffsetInMinutes",
                                          },
                                        },
                                      ],
                                    },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "createdTeams" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                      { kind: "Field", name: { kind: "Name", value: "logo" } },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "tzData" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "abbreviation" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "alternativeName" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "continentCode" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "continentName" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "countryCode" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "countryName" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "currentTimeFormat" },
                      },
                      {
                        kind: "Field",
                        name: {
                          kind: "Name",
                          value: "currentTimeOffsetInMinutes",
                        },
                      },
                      { kind: "Field", name: { kind: "Name", value: "group" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "mainCities" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "rawFormat" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "rawOffsetInMinutes" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<MeQuery, MeQueryVariables>;
export const RemoveTeammateDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "RemoveTeammate" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "memberId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "removeTeammate" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "memberId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "memberId" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  RemoveTeammateMutation,
  RemoveTeammateMutationVariables
>;
export const UpdateProfileDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "UpdateProfile" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "input" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "UpdateUserProfileInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "updateProfile" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "input" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "fullName" } },
                { kind: "Field", name: { kind: "Name", value: "firstName" } },
                { kind: "Field", name: { kind: "Name", value: "lastName" } },
                { kind: "Field", name: { kind: "Name", value: "locale" } },
                { kind: "Field", name: { kind: "Name", value: "timezone" } },
                { kind: "Field", name: { kind: "Name", value: "updatedAt" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  UpdateProfileMutation,
  UpdateProfileMutationVariables
>;
export const UpdateTeamDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "UpdateTeam" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "input" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "UpdateTeamInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "updateTeam" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "input" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UpdateTeamMutation, UpdateTeamMutationVariables>;

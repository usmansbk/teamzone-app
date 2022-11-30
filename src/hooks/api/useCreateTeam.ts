import { gql, Reference, useMutation } from "@apollo/client";
import { useCallback } from "react";
import createTeam from "src/graphql/queries/createTeam";
import { CreateTeamInput, Team } from "src/__generated__/graphql";

export default function useCreateTeam() {
  const [mutate, { loading, data, error }] = useMutation(createTeam);

  const onSubmit = useCallback(
    (input: CreateTeamInput) =>
      mutate({
        variables: {
          input,
        },
        update(cache, response) {
          if (response.data?.createTeam) {
            const result = response.data.createTeam;
            cache.modify({
              id: cache.identify(result.owner),
              fields: {
                teams(existingRefs: Reference[], { readField }) {
                  const newTeamRef = cache.writeFragment({
                    data: result,
                    fragment: gql`
                      fragment NewComment on Comment {
                        id
                        text
                      }
                    `,
                  }) as unknown as Team;

                  // Quick safety check - if the new comment is already
                  // present in the cache, we don't need to add it again.
                  if (
                    existingRefs?.some(
                      (ref: Reference) => readField("id", ref) === newTeamRef.id
                    )
                  ) {
                    return existingRefs;
                  }

                  return [...existingRefs, newTeamRef];
                },
              },
            });
          }
        },
      }),
    [mutate]
  );

  return {
    loading,
    error,
    data: data?.createTeam,
    onSubmit,
  };
}

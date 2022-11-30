import { useMutation } from "@apollo/client";
import { useCallback } from "react";
import updateProfile from "src/graphql/queries/updateProfile";
import { UpdateProfileMutationVariables } from "src/__generated__/graphql";

export default function useUpdateProfile() {
  const [mutate, { loading, error, data, reset }] = useMutation(updateProfile);

  const onSubmit = useCallback(
    (input: UpdateProfileMutationVariables["input"]) =>
      mutate({
        variables: {
          input,
        },
      }),
    [mutate]
  );

  return {
    error,
    onSubmit,
    loading,
    data: data?.updateProfile,
    reset,
  };
}

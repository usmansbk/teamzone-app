import { LoadingButton } from "@mui/lab";
import { TextField, Stack, Box, LinearProgress } from "@mui/material";
import { useEffect, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import useMe from "src/hooks/api/useMe";
import useUpdateProfile from "src/hooks/api/useUpdateProfile";
import { UpdateProfileMutationVariables } from "src/__generated__/graphql";
import UploadAvatar from "src/components/UploadAvatar";
import TimezonePicker from "src/components/TimezonePicker";

export default function Profile() {
  const { onSubmit, loading } = useUpdateProfile();
  const { data, loading: loadingMe } = useMe();

  const schema = useMemo(
    () =>
      yup
        .object({
          firstName: yup
            .string()
            .trim()
            .required("What's your first name?")
            .max(100, "Name too long"),
          lastName: yup
            .string()
            .trim()
            .required("What's your last name?")
            .max(100, "Name too long"),
          timezone: yup
            .string()
            .trim()
            .nullable()
            .required("What's your current time zone?"),
          locale: yup
            .string()
            .trim()
            .required("What's your preferred language?"),
        })
        .required(),
    []
  );

  const {
    control,
    register,
    handleSubmit,
    formState: { isDirty, errors, touchedFields },
    reset,
  } = useForm<UpdateProfileMutationVariables["input"]>({
    resolver: yupResolver(schema),
    defaultValues: data,
  });

  useEffect(() => {
    reset(data);
  }, [data]);

  if (loadingMe) {
    return <LinearProgress />;
  }

  return (
    <Box>
      <Stack justifyContent="center" alignItems="center">
        <UploadAvatar />
      </Stack>
      <Stack
        mt={2}
        spacing={2}
        component="form"
        onSubmit={handleSubmit((values) =>
          onSubmit(schema.cast(values, { stripUnknown: true }))
        )}
      >
        <TextField
          label="First name"
          {...register("firstName")}
          type="text"
          autoComplete="given-name"
          error={Boolean(touchedFields.firstName && errors.firstName?.message)}
          helperText={errors.firstName?.message as string}
        />
        <TextField
          label="Last name"
          {...register("lastName")}
          type="text"
          autoComplete="family-name"
          error={Boolean(touchedFields.lastName && errors.lastName?.message)}
          helperText={errors.lastName?.message as string}
        />
        <Controller
          control={control}
          name="timezone"
          render={({ field: { value, onChange } }) => (
            <TimezonePicker
              value={value}
              onChange={onChange}
              error={!!errors.timezone}
              helperText={errors.timezone?.message as string}
            />
          )}
        />
        <LoadingButton
          loading={loading}
          type="submit"
          variant="contained"
          size="large"
          disabled={!isDirty}
        >
          Save Profile Information
        </LoadingButton>
      </Stack>
    </Box>
  );
}

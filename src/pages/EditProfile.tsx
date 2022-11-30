import { LoadingButton } from "@mui/lab";
import { Box, TextField, Stack, Grid, Avatar } from "@mui/material";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import useMe from "src/hooks/api/useMe";
import useUpdateProfile from "src/hooks/api/useUpdateProfile";
import { UpdateProfileMutationVariables } from "src/__generated__/graphql";

export default function EditProfile() {
  const { onSubmit, loading } = useUpdateProfile();
  const { data } = useMe();
  const { picture, fullName, firstName, lastName, locale, timezone } = data!;

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
    register,
    handleSubmit,
    formState: { isDirty, errors, touchedFields },
  } = useForm<UpdateProfileMutationVariables["input"]>({
    resolver: yupResolver(schema),
    defaultValues: {
      firstName,
      lastName,
      locale,
      timezone,
    },
  });

  return (
    <Box>
      <Grid container justifyContent="center">
        <Grid item xs={12} md={6} alignItems="center">
          <Stack justifyContent="center" alignItems="center">
            <Avatar
              src={picture}
              alt={fullName}
              sx={{ width: 120, height: 120 }}
            />
          </Stack>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack mt={2} spacing={2}>
              <TextField
                label="First name"
                {...register("firstName")}
                type="text"
                autoComplete="given-name"
                error={Boolean(
                  touchedFields.firstName && errors.firstName?.message
                )}
                helperText={errors.firstName?.message as string}
              />
              <TextField
                label="Last name"
                {...register("lastName")}
                type="text"
                autoComplete="family-name"
                error={Boolean(
                  touchedFields.lastName && errors.lastName?.message
                )}
                helperText={errors.lastName?.message as string}
              />
              <TextField
                label="Timezone"
                {...register("timezone")}
                type="text"
                error={Boolean(
                  touchedFields.timezone && errors.timezone?.message
                )}
                helperText={errors.timezone?.message as string}
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
          </form>
        </Grid>
      </Grid>
    </Box>
  );
}

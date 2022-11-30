import { LoadingButton } from "@mui/lab";
import {
  TextField,
  Stack,
  Grid,
  Autocomplete,
  CircularProgress,
} from "@mui/material";
import { useEffect, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import useMe from "src/hooks/api/useMe";
import useUpdateProfile from "src/hooks/api/useUpdateProfile";
import { UpdateProfileMutationVariables } from "src/__generated__/graphql";
import toast from "react-hot-toast";
import UploadAvatar from "src/components/UploadAvatar";
import { redirect } from "react-router-dom";
import routeMap from "src/routeMap";
import useGetTimezones from "src/hooks/api/useGetTimezones";

export default function EditProfile() {
  const { loading: loadingTimezones, data: timezones } = useGetTimezones();
  const { onSubmit, loading, data: updatedData } = useUpdateProfile();
  const { data } = useMe();

  if (!data) {
    redirect(routeMap.home);
    return null;
  }

  const { firstName, lastName, locale, timezone } = data;

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
    defaultValues: {
      firstName,
      lastName,
      locale,
      timezone,
    },
  });

  useEffect(() => {
    if (updatedData) {
      toast.success("Your profile has been updated");
      reset(updatedData);
    }
  }, [updatedData]);

  const timezoneOptions = useMemo(
    () => timezones?.map((t) => t.name) || [],
    [timezones]
  );

  if (loadingTimezones) {
    return <CircularProgress />;
  }
  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} md={6} alignItems="center">
        <Stack justifyContent="center" alignItems="center">
          <UploadAvatar />
        </Stack>
        <form
          onSubmit={handleSubmit((values) =>
            onSubmit(schema.cast(values, { stripUnknown: true }))
          )}
        >
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
            <Controller
              control={control}
              name="timezone"
              render={({ field: { value, onChange } }) => (
                <Autocomplete
                  value={value}
                  options={timezoneOptions}
                  onChange={(e, val: string) => onChange(val)}
                  disablePortal
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Timezone"
                      helperText={errors.timezone?.message as string}
                      error={Boolean(errors.timezone?.message)}
                    />
                  )}
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
        </form>
      </Grid>
    </Grid>
  );
}

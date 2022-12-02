import { Dialog, DialogContent, Stack, TextField } from "@mui/material";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { LoadingButton } from "@mui/lab";
import { yupResolver } from "@hookform/resolvers/yup";
import { UpdateTeamInput } from "src/__generated__/graphql";
import useUpdateTeam from "src/hooks/api/useUpdateTeam";

interface Props {
  open: boolean;
  onClose: () => void;
  defaultValues: UpdateTeamInput;
}

export default function UpdateTeamModal({
  open,
  onClose,
  defaultValues,
}: Props) {
  const schema = useMemo(
    () =>
      yup
        .object({
          name: yup
            .string()
            .trim()
            .required("What's the name of your team?")
            .max(80, "Name too long"),
        })
        .required(),
    []
  );

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
  } = useForm<UpdateTeamInput>({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const { onSubmit, loading, data } = useUpdateTeam();

  useEffect(() => {
    if (data) {
      onClose();
    }
  }, [data]);

  return (
    <Dialog open={open} fullWidth onClose={onClose} maxWidth="xs">
      <DialogContent>
        <Stack
          spacing={2}
          p={1}
          component="form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <TextField
            autoFocus
            fullWidth
            label="Team name"
            placeholder="My team name"
            error={Boolean(touchedFields.name && errors.name)}
            helperText={errors.name?.message as string}
            {...register("name")}
          />
          <LoadingButton
            loading={loading}
            type="submit"
            variant="contained"
            size="large"
          >
            Update Team
          </LoadingButton>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}

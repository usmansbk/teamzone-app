import { Modal, Paper, Stack, TextField } from "@mui/material";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { CreateTeamInput } from "src/__generated__/graphql";
import useCreateTeam from "src/hooks/api/useCreateTeam";
import { LoadingButton } from "@mui/lab";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function NewTeamModal({ open, onClose }: Props) {
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
  } = useForm<CreateTeamInput>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
    },
  });

  const { onSubmit, loading } = useCreateTeam();

  return (
    <Modal open={open} onClose={onClose}>
      <Paper
        sx={{
          position: "absolute" as "absolute",
          top: "20%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          boxShadow: 24,
          p: 4,
          width: 400,
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2}>
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
              Create New Team
            </LoadingButton>
          </Stack>
        </form>
      </Paper>
    </Modal>
  );
}

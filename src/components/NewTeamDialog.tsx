import { Dialog, DialogContent, Stack, TextField } from "@mui/material";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { CreateTeamInput } from "src/__generated__/graphql";
import useCreateTeam from "src/hooks/api/useCreateTeam";
import { LoadingButton } from "@mui/lab";
import { useNavigate } from "react-router-dom";
import routeMap from "src/routeMap";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function NewTeamDialog({ open, onClose }: Props) {
  const navigate = useNavigate();
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
    reset,
  } = useForm<CreateTeamInput>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
    },
  });

  const { onSubmit, loading, data } = useCreateTeam();

  useEffect(() => {
    if (open) {
      reset();
    }
  }, [open]);

  useEffect(() => {
    if (data) {
      onClose();
      navigate(routeMap.team.replace(":id", data.id));
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
            Create New Team
          </LoadingButton>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}

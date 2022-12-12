import { PushPin, PushPinOutlined } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import { useCallback } from "react";
import usePinTeam from "src/hooks/api/usePinTeam";
import useUnpinTeam from "src/hooks/api/useUnpinTeam";
import { Team } from "src/__generated__/graphql";

interface Props {
  team: Team;
}

export default function PinTeamButton({ team }: Props) {
  const { onSubmit: pin } = usePinTeam();
  const { onSubmit: unpin } = useUnpinTeam();

  const { id, isPinned } = team;
  const handleSubmit = useCallback(() => {
    if (team.isPinned) {
      unpin(id);
    } else {
      pin(id);
    }
  }, [isPinned]);

  const title = isPinned ? "Unpin" : "Pin to dashboard";
  return (
    <Tooltip placement="right" title={title}>
      <IconButton onClick={handleSubmit}>
        {isPinned ? (
          <PushPin fontSize="small" />
        ) : (
          <PushPinOutlined fontSize="small" />
        )}
      </IconButton>
    </Tooltip>
  );
}

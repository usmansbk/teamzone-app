import { Edit, PersonAdd } from "@mui/icons-material";
import {
  LinearProgress,
  Typography,
  Button,
  Stack,
  IconButton,
  Tooltip,
  Box,
} from "@mui/material";
import { useCallback, useState } from "react";
import { useParams } from "react-router-dom";
import DeleteTeamDialog from "src/components/DeleteTeamDialog";
import InviteMemberDialog from "src/components/InviteMemberDialog";
import LeaveTeamDialog from "src/components/LeaveTeamDialog";
import UpdateTeamDialog from "src/components/UpdateTeamDialog";
import useGetTeamById from "src/hooks/api/useGetTeamById";
import { Team, TeamMember } from "src/__generated__/graphql";
import TimezoneClocks from "src/components/TimezoneClocks";
import PinTeamButton from "src/components/PinTeamButton";
import MembersList from "./MembersList";

export default function TeamPage() {
  const { id } = useParams<{ id: string }>();
  const [openLeaveDialog, setOpenLeaveDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openInviteDialog, setOpenInviteDialog] = useState(false);

  const closeLeaveDialog = useCallback(() => setOpenLeaveDialog(false), []);
  const closeDeleteDialog = useCallback(() => setOpenDeleteDialog(false), []);
  const closeEditDialog = useCallback(() => setOpenEditDialog(false), []);
  const closeInviteDialog = useCallback(() => setOpenInviteDialog(false), []);

  const { loading, data, error } = useGetTeamById(id!);

  if (error) {
    throw error;
  }

  if (loading && !data) {
    return <LinearProgress />;
  }

  const { name, teammates, isOwner, isMember, inviteCode, isAdmin } = data!;

  return (
    <Box p={2}>
      <Stack direction="row" mb={1} spacing={1} flexWrap="wrap">
        <Typography variant="h4">{name}</Typography>
        <Stack direction="row" alignItems="center">
          {(isOwner || isAdmin) && (
            <Box>
              <Tooltip title="Edit team name">
                <IconButton
                  edge="start"
                  onClick={() => setOpenEditDialog(true)}
                >
                  <Edit fontSize="small" />
                </IconButton>
              </Tooltip>
            </Box>
          )}
          <Box>
            <PinTeamButton team={data! as Team} />
          </Box>
        </Stack>
      </Stack>
      <TimezoneClocks teammates={teammates as TeamMember[]} />
      <Stack spacing={2} mt={4} maxWidth="sm">
        <Box>
          <Stack
            direction="row"
            spacing={2}
            sx={{ justifyContent: "space-between" }}
          >
            <Typography variant="h6">Members</Typography>
            <Box>
              <Button
                size="small"
                startIcon={<PersonAdd fontSize="small" />}
                onClick={() => setOpenInviteDialog(true)}
              >
                Invite Teammates
              </Button>
            </Box>
          </Stack>
          <MembersList
            teammates={teammates as TeamMember[]}
            editable={isOwner || isAdmin}
          />
        </Box>
        <Stack spacing={1}>
          {isMember && (
            <Button
              size="large"
              onClick={() => setOpenLeaveDialog(true)}
              variant="outlined"
              color="secondary"
            >
              Leave team
            </Button>
          )}
          {(isOwner || isAdmin) && (
            <Button
              size="large"
              onClick={() => setOpenDeleteDialog(true)}
              variant="contained"
              color="secondary"
            >
              Delete team
            </Button>
          )}
        </Stack>
      </Stack>
      <LeaveTeamDialog
        title={name}
        onClose={closeLeaveDialog}
        open={openLeaveDialog}
      />
      <DeleteTeamDialog
        title={name}
        onClose={closeDeleteDialog}
        open={openDeleteDialog}
      />
      <UpdateTeamDialog
        open={openEditDialog}
        onClose={closeEditDialog}
        defaultValues={{
          id: id!,
          name,
        }}
      />
      <InviteMemberDialog
        code={inviteCode!}
        open={openInviteDialog}
        onClose={closeInviteDialog}
      />
    </Box>
  );
}

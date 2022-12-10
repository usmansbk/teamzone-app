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
import { useState } from "react";
import { useParams } from "react-router-dom";
import DeleteTeamDialog from "src/components/DeleteTeamDialog";
import InviteMemberDialog from "src/components/InviteMemberDialog";
import LeaveTeamDialog from "src/components/LeaveTeamDialog";
import UpdateTeamDialog from "src/components/UpdateTeamDialog";
import useGetTeamById from "src/hooks/api/useGetTeamById";
import { TeamMember } from "src/__generated__/graphql";
import TimezoneClocks from "src/components/TimezoneClocks";
import MembersList from "./MembersList";

export default function Team() {
  const { id } = useParams<{ id: string }>();
  const [openLeaveDialog, setOpenLeaveDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openInviteDialog, setOpenInviteDialog] = useState(false);

  const { loading, data, error } = useGetTeamById(id!);

  if (error) {
    throw error;
  }

  if (loading && !data) {
    return <LinearProgress />;
  }

  const { name, teammates, isOwner, isMember, inviteCode, isAdmin } = data!;

  return (
    <Box p={2} pt={0}>
      <Typography variant="h4" sx={{ wordBreak: "break-all", mb: 2 }}>
        {name}
        {(isOwner || isAdmin) && (
          <Tooltip title="Edit team name">
            <IconButton
              sx={{ ml: 1 }}
              size="small"
              onClick={() => setOpenEditDialog(true)}
            >
              <Edit fontSize="small" />
            </IconButton>
          </Tooltip>
        )}
      </Typography>
      <TimezoneClocks teammates={teammates as TeamMember[]} />
      <Stack spacing={2} mt={4} maxWidth="md">
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
      {isMember && (
        <LeaveTeamDialog
          title={name}
          onClose={() => setOpenLeaveDialog(false)}
          open={openLeaveDialog}
        />
      )}
      {(isOwner || isAdmin) && (
        <DeleteTeamDialog
          title={name}
          onClose={() => setOpenDeleteDialog(false)}
          open={openDeleteDialog}
        />
      )}
      {(isOwner || isAdmin) && (
        <UpdateTeamDialog
          open={openEditDialog}
          onClose={() => setOpenEditDialog(false)}
          defaultValues={{
            id: id!,
            name,
          }}
        />
      )}
      <InviteMemberDialog
        code={inviteCode!}
        open={openInviteDialog}
        onClose={() => setOpenInviteDialog(false)}
      />
    </Box>
  );
}

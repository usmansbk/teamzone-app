import {
  Container,
  LinearProgress,
  ListItem,
  Typography,
  List,
  ListItemText,
  ListSubheader,
  ListItemAvatar,
  Avatar,
  Chip,
  Grid,
  Button,
  Stack,
} from "@mui/material";
import { useState } from "react";
import { useParams } from "react-router-dom";
import DeleteTeamDialog from "src/components/DeleteTeamDialog";
import LeaveTeamDialog from "src/components/LeaveTeamDialog";
import useGetTeamById from "src/hooks/api/useGetTeamById";
import { TeamMember, TeamRole } from "src/__generated__/graphql";

function TeamMemberItem({ teammate }: { teammate: TeamMember }) {
  const { member, id, role } = teammate;

  const { fullName, picture, tzData } = member;

  const isAdmin = role === TeamRole.Admin;

  return (
    <ListItem key={id} disablePadding>
      <ListItemAvatar>
        <Avatar src={picture} alt={fullName} />
      </ListItemAvatar>
      <ListItemText
        primary={fullName}
        primaryTypographyProps={{
          fontWeight: 600,
        }}
        secondary={`${tzData?.currentTimeFormat}`}
      />
      {isAdmin && <Chip label="Admin" size="small" />}
    </ListItem>
  );
}

export default function Team() {
  const { id } = useParams<{ id: string }>();
  const [openLeaveDialog, setOpenLeaveDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const { loading, data, error } = useGetTeamById(id!);

  if (error) {
    throw error;
  }

  if (loading && !data) {
    return <LinearProgress />;
  }

  const { name, teammates, isOwner } = data!;

  return (
    <Container>
      <Typography variant="h4">{name}</Typography>
      <Grid container>
        <Grid item xs={12} md={6}>
          <Stack spacing={2}>
            <List disablePadding>
              <ListSubheader disableGutters>Team Members</ListSubheader>
              {teammates.map((teammate) => (
                <TeamMemberItem
                  key={teammate!.id}
                  teammate={teammate as TeamMember}
                />
              ))}
            </List>
            <Stack spacing={1}>
              <Button
                onClick={() => setOpenLeaveDialog(true)}
                variant="outlined"
              >
                Leave team
              </Button>
              {isOwner && (
                <Button
                  onClick={() => setOpenDeleteDialog(true)}
                  variant="contained"
                >
                  Delete team
                </Button>
              )}
            </Stack>
          </Stack>
        </Grid>
      </Grid>
      <LeaveTeamDialog
        title={name}
        onClose={() => setOpenLeaveDialog(false)}
        open={openLeaveDialog}
      />
      {isOwner && (
        <DeleteTeamDialog
          title={name}
          onClose={() => setOpenDeleteDialog(false)}
          open={openDeleteDialog}
        />
      )}
    </Container>
  );
}

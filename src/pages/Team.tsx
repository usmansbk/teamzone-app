import { Delete, Edit, MoreVert, Person, PersonAdd } from "@mui/icons-material";
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
  Button,
  Stack,
  IconButton,
  Tooltip,
  Menu,
  MenuItem,
  ListItemIcon,
} from "@mui/material";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import DeleteTeamDialog from "src/components/DeleteTeamDialog";
import InviteMemberDialog from "src/components/InviteMemberDialog";
import LeaveTeamDialog from "src/components/LeaveTeamDialog";
import UpdateTeamDialog from "src/components/UpdateTeamDialog";
import useGetTeamById from "src/hooks/api/useGetTeamById";
import { TeamMember, TeamRole } from "src/__generated__/graphql";

function TeamMemberItem({
  teammate,
  isOwner,
}: {
  teammate: TeamMember;
  isOwner: boolean;
}) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const { member, id, role } = teammate;

  const { fullName, picture, tzData } = member;

  const isAdmin = role === TeamRole.Admin;

  return (
    <>
      <ListItem
        key={id}
        disablePadding
        secondaryAction={
          !isOwner && (
            <IconButton edge="end" onClick={handleClick}>
              <MoreVert />
            </IconButton>
          )
        }
      >
        <ListItemAvatar>
          <Avatar src={picture} alt={fullName} />
        </ListItemAvatar>
        <ListItemText
          primary={
            <Typography sx={{ fontWeight: 600 }}>
              {fullName}
              {isAdmin && <Chip sx={{ ml: 1 }} label="Admin" size="small" />}
            </Typography>
          }
          primaryTypographyProps={{
            fontWeight: 600,
          }}
          secondary={`${tzData?.alternativeName}`}
        />
      </ListItem>
      <Menu
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Person fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Make admin" />
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Delete fontSize="small" color="secondary" />
          </ListItemIcon>
          <ListItemText primary="Remove from team" />
        </MenuItem>
      </Menu>
    </>
  );
}

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

  const { name, teammates, isOwner, isMember, inviteCode, owner } = data!;

  return (
    <Container maxWidth="md">
      <Typography variant="h4" sx={{ wordBreak: "break-all" }}>
        {name}
        {isOwner && (
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
      <Stack spacing={2}>
        <List disablePadding>
          <ListSubheader disableGutters>Team Members</ListSubheader>
          {teammates.map((teammate) => (
            <TeamMemberItem
              key={teammate!.id}
              teammate={teammate as TeamMember}
              isOwner={teammate?.member.id === owner.id}
            />
          ))}
        </List>
        <Stack spacing={1}>
          <Button
            variant="contained"
            size="large"
            startIcon={<PersonAdd />}
            onClick={() => setOpenInviteDialog(true)}
          >
            Invite Teammates
          </Button>
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
          {isOwner && (
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
      {isOwner && (
        <DeleteTeamDialog
          title={name}
          onClose={() => setOpenDeleteDialog(false)}
          open={openDeleteDialog}
        />
      )}
      {isOwner && (
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
    </Container>
  );
}

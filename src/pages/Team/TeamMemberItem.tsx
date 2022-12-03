import { Delete, MoreVert, Person } from "@mui/icons-material";
import {
  ListItem,
  Typography,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
} from "@mui/material";
import React, { memo, useState } from "react";
import MakeAdminDialog from "src/components/MakeAdminDialog";
import MakeMemberDialog from "src/components/MakeMemberDialog";
import RemoveTeamMemberDialog from "src/components/RemoveTeamMemberDialog";
import { TeamMember, TeamRole } from "src/__generated__/graphql";

function TeamMemberItem({
  teammate,
  isOwner,
}: {
  teammate: TeamMember;
  isOwner: boolean;
}) {
  const [openMakeAdminDialog, setOpenMakeAdminDialog] = useState(false);
  const [openMakeMemberDialog, setOpenMakeMemberDialog] = useState(false);
  const [openRemoveTeamMemberDialog, setOpenRemoveTeamMemberDialog] =
    useState(false);
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

  const isAdmin = role === TeamRole.Admin || isOwner;

  return (
    <>
      <ListItem
        key={id}
        disablePadding
        secondaryAction={
          !isAdmin && (
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
        {!isAdmin && (
          <MenuItem
            onClick={() => {
              setOpenMakeAdminDialog(true);
              handleClose();
            }}
          >
            <ListItemIcon>
              <Person fontSize="small" />
            </ListItemIcon>
            <ListItemText
              primary="Make admin"
              primaryTypographyProps={{ fontWeight: 500 }}
            />
          </MenuItem>
        )}
        {isAdmin && (
          <MenuItem
            onClick={() => {
              setOpenMakeMemberDialog(true);
              handleClose();
            }}
          >
            <ListItemIcon>
              <Person fontSize="small" />
            </ListItemIcon>
            <ListItemText
              primary="Make member"
              primaryTypographyProps={{ fontWeight: 500 }}
            />
          </MenuItem>
        )}
        <MenuItem
          onClick={() => {
            setOpenRemoveTeamMemberDialog(true);
            handleClose();
          }}
        >
          <ListItemIcon>
            <Delete fontSize="small" color="secondary" />
          </ListItemIcon>
          <ListItemText
            primary="Remove from team"
            primaryTypographyProps={{ fontWeight: 500 }}
          />
        </MenuItem>
      </Menu>
      <MakeAdminDialog
        id={id}
        open={openMakeAdminDialog}
        onClose={() => setOpenMakeAdminDialog(false)}
        name={fullName}
      />
      <RemoveTeamMemberDialog
        id={id}
        open={openRemoveTeamMemberDialog}
        onClose={() => setOpenRemoveTeamMemberDialog(false)}
        name={fullName}
      />
      <MakeMemberDialog
        id={id}
        open={openMakeMemberDialog}
        onClose={() => setOpenMakeMemberDialog(false)}
        name={fullName}
      />
    </>
  );
}

export default memo(TeamMemberItem);

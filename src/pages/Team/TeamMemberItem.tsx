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
  Stack,
} from "@mui/material";
import React, { memo, useState } from "react";
import MakeAdminDialog from "src/components/MakeAdminDialog";
import MakeMemberDialog from "src/components/MakeMemberDialog";
import RemoveTeamMemberDialog from "src/components/RemoveTeamMemberDialog";
import { TeamMember, TeamRole } from "src/__generated__/graphql";
import { getLocalTime } from "src/utils/dateTime";

function TeamMemberItem({
  teammate,
  hasPermission,
}: {
  teammate: TeamMember;
  hasPermission: boolean;
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
  const { member, id, role, isMe } = teammate;

  const { fullName, picture, tzData } = member;

  const isAdmin = role === TeamRole.Admin;

  const { name, countryName, abbreviation } = tzData!;

  return (
    <>
      <ListItem
        key={id}
        disablePadding
        secondaryAction={
          hasPermission &&
          !isMe && (
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
            <Stack direction="row">
              <Typography sx={{ fontWeight: 600 }}>{fullName}</Typography>
              {isAdmin && <Chip sx={{ ml: 1 }} label="Admin" size="small" />}
            </Stack>
          }
          primaryTypographyProps={{
            fontWeight: 600,
          }}
          secondary={
            <Typography variant="caption" sx={{ fontWeight: 700 }}>
              {getLocalTime(name)} {abbreviation}, {countryName}
            </Typography>
          }
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

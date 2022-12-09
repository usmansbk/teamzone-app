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
  List,
} from "@mui/material";
import React, { memo, useState } from "react";
import MakeAdminDialog from "src/components/MakeAdminDialog";
import MakeMemberDialog from "src/components/MakeMemberDialog";
import RemoveTeamMemberDialog from "src/components/RemoveTeamMemberDialog";
import formatTimezoneName from "src/utils/formatTimezoneName";
import { TeamMember, TeamRole } from "src/__generated__/graphql";

interface Props {
  teammate: TeamMember;
  hasPermission: boolean;
}

function TeamMemberItem({ teammate, hasPermission }: Props) {
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

  const { fullName, picture, tzData, timezone } = member;

  const isAdmin = role === TeamRole.Admin;

  const { countryName } = tzData!;

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
              <Typography fontWeight={900}>{fullName}</Typography>
              {isAdmin && <Chip sx={{ ml: 1 }} label="Admin" size="small" />}
            </Stack>
          }
          primaryTypographyProps={{
            fontWeight: 600,
          }}
          secondary={
            <Typography fontWeight={500}>
              {formatTimezoneName(timezone!)}, {countryName}
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
interface MemberListProps {
  teammates: TeamMember[];
  editable: boolean;
}

function MembersList({ teammates, editable }: MemberListProps) {
  return (
    <List>
      {teammates
        .filter((teammate) => teammate.member.tzData)
        .map((teammate) => (
          <TeamMemberItem
            teammate={teammate as any}
            key={teammate!.id}
            hasPermission={editable}
          />
        ))}
    </List>
  );
}

export default memo(MembersList);

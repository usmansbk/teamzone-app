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
} from "@mui/material";
import { useParams } from "react-router-dom";
import useGetTeamById from "src/hooks/api/useGetTeamById";
import { TeamMember, TeamRole } from "src/__generated__/graphql";

function TeamMemberItem({ teammate }: { teammate: TeamMember }) {
  const { member, id, team, role } = teammate;

  const { fullName, picture, tzData } = member;

  const isAdmin = team.isOwner || role === TeamRole.Admin;

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

  const { loading, data, error } = useGetTeamById(id!);

  if (error) {
    throw error;
  }

  if (loading && !data) {
    return <LinearProgress />;
  }

  const { name, teammates } = data!;

  return (
    <Container>
      <Typography variant="h4">{name}</Typography>
      <List disablePadding>
        <ListSubheader disableGutters>Team Members</ListSubheader>
        {teammates.map((teammate) => (
          <TeamMemberItem
            key={teammate!.id}
            teammate={teammate as TeamMember}
          />
        ))}
      </List>
    </Container>
  );
}

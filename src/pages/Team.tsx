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
            <Stack>
              <ListSubheader disableGutters>Danger Zone</ListSubheader>
              <Stack spacing={1}>
                <Button variant="outlined">Leave team</Button>
                {isOwner && <Button variant="contained">Delete team</Button>}
              </Stack>
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
}

import { Delete } from "@mui/icons-material";
import {
  Avatar,
  Box,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { getLocalTime } from "src/utils/dateTime";
import { TeamMember } from "src/__generated__/graphql";

interface Props {
  teammate: TeamMember;
  hasPermission: boolean;
}

export default function MemberCard({ teammate, hasPermission }: Props) {
  console.log(hasPermission);
  const { member } = teammate;
  const { fullName, tzData, picture } = member;
  const { countryName, name, rawFormat } = tzData!;
  return (
    <Box>
      <Stack spacing={1}>
        <Avatar src={picture} alt={fullName} sx={{ width: 100, height: 100 }} />
        <Box>
          <Typography variant="h5">{fullName}</Typography>
          <Typography variant="subtitle1">{countryName}</Typography>
          <Tooltip title={rawFormat}>
            <Typography>{getLocalTime(name)}</Typography>
          </Tooltip>
        </Box>
        <Box>
          <IconButton edge="end">
            <Delete />
          </IconButton>
        </Box>
      </Stack>
    </Box>
  );
}

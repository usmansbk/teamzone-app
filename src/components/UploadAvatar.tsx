import { Avatar } from "@mui/material";
import useMe from "src/hooks/api/useMe";

export default function UploadAvatar() {
  const { data } = useMe();
  const { picture, fullName } = data!;

  return (
    <Avatar src={picture} alt={fullName} sx={{ width: 120, height: 120 }} />
  );
}

import { Avatar, Box, CircularProgress, Tooltip } from "@mui/material";
import { useEffect, useRef } from "react";
import toast from "react-hot-toast";
import useMe from "src/hooks/api/useMe";
import useUploadAvatar from "src/hooks/api/useUploadAvatar";

export default function UploadAvatar() {
  const ref = useRef<HTMLInputElement | null>(null);
  const { data } = useMe();
  const { picture, fullName } = data!;
  const { loading, uploadAvatar, data: uploadData } = useUploadAvatar();

  useEffect(() => {
    if (uploadData) {
      toast.success("Profile picture changed");
    }
  }, [uploadData]);

  return (
    <Box>
      <Tooltip title="Upload profile image">
        <button
          type="button"
          style={{
            all: "unset",
            cursor: "pointer",
          }}
          onClick={() => ref.current?.click()}
        >
          {loading ? (
            <CircularProgress />
          ) : (
            <Avatar
              src={picture}
              alt={fullName}
              sx={{ width: 120, height: 120 }}
            />
          )}
        </button>
      </Tooltip>
      <input
        hidden
        ref={ref}
        type="file"
        accept="image/jpg,image/png"
        onChange={(e) => {
          if (e.currentTarget.files?.[0]) {
            uploadAvatar(e.currentTarget.files?.[0]);
          }
        }}
      />
    </Box>
  );
}

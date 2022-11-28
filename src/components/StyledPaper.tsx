import { Paper, styled } from "@mui/material";

export default styled(Paper)(({ theme }) => ({
  backgroundColor:
    theme.palette.grey[theme.palette.mode === "dark" ? 900 : 100],
  "&.MuiPaper-root:hover": {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === "dark" ? 800 : 200],
  },
}));

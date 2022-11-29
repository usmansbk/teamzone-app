import { DarkMode, LightMode } from "@mui/icons-material";
import { IconButton, Menu, MenuItem, Tooltip, useTheme } from "@mui/material";
import { useCallback, useState } from "react";
import useAppPreferences from "src/hooks/useAppPreferences";
import { AppTheme } from "src/types";

export default function ThemeButton() {
  const { palette } = useTheme();
  const { preferences, setTheme } = useAppPreferences();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    },
    []
  );

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOption = useCallback(
    (theme: AppTheme) => () => {
      setTheme(theme);
      handleClose();
    },
    []
  );

  return (
    <div>
      <Tooltip title="Toggle theme">
        <IconButton onClick={handleClick}>
          {palette.mode === "dark" ? <DarkMode /> : <LightMode />}
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        open={open}
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
        <MenuItem
          selected={preferences?.theme === "dark"}
          onClick={handleOption("dark")}
        >
          Dark
        </MenuItem>
        <MenuItem
          selected={preferences?.theme === "light"}
          onClick={handleOption("light")}
        >
          Light
        </MenuItem>
        <MenuItem
          selected={preferences?.theme === "system"}
          onClick={handleOption("system")}
        >
          System
        </MenuItem>
      </Menu>
    </div>
  );
}

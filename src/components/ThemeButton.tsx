import { DarkMode, LightMode, Settings } from "@mui/icons-material";
import {
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import { useCallback, useState } from "react";
import useAppPreferences from "src/hooks/useAppPreferences";
import { AppTheme } from "src/types";

const themes: { icon: JSX.Element; value: AppTheme }[] = [
  {
    icon: <DarkMode fontSize="small" />,
    value: "dark",
  },
  {
    icon: <LightMode fontSize="small" />,
    value: "light",
  },
  {
    icon: <Settings fontSize="small" />,
    value: "system",
  },
];
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
        sx={{
          padding: 0,
        }}
      >
        {themes.map(({ icon, value }) => (
          <MenuItem
            selected={value === preferences?.theme}
            onClick={handleOption(value)}
          >
            <ListItemIcon>{icon}</ListItemIcon>
            <Typography style={{ fontWeight: 700 }}>
              {value.toUpperCase()}
            </Typography>
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}

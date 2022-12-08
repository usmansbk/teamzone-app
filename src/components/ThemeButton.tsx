import { Brightness4, DarkMode, LightMode } from "@mui/icons-material";
import {
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
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
    icon: <Brightness4 fontSize="small" />,
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
      <IconButton onClick={handleClick}>
        {palette.mode === "dark" ? <DarkMode /> : <LightMode />}
      </IconButton>
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
            key={value}
            selected={value === preferences?.theme}
            onClick={handleOption(value)}
          >
            <ListItemIcon>{icon}</ListItemIcon>
            <Typography variant="caption" fontWeight={700}>
              {value.toUpperCase()}
            </Typography>
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}

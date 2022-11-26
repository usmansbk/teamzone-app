/* eslint-disable react/jsx-props-no-spreading */
import { forwardRef } from "react";
import { useTheme } from "@mui/material";
import { LinkProps, NavLink as RouterNavLink } from "react-router-dom";

const ThemedNavLink = forwardRef<any, LinkProps>((props, ref) => {
  const { palette } = useTheme();
  return (
    <RouterNavLink
      ref={ref}
      role={undefined}
      {...props}
      style={({ isActive }) => {
        if (isActive) {
          return {
            backgroundColor: palette.primary.main,
            color: palette.primary.contrastText,
          };
        }
        return undefined;
      }}
    />
  );
});

export default ThemedNavLink;

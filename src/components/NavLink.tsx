/* eslint-disable react/jsx-props-no-spreading */
import { forwardRef, CSSProperties } from "react";
import { useTheme } from "@mui/material";
import { LinkProps, NavLink as RouterNavLink } from "react-router-dom";

const NavLink = forwardRef<any, LinkProps>((props, ref) => {
  const { palette } = useTheme();
  return (
    <RouterNavLink
      ref={ref}
      role={undefined}
      {...props}
      style={({ isActive }) => {
        const styles: CSSProperties = {};

        if (isActive) {
          styles.backgroundColor = palette.primary.main;
          styles.color = palette.text.primary;
        }

        return styles;
      }}
    />
  );
});

export default NavLink;

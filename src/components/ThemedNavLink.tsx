import { forwardRef } from "react";
import { useTheme } from "@mui/material";
import { LinkProps, NavLink as RouterNavLink } from "react-router-dom";
import routeMap from "src/routeMap";

const ThemedNavLink = forwardRef<any, LinkProps>((props, ref) => {
  const { palette } = useTheme();
  return (
    <RouterNavLink
      ref={ref}
      end={props.to === routeMap.app}
      role={undefined}
      {...props}
      style={({ isActive }) => {
        if (isActive) {
          return {
            backgroundColor: palette.primary.light,
            color: palette.primary.contrastText,
          };
        }
        return undefined;
      }}
    />
  );
});

export default ThemedNavLink;

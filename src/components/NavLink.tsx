/* eslint-disable react/jsx-props-no-spreading */
import { forwardRef } from "react";
import { LinkProps, NavLink as RouterNavLink } from "react-router-dom";

const NavLink = forwardRef<any, LinkProps>((props, ref) => (
  <RouterNavLink ref={ref} role={undefined} {...props} />
));

export default NavLink;

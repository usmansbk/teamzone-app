/* eslint-disable react/jsx-props-no-spreading */
import { forwardRef } from "react";
import { LinkProps, Link } from "react-router-dom";

const LinkBehavior = forwardRef<any, Omit<LinkProps, "to">>((props, ref) => (
  <Link ref={ref} to="/" {...props} role={undefined} />
));

export default LinkBehavior;

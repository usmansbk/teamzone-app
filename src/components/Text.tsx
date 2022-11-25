import { PropsWithChildren } from "react";
import styled from "styled-components";

interface TypographyBaseProps extends PropsWithChildren {
  // size?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
  // type?: "primary" | "secondary" | "tertiary";
  variant?: "display" | "headline" | "title" | "body" | "label" | "caption";
}

const Display = styled.div`
  font-size: 9.25rem;
  line-height: 7.25rem;
  font-weight: 800;
  color: ${(props) => props.theme.colors.text};
`;

const Title = styled.h1`
  font-size: 2.25rem;
  line-height: 2.5rem;
  font-weight: 900;
  color: ${(props) => props.theme.colors.text};
`;

const Body = styled.p`
  font-size: 1.125rem;
  font-weight: 400;
  color: ${(props) => props.theme.colors.text};
`;

function Text({ variant, children }: TypographyBaseProps) {
  switch (variant) {
    case "display":
      return <Display>{children}</Display>;
    case "title":
      return <Title>{children}</Title>;
    default:
      return <Body>{children}</Body>;
  }
}

Text.defaultProps = {
  variant: "body",
  size: "md",
  type: "primary",
} as TypographyBaseProps;

export default Text;

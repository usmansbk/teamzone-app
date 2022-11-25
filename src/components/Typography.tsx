import styled from "styled-components";

interface TypographyBaseProps {
  readonly bold?: boolean;
  readonly inline?: boolean;
}
export const Display = styled.div`
  font-size: 148px;
  font-weight: 800;
  color: ${(props) => props.theme.colors.text};
  letter-spacing: 0;
`;

export const Headline1 = styled.h1`
  font-size: 36px;
  line-height: 40px;
  font-weight: 900;
  color: ${(props) => props.theme.colors.text};
  letter-spacing: 0;
`;

export const Headline2 = styled.h2`
  font-size: 28px;
  line-height: 36px;
  font-weight: 900;
  color: ${(props) => props.theme.colors.text};
  letter-spacing: 0;
`;

export const Title = styled.h6`
  font-size: 24px;
  line-height: 34px;
  font-weight: 700;
  color: ${(props) => props.theme.colors.text};
`;

export const SubTitle = styled.h6`
  font-size: 20px;
  line-height: 26px;
  font-weight: 700;
  color: ${(props) => props.theme.colors.text};
`;

export const Body1 = styled.p<TypographyBaseProps>`
  font-size: 24px;
  line-height: 32px;
  display: ${(props) => (props.inline ? "inline" : "block")};
  font-weight: ${(props) => (props.bold ? 900 : 400)};
  color: ${(props) => props.theme.colors.text};
`;

export const Body2 = styled.p<TypographyBaseProps>`
  font-size: 18px;
  line-height: 26px;
  font-weight: ${(props) => (props.bold ? 900 : 400)};
  color: ${(props) => props.theme.colors.text};
`;

export const Label = styled.p<TypographyBaseProps>`
  font-size: 18px;
  line-height: 26px;
  font-weight: ${(props) => (props.bold ? 900 : 400)};
  color: ${(props) => props.theme.colors.text};
`;

export const Caption = styled.p`
  font-size: 14px;
  line-height: 24px;
  font-weight: 400;
  color: ${(props) => props.theme.colors.text};
`;

export default Text;

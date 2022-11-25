import styled from "styled-components";

interface TypographyBaseProps {
  readonly bold?: boolean;
  readonly inline?: boolean;
}
export const Display = styled.div`
  font-size: 199px;
  font-weight: 800;
  color: ${(props) => props.theme.colors.text};
`;

export const Headline1 = styled.h1<TypographyBaseProps>`
  font-size: 36px;
  line-height: 40px;
  font-weight: ${(props) => (props.bold ? 900 : 400)};
  color: ${(props) => props.theme.colors.text};
`;

export const Headline2 = styled.h2<TypographyBaseProps>`
  font-size: 28px;
  line-height: 36px;
  font-weight: ${(props) => (props.bold ? 900 : 400)};
  color: ${(props) => props.theme.colors.text};
`;

export const Title = styled.h6`
  font-size: 24px;
  line-height: 34px;
  font-weight: 700;
  color: ${(props) => props.theme.colors.text};
`;

export const SubTitle = styled.h6<TypographyBaseProps>`
  font-size: 20px;
  line-height: 26px;
  font-weight: ${(props) => (props.bold ? 900 : 700)};
  color: ${(props) => props.theme.colors.text};
`;

export const Body = styled.p<TypographyBaseProps>`
  font-size: 18px;
  line-height: 22px;
  display: ${(props) => (props.inline ? "inline-block" : "block")};
  font-weight: ${(props) => (props.bold ? 900 : 400)};
  color: ${(props) => props.theme.colors.text};
`;

export const Label = styled.p<TypographyBaseProps>`
  font-size: 16px;
  line-height: 20px;
  font-weight: ${(props) => (props.bold ? 900 : 400)};
  color: ${(props) => props.theme.colors.text};
`;

export const Caption = styled.p`
  font-size: 14px;
  line-height: 18px;
  font-weight: 400;
  color: ${(props) => props.theme.colors.text};
`;

export const Link = styled.a`
  width: auto;
  display: inline-block;
  text-decoration: none;
  ${Body}, ${Display}, ${Headline1}, ${Headline2}, ${Label}, ${Caption}, ${Title} {
    transition: all 0.2s ease;
    padding: 0 4px;
    :hover {
      background-color: ${(props) => props.theme.colors.primary};
      color: ${(props) => props.theme.colors.onPrimary};
    }
  }
`;

export default Text;

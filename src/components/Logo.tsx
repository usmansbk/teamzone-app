import styled from "styled-components";

const StyledLogo = styled.div`
  text-transform: uppercase;
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  letter-spacing: 3px;
  padding: 20px 30px;
  background-color: ${(props) => props.theme.colors.primary};
  transition: background 0.2s ease;
  width: fit-content;
  color: #fff;
`;

export default function Logo() {
  return <StyledLogo>Teamzone</StyledLogo>;
}

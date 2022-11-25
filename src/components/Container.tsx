import styled from "styled-components";

const Container = styled.div<{ scrollable?: boolean }>`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  background-color: ${(props) => props.theme.colors.background};
  overflow-y: ${(props) => (props.scrollable ? "auto" : "hidden")};
`;

export default Container;

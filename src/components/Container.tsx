import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  background-color: ${(props) => props.theme.colors.background};
`;

export default Container;

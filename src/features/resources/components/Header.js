import styled from "styled-components";

export const Header = styled.h2`
  display: flex;
  align-items: flex-start;
  margin: ${({ theme }) => `0 ${theme.spacings(-5)} ${theme.spacings(5)}`};
  padding-right: ${({ theme }) => theme.spacings(5)};
  padding-left: ${({ theme }) => theme.spacings(2)};

  button {
    padding: ${({ theme }) => theme.spacings(2)};
  }
`;
import styled from "styled-components";

export const Header = styled.h4`
  display: flex;
  align-items: center;
  margin: ${({ theme }) => `0 ${theme.spacings(-5)} ${theme.spacings(5)}`};
  padding-right: ${({ theme }) => theme.spacings(5)};
  padding-left: ${({ theme }) => theme.spacings(2)};

  button {
    padding: ${({ theme }) => theme.spacings(2)};
    margin-right: ${({ theme }) => theme.spacings(2)};
  }
`;

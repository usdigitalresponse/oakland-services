import styled from "styled-components";

export const Text = styled.p`
  line-height: 1.6;
`;

export const Heading = styled.h1`
  font-size: ${({ theme }) => theme.typography.h1.fontSize};
  font-weight: ${({ theme }) => theme.typography.h1.fontWeight};
  margin: 0;
`;

export const Heading2 = styled.h2`
  font-size: ${({ theme }) => theme.typography.h2.fontSize};
  font-weight: ${({ theme }) => theme.typography.h2.fontWeight};
  margin: 0;
`;

export const Heading3 = styled.h3`
  font-size: ${({ theme }) => theme.typography.h3.fontSize};
  font-weight: ${({ theme }) => theme.typography.h3.fontWeight};
  margin: 0;
`;

export const Heading4 = styled.h4`
  font-size: ${({ theme }) => theme.typography.h4.fontSize};
  font-weight: ${({ theme }) => theme.typography.h4.fontWeight};
  margin: 0;
`;

export const Heading5 = styled.h5`
  font-size: ${({ theme }) => theme.typography.h5.fontSize};
  font-weight: ${({ theme }) => theme.typography.h5.fontWeight};
  margin: 0;
`;

import React from "react";
import styled, { css } from "styled-components";
import { useHistory } from "react-router-dom";
import { Icon } from "./Icon";

const variants = {
  primary: css`
    background-color: ${({ theme }) => theme.ui.button.background};
    color: ${({ theme }) => theme.ui.button.color};
    box-shadow: ${({ theme }) => theme.ui.button.shadow};
    &:hover {
      background-color: ${({ theme }) => theme.ui.button.hover.background};
    }
    &:disabled {
      cursor: not-allowed;
      background-color: ${({ theme }) => theme.ui.button.disabled.background};
      box-shadow: ${({ theme }) => theme.ui.button.disabled.shadow};
    }
  `,
  secondary: css`
    color: blue;
    background-color: red;
  `,
  link: css`
    background-color: transparent;
    color: initial;
    box-shadow: none;
    &:hover {
      background-color: ${({ theme }) => theme.ui.button.hover.backgroundGrey};
    }
  `,
  outline: css`
    border: 2px solid ${({ theme }) => theme.ui.border};
    background-color: transparent;
    color: initial;
    box-shadow: none;
    &:hover {
      background-color: ${({ theme }) => theme.ui.button.hover.backgroundGrey};
    }
  `,
};

export const Button = styled.button`
  display: inline-flex;
  align-items: center;
  padding: ${({ theme }) => `${theme.spacings(3)} ${theme.spacings(5)}`};
  font-weight: ${({ theme }) => theme.ui.button.fontWeight};
  border-radius: 4px;
  letter-spacing: -0.2px;
  transition: 0.1s ease;
  &:active {
    transform: scale(0.99);
  }
  ${(props) => variants[props.variant || "primary"]};
  width: ${({ fullWidth }) => (fullWidth ? "100%" : "auto")};
`;

export const BackButton = ({ onClick = () => {}, withIcon, ...rest }) => {
  const history = useHistory();

  const handleClick = () => {
    onClick();
    history.goBack();
  };

  return (
    <Button variant="link" onClick={handleClick} {...rest}>
      {withIcon ? (
        <IconContainer>
          <Icon icon="chevronLeft" size="sm" />
        </IconContainer>
      ) : (
        "Back"
      )}
    </Button>
  );
};

const IconContainer = styled.span`
  display: flex;
  margin-right: ${({ theme }) => theme.spacings(1)};
`;

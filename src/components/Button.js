import React from "react";
import styled, { css } from "styled-components";
import { useHistory } from "react-router-dom";
import { Icon } from "./Icon";

const variants = {
  primary: css`
    background-color: ${({ theme }) => theme.ui.button.primary.background};
    color: ${({ theme }) => theme.ui.button.primary.color};
    &:hover {
      background-color: ${({ theme }) =>
        theme.ui.button.primary.hover.background};
    }
    &:disabled {
      cursor: not-allowed;
      background-color: ${({ theme }) =>
        theme.ui.button.primary.disabled.background};
    }
  `,
  link: css`
    background-color: transparent;
    color: initial;
    box-shadow: none;
    &:hover {
      background-color: ${({ theme }) => theme.ui.button.link.hover.background};
    }
  `,
};

export const Button = styled.button`
  display: inline-flex;
  align-items: center;
  font-size: 14px;
  line-height: 18px;
  padding: ${({ theme }) => `${theme.spacings(3)} ${theme.spacings(5)}`};
  border-radius: 4px;
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

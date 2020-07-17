import React from "react";
import styled from "styled-components";
import { Icon } from "./Icon";

export const Checkbox = ({ id, children, ...rest }) => {
  return (
    <CheckboxContainer className="checkbox">
      <input type="checkbox" id={id} className="sr-only" {...rest} />
      {!!children ? <label htmlFor={id}>{children}</label> : null}
      <Icon icon="check" iconSize="sm" iconColor="white" />
    </CheckboxContainer>
  );
};

const CheckboxContainer = styled.div`
  position: relative;
  display: inline-flex;

  label {
    cursor: pointer;
    width: 100%;
    padding: ${({ theme }) => `${theme.spacings(2)}`};
    padding-left: ${({ theme }) => theme.spacings(7)};
  }

  label:before {
    content: "";
    position: absolute;
    left: ${({ theme }) => theme.spacings(0)};
    top: ${({ theme }) => theme.spacings(1)};
    width: ${({ theme }) => theme.spacings(6)};
    height: ${({ theme }) => theme.spacings(6)};
    border: 2px solid ${({ theme }) => theme.colors.grey};
    background: transparent;
    border-radius: 4px;
  }

  .icon {
    position: absolute;
    top: ${({ theme }) => theme.spacings(1.5)};
    left: ${({ theme }) => theme.spacings(0.5)};
    opacity: 0;
    transform: scale(0);
    transition: all 0.2s;
  }

  /* checked mark aspect changes */
  input:checked {
    & + label:before {
      background: ${({ theme }) => theme.colors.primary};
      border: 2px solid ${({ theme }) => theme.colors.primary};
    }

    & + label + .icon {
      opacity: 1;
      transform: scale(1);
    }
  }

  /* disabled checkbox */
  input:disabled + label:before {
    box-shadow: none;
    border-color: #bbb;
    background-color: #ddd;
  }
  input:disabled:checked + label + .icon {
    color: #999;
  }
  input:disabled + label {
    color: #aaa;
  }

  /* accessibility */
  input:focus + label:before {
    border: 2px solid ${({ theme }) => theme.colors.primary};
  }

  /* hover style just for information */
  label:hover:before {
    border: 2px solid ${({ theme }) => theme.colors.secondary};
  }
`;

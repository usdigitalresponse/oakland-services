import React from "react";
import styled from "styled-components";

const defaultProps = {
  id: "switch",
  name: "switch",
  checked: false,
  label: "This is a switch",
};

export const RadioSwitch = ({
  selected,
  switch1 = defaultProps,
  switch2 = defaultProps,
}) => {
  return (
    <RadioSwitchContainer className="radio-switch">
      <li className="radio-switch-item">
        <input
          className="radio-switch-input sr-only"
          type="radio"
          name={switch1.name}
          id={`radio-${switch1.id}`}
          checked={selected === switch1.id}
        />
        <label className="radio-switch-label" htmlFor={`radio-${switch1.id}`}>
          {switch1.label}
        </label>
      </li>

      <li className="radio-switch-item">
        <input
          className="radio-switch-input sr-only"
          type="radio"
          name={switch2.name}
          id={`radio-${switch2.id}`}
          checked={selected === switch2.id}
        />
        <label className="radio-switch-label" htmlFor={`radio-${switch2.id}`}>
          {switch2.label}
        </label>
        <div aria-hidden="true" className="radio-switch-marker" />
      </li>
    </RadioSwitchContainer>
  );
};

const RadioSwitchContainer = styled.ul`
  --color-primary: ${({ theme }) => theme.colors.primary};
  --radio-switch-width: 186px;
  --radio-switch-height: 46px;
  --radio-switch-padding: 3px;
  --radio-switch-radius: 50em;
  --radio-switch-animation-duration: 0.3s;

  &.radio-switch {
    position: relative;
    display: inline-block;
    display: inline-flex;
    padding: var(--radio-switch-padding);
    border-radius: calc(var(--radio-switch-radius) * 1.4);
    background-color: ${({ theme }) => theme.colors.border};

    &:focus-within,
    &:active {
      box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.border};
    }
  }

  .radio-switch-item {
    position: relative;
    display: inline-block;
    height: calc(var(--radio-switch-height) - 2 * var(--radio-switch-padding));
    width: calc(var(--radio-switch-width) * 0.5 - var(--radio-switch-padding));
  }

  .radio-switch-label {
    position: relative;
    z-index: 2;
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: center;
    border-radius: var(--radio-switch-radius);
    cursor: pointer;
    user-select: none;
    transition: all var(--radio-switch-animation-duration);
  }

  .radio-switch-input:checked ~ .radio-switch-label {
    color: #fff;
  }

  .radio-switch-input:focus ~ .radio-switch-label {
    background-color: lightness(var(--color-primary), 0.6);
  }

  :not(*):focus-within,
  .radio-switch-input:focus ~ .radio-switch-label {
    background-color: transparent;
  }

  .radio-switch-marker {
    position: absolute;
    z-index: 1;
    top: 0;
    left: -100%;
    border-radius: var(--radio-switch-radius);
    background-color: var(--color-primary);
    height: calc(var(--radio-switch-height) - 2 * var(--radio-switch-padding));
    width: calc(var(--radio-switch-width) * 0.5 - var(--radio-switch-padding));
    /* box-shadow: var(--shadow-md); */
    transition: transform var(--radio-switch-animation-duration);
  }

  .radio-switch-input:checked ~ .radio-switch-marker {
    transform: translateX(100%);
  }
`;

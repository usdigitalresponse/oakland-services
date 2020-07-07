import styled from "styled-components";

export const Navigation = styled.nav`
  margin: ${({ theme }) => `0 ${theme.spacings(-4)} ${theme.spacings(6)}`};
  background-color: #f2f2f2;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.15);

  .nav-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: ${({ theme }) => theme.spacings(3)} 0;
    position: relative;
    z-index: 2;
  }

  .title {
    color: #525f7f;
    text-align: center;
    line-height: 1.4;
    font-weight: 600;
    width: 100%;
    margin: 0 12px;
  }

  .fixed {
    width: 50px;
  }

  a,
  button {
    padding: ${({ theme }) => theme.spacings(3)};
    &:hover {
      color: ${({ theme }) => theme.colors.primary};
    }
  }

  .menu-container {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    padding-top: 80px;
    padding-bottom: 12px;
    text-align: center;
    background: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    transform: translateY(-100%);
    transition: 0.3s ease;
    z-index: 1;

    &.in {
      transform: translateY(0);
    }
  }

  .menu-backdrop {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: #00000052;
  }
`;

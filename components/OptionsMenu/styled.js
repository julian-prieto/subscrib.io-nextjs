import styled, { css } from "styled-components";

export const Wrapper = styled.div`
  position: relative;
  display: inline-block;
  z-index: 20;
`;

export const Trigger = styled.div`
  position: relative;

  display: flex;
  justify-content: center;
  align-items: center;

  width: 2rem;
  height: 2rem;

  font-size: 1.5rem;

  border-radius: 50%;

  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.colors.optionsMenu.trigger.hoverBackground};
  }

  ${(props) =>
    props.isOpen &&
    css`
      color: ${(props) => props.theme.colors.optionsMenu.menu.color};
      border-radius: 0.25rem;
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
      background-color: ${(props) => props.theme.colors.optionsMenu.menu.background};

      &:hover {
        background-color: ${(props) => props.theme.colors.optionsMenu.menu.background};
      }
    `}
`;

export const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;

  height: 100vh;
  width: 100vw;
`;

export const Menu = styled.div`
  position: absolute;
  right: 0;

  display: flex;
  flex-direction: column;

  padding: 0.5rem 0;

  border-radius: 0.25rem;
  border-top-right-radius: 0;

  background-color: ${(props) => props.theme.colors.optionsMenu.menu.background};
`;

export const MenuItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
  padding: 0.25rem 1rem;

  color: ${(props) => props.theme.colors.optionsMenu.menu.color};

  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.colors.optionsMenu.item.backgroundHover};
  }
`;

export const MenuItemLabel = styled.div``;
export const MenuItemIcon = styled.div`
  font-size: 0.75rem;
`;

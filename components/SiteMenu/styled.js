import styled from "styled-components";
import { motion } from "framer-motion";
import ThemeSwitch from "../ThemeSwitch";

export const Wrapper = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 0.5rem;
  margin-right: -0.25rem;

  background-color: transparent;

  border: none;
  border-radius: 50%;
  color: inherit;
  font-size: 1.5rem;
  cursor: pointer;

  &:hover {
    background-color: #fff4;
  }
`;

export const Backdrop = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;

  height: 100vh;
  width: 100vw;

  z-index: 10;

  background-color: ${(props) => props.theme.colors.modal.backdropBackground};
`;

export const Menu = styled(motion.aside)`
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  width: 100vw;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  padding: 2rem 1rem;

  background-color: ${(props) => props.theme.colors.siteMenu.background};
  color: ${(props) => props.theme.colors.siteMenu.color};

  z-index: 100;

  @media ${(props) => props.theme.devices.sm} {
    width: 30rem;
  }
`;

export const MenuListItem = styled.li`
  font-size: 2rem;

  transition: transform 0.1s ease-in;
  &:hover {
    transform: scale(1.1);
  }
`;

export const MenuList = styled.ul`
  list-style: none;
  padding: 0;
  margin: auto 0;
  /* margin-bottom: auto; */
  text-align: center;
  & > ${MenuListItem} + ${MenuListItem} {
    margin-top: 1.5rem;
  }
`;

export const MenuClose = styled.div`
  display: flex;
  align-items: center;

  padding: 0.25rem;

  position: absolute;
  right: 0;
  top: 0;
  margin: 2rem;

  font-size: 2rem;

  cursor: pointer;
  border-radius: 50%;

  &:hover {
    background-color: ${(props) => props.theme.colors.siteMenu.closeHover};
  }
`;

export const StyledThemeSwitch = styled(ThemeSwitch)`
  position: absolute;
  left: 0;
  top: 0;
  margin: 2rem;

  cursor: pointer;
`;

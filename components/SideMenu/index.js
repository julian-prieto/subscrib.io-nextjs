import styled, { css } from "styled-components";
import { motion, AnimateSharedLayout } from "framer-motion";
import { BsCreditCard2BackFill } from "react-icons/bs";
import { AiFillHome } from "react-icons/ai";
import { FaTags } from "react-icons/fa";
import { useUserPreferences } from "hooks";
import ThemeSwitch from "../ThemeSwitch";
import OptionItem from "./OptionItem";
import { HiChevronDoubleRight, HiChevronDoubleLeft } from "react-icons/hi";
{
  /* <ToggleButton onClick={() => toggleMenuOpen()} layout>
          {menuOpen ? <HiChevronDoubleLeft /> : <HiChevronDoubleRight />}
        </ToggleButton> */
}
const ToggleButton = styled(motion.button)`
  display: none;

  @media ${(props) => props.theme.devices.md} {
    display: flex;
    justify-content: center;
    align-items: center;

    padding: 0.75rem 1rem;

    width: 100%;

    font-size: 1rem;

    background-color: ${(props) => (props.theme.dark ? props.theme.colors.dark : props.theme.colors.light)};
    color: ${(props) => (props.theme.dark ? props.theme.colors.lighter : props.theme.colors.darker)};
    border-radius: 0.5rem;
    border: none;

    transition: background-color 0.2s ease-out, color 0.4s ease-out;

    &:hover {
      background-color: ${(props) =>
        props.theme.dark ? props.theme.colors.lighter : props.theme.colors.darker};
      color: ${(props) => (props.theme.dark ? props.theme.colors.darker : props.theme.colors.lighter)};

      cursor: pointer;
    }
  }
`;
const OPTION_ITEMS = [
  { label: "Home", route: "/", icon: <AiFillHome /> },
  { label: "Credit Cards", route: "/credit-cards", icon: <BsCreditCard2BackFill /> },
  { label: "Tags", route: "/tags", icon: <FaTags /> },
];

const SideMenu = ({ ...props }) => {
  const { menuOpen, toggleMenuOpen } = useUserPreferences();

  return (
    <Wrapper {...props} layout>
      <LogoContainer layout="position" $isOpen={menuOpen} whileTap={{ scale: 0.9 }}>
        <Logo>S</Logo>
      </LogoContainer>
      <AnimateSharedLayout>
        <Options>
          {OPTION_ITEMS.map((item) => (
            <OptionItem key={item.route} isMenuOpen={menuOpen} {...item} />
          ))}
        </Options>
      </AnimateSharedLayout>
      <ThemeSelector layout="position">
        <ThemeSwitch />
      </ThemeSelector>
      <ToggleButton onClick={() => toggleMenuOpen()} layout="position">
        {menuOpen ? <HiChevronDoubleLeft /> : <HiChevronDoubleRight />}
      </ToggleButton>
    </Wrapper>
  );
};

/********************* 
  STYLED COMPONENTS 
*********************/

const Wrapper = styled(motion.div)`
  display: grid;
  gap: 2rem;
  justify-items: center;
  align-items: center;
  grid-template-columns: 3rem 1fr 3rem;
  grid-template-rows: 1fr;

  padding: 0.25rem 0.5rem;

  background-color: ${(props) => props.theme.colors.sideMenu.background};

  @media ${(props) => props.theme.devices.md} {
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr auto;
    align-items: flex-start;

    padding: 1rem 0.5rem;

    ${(props) =>
      props.theme.dark
        ? css`
            box-shadow: -2px 0px 0px 0px rgba(0, 0, 0, 0.3) inset;
            border-right: 1px solid rgba(255, 255, 255, 0.2);
          `
        : css`
            box-shadow: -2px 0px 0px 0px rgba(255, 255, 255 0.3) inset;
            border-right: 1px solid rgba(0, 0, 0, 0.2);
          `}
  }
  ${(props) =>
    props.theme.dark
      ? css`
          box-shadow: 0px -2px 0px 0px rgba(0, 0, 0, 0.3) inset;
          border-bottom: 1px solid rgba(255, 255, 255, 0.2);
        `
      : css`
          box-shadow: 0px -2px 0px 0px rgba(255, 255, 255 0.3) inset;
          border-bottom: 1px solid rgba(0, 0, 0, 0.2);
        `}
`;

const LogoContainer = styled(motion.div)`
  background-color: ${(props) => (props.theme.dark ? props.theme.colors.dark : props.theme.colors.light)};
  width: 3rem;
  height: 3rem;

  border-radius: 1rem;

  display: flex;
  justify-content: center;
  align-items: center;

  user-select: none;
`;

const Logo = styled(motion.div)`
  font-size: 2rem;
  font-weight: 900;

  background: #f33cc2;
  background: -webkit-linear-gradient(to bottom, #f33cc2 25%, #9a4fdd 100%);
  background: -moz-linear-gradient(to bottom, #f33cc2 25%, #9a4fdd 100%);
  background: linear-gradient(to bottom, #f33cc2 25%, #9a4fdd 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Options = styled.div`
  padding: 0.5rem 0;
  display: flex;
  gap: 1rem;

  @media ${(props) => props.theme.devices.md} {
    display: block;
    padding: 1rem 0;
  }
`;

const ThemeSelector = styled(motion.div)`
  place-self: "end";
  align-self: "center";
`;

export default SideMenu;

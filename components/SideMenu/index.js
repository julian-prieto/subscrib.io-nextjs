import styled, { css } from "styled-components";
import { motion, AnimateSharedLayout } from "framer-motion";
import { BsCreditCard2BackFill } from "react-icons/bs";
import { AiFillHome, AiFillTags } from "react-icons/ai";
import { useUserPreferences } from "hooks";
import { colors } from "ui";
import ThemeSwitch from "../ThemeSwitch";
import OptionItem from "./OptionItem";

const OPTION_ITEMS = [
  { label: "Home", route: "/", icon: <AiFillHome /> },
  { label: "Credit Cards", route: "/credit-cards", icon: <BsCreditCard2BackFill /> },
  { label: "Tags", route: "/tags", icon: <AiFillTags /> },
];

const SideMenu = ({ ...props }) => {
  const { menuOpen, toggleMenuOpen } = useUserPreferences();

  return (
    <Wrapper {...props} layout>
      <Logo
        onClick={() => toggleMenuOpen()}
        layout="position"
        $isOpen={menuOpen}
        whileHover={{
          backgroundColor: [colors.option, colors.alert, colors.warning, colors.success, colors.option],
          transition: {
            loop: Infinity,
            duration: 4,
          },
        }}
        whileTap={{ scale: 0.9 }}
      >
        S
      </Logo>
      <AnimateSharedLayout>
        <Options>
          {OPTION_ITEMS.map((item) => (
            <OptionItem key={item.route} isMenuOpen={menuOpen} {...item} />
          ))}
        </Options>
      </AnimateSharedLayout>
      <motion.div layout="position">
        <ThemeSwitch />
      </motion.div>
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
  grid-template-columns: auto 1fr auto;
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

const Logo = styled(motion.div)`
  background-color: ${(props) => props.theme.colors.option};
  width: 3rem;
  height: 3rem;

  border-radius: 1rem;

  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 2rem;
  font-weight: bold;

  user-select: none;
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

export default SideMenu;

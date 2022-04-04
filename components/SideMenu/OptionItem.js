import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";
import { motion } from "framer-motion";

const spring = {
  type: "spring",
  stiffness: 500,
  damping: 30,
};

const OptionItem = ({ route, label, icon, isMenuOpen }) => {
  const router = useRouter();
  const isActive = router.pathname === route;

  return (
    <Link href={route} passHref>
      <Item layout>
        {isActive && <ItemActive transition={spring} layoutId="active" layout />}
        <ItemIcon layout>{icon}</ItemIcon>
        {isMenuOpen && (
          <ItemLabel $isActive={isActive} layout>
            {label}
          </ItemLabel>
        )}
      </Item>
    </Link>
  );
};

/********************* 
  STYLED COMPONENTS 
*********************/

const Item = styled(motion.a)`
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem;
`;

const ItemActive = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 0.5rem;
  background-color: ${(props) => props.theme.colors.sideMenu.activeBackground};
`;

const ItemIcon = styled(motion.div)`
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  z-index: 1;
`;

const ItemLabel = styled(motion.div)`
  z-index: 1;

  display: none;
  @media ${(props) => props.theme.devices.md} {
    display: block;
  }
`;

export default OptionItem;

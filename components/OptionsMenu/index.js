import { useState } from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { Backdrop, Wrapper, Trigger, Menu, MenuItem, MenuItemLabel, MenuItemIcon } from "./styled";

const OptionsMenu = ({ menuItems }) => {
  const [isOpen, setIsOpen] = useState(false);

  const executeActionAndCloseMenu = (action) => {
    if (action) {
      action();
    }
    setIsOpen(false);
  };

  if (!menuItems?.length) {
    return null;
  }

  return (
    <Wrapper>
      {isOpen && <Backdrop onClick={() => setIsOpen(false)} />}
      <Trigger isOpen={isOpen} onClick={() => setIsOpen((o) => !o)}>
        <BiDotsVerticalRounded />
      </Trigger>
      {isOpen && (
        <Menu>
          {menuItems.map((item) => (
            <MenuItem onClick={() => executeActionAndCloseMenu(item.action)} key={item.label}>
              {item.label && <MenuItemLabel>{item.label}</MenuItemLabel>}
              {item.icon && <MenuItemIcon>{item.icon}</MenuItemIcon>}
            </MenuItem>
          ))}
        </Menu>
      )}
    </Wrapper>
  );
};

export default OptionsMenu;

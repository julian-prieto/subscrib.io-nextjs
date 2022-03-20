import { useMemo, useState } from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { Backdrop, Wrapper, Trigger, Menu, MenuItem, MenuItemLabel, MenuItemIcon } from "./styled";

const OptionsMenu = ({ menuItems, renderIcon, renderMenu }) => {
  const [isOpen, setIsOpen] = useState(false);

  const executeActionAndCloseMenu = (action) => {
    if (action) {
      action();
    }
    setIsOpen(false);
  };

  const iconProps = useMemo(() => ({ isOpen, onClick: () => setIsOpen((o) => !o) }), [isOpen, setIsOpen]);

  if (!menuItems?.length && !renderMenu && !renderIcon) {
    return null;
  }

  return (
    <Wrapper>
      {isOpen && <Backdrop onClick={() => setIsOpen(false)} />}
      {renderIcon ? (
        <Trigger {...iconProps}>{renderIcon(iconProps)}</Trigger>
      ) : (
        <Trigger {...iconProps}>
          <BiDotsVerticalRounded />
        </Trigger>
      )}
      {isOpen && (
        <Menu>
          {renderMenu
            ? renderMenu({ isOpen, setIsOpen })
            : menuItems.map((item) => (
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

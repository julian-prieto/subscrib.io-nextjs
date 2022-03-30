import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { AnimatePresence } from "framer-motion";
import { FiMenu } from "react-icons/fi";
import { useAuth } from "hooks";
import { Wrapper, Menu, Backdrop, MenuList, MenuListItem, MenuClose, StyledThemeSwitch } from "./styled";
import Link from "next/link";
import { IoClose } from "react-icons/io5";

const dropIn = {
  hidden: {
    x: "100vw",
  },
  visible: {
    x: "0",
    transition: {
      duration: 0.3,
      type: "tween",
    },
  },
  exit: {
    x: "100vw",
    transition: {
      duration: 0.3,
    },
  },
};

const SiteMenu = () => {
  const router = useRouter();
  const { user, LogoutButton } = useAuth();

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.querySelector("body").style = "overflow: hidden;";
      return;
    }
    document.querySelector("body").style = "";
  }, [isOpen]);

  useEffect(() => {
    const handleClose = () => {
      setIsOpen(false);
    };

    router.events.on("routeChangeComplete", handleClose);
    router.events.on("routeChangeError", handleClose);

    return () => {
      router.events.off("routeChangeComplete", handleClose);
      router.events.off("routeChangeError", handleClose);
    };
  }, [router]);

  return (
    <>
      <Wrapper onClick={() => setIsOpen(true)}>
        <FiMenu />
      </Wrapper>
      <AnimatePresence initial={false} exitBeforeEnter={true}>
        {isOpen && (
          <>
            <Backdrop
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />
            <Menu variants={dropIn} initial="hidden" animate="visible" exit="exit">
              <MenuClose onClick={() => setIsOpen(false)}>
                <IoClose />
              </MenuClose>
              <StyledThemeSwitch />
              <MenuList>
                <MenuListItem>
                  <Link href="/">Home</Link>
                </MenuListItem>
                <MenuListItem>
                  <Link href="/credit-cards">Credit Cards</Link>
                </MenuListItem>
                <MenuListItem>
                  <Link href="/tags">Tags</Link>
                </MenuListItem>
              </MenuList>
              {user && <LogoutButton />}
            </Menu>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default SiteMenu;

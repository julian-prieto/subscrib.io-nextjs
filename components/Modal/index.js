import { useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { Button } from "ui";
import {
  Backdrop,
  Wrapper,
  ModalElement,
  ModalHeader,
  ModalTitle,
  ModalClose,
  ModalBody,
  ModalActions,
} from "./styled";
import { AnimatePresence } from "framer-motion";

const Modal = ({
  isOpen,
  onClose,
  content,
  confirmation,
  onConfirm,
  onCancel,
  closeOnClickOutside = false,
  type,
  maxWidth,
}) => {
  useEffect(() => {
    if (isOpen) {
      document.querySelector("body").style = "overflow: hidden;";
      return;
    }
    document.querySelector("body").style = "";
  }, [isOpen]);

  const dropIn = {
    hidden: {
      y: "-100vh",
      opacity: 0,
    },
    visible: {
      y: "0",
      opacity: 1,
      transition: {
        duration: 0.1,
        type: "spring",
        damping: 25,
        stiffness: 500,
      },
    },
    exit: {
      y: "100vh",
      opacity: 0,
    },
  };
  return (
    <AnimatePresence initial={false} exitBeforeEnter={true}>
      {isOpen && (
        <Wrapper>
          <Backdrop
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeOnClickOutside ? onCancel : null}
          />
          <ModalElement
            $maxWidth={maxWidth}
            $confirmation={confirmation}
            variants={dropIn}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {confirmation ? (
              <>
                <ModalHeader>{content.title}</ModalHeader>
                <ModalBody>{content.message}</ModalBody>
                <ModalActions>
                  <Button color="secondary" onClick={onCancel}>
                    {content.cancel}
                  </Button>
                  <Button color={type} onClick={onConfirm}>
                    {content.confirm}
                  </Button>
                </ModalActions>
              </>
            ) : (
              <>
                <ModalHeader>
                  <ModalTitle>{content.title}</ModalTitle>
                  <ModalClose onClick={onClose}>
                    <IoClose />
                  </ModalClose>
                </ModalHeader>
                {content.body}
              </>
            )}
          </ModalElement>
        </Wrapper>
      )}
    </AnimatePresence>
  );
};

export default Modal;

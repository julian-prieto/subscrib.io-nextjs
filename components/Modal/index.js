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

  if (!isOpen) {
    return null;
  }

  return (
    <Wrapper>
      <Backdrop onClick={closeOnClickOutside ? onCancel : null} />
      <ModalElement maxWidth={maxWidth}>
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
  );
};

export default Modal;

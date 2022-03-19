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
}) => {
  if (!isOpen) {
    return null;
  }

  return confirmation ? (
    <Wrapper>
      <Backdrop onClick={closeOnClickOutside ? onCancel : null} />
      <ModalElement>
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
      </ModalElement>
    </Wrapper>
  ) : (
    <Wrapper>
      <Backdrop onClick={closeOnClickOutside ? onCancel : null} />
      <ModalElement>
        <ModalHeader>
          <ModalTitle>{content.title}</ModalTitle>
          <ModalClose onClick={onClose}>
            <IoClose />
          </ModalClose>
        </ModalHeader>
        {content.body}
      </ModalElement>
    </Wrapper>
  );
};

export default Modal;

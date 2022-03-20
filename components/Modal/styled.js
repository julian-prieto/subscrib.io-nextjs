import styled from "styled-components";

export const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;

  display: flex;
  justify-content: center;
  align-items: center;

  height: 100vh;
  width: 100vw;

  z-index: 30;
`;

export const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;

  height: 100vh;
  width: 100vw;

  background-color: ${(props) => props.theme.colors.modal.backdropBackground};
`;

export const ModalElement = styled.div`
  width: 100%;
  height: 100%;

  padding: 1rem;

  @media ${(props) => props.theme.devices.sm} {
    width: unset;
    height: unset;
    min-width: 32rem;
    max-width: ${(props) => props.maxWidth && props.maxWidth};
  }

  position: relative;

  border-radius: 0.5rem;

  background-color: ${(props) => props.theme.colors.modal.background};
`;

export const ModalHeader = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 4rem;
`;

export const ModalTitle = styled.div`
  flex: 1;
  margin-top: 1.5rem;
`;

export const ModalClose = styled.div`
  display: flex;
  align-items: center;

  padding: 0.25rem;

  font-size: 2rem;

  cursor: pointer;
  border-radius: 50%;

  @media ${(props) => props.theme.devices.sm} {
    font-size: 1.25rem;
  }

  &:hover {
    background-color: ${(props) => props.theme.colors.modal.hoverBackground};
  }
`;

export const ModalBody = styled.div`
  display: flex;
`;
export const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
`;

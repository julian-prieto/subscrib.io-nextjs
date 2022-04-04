import styled, { css } from "styled-components";

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-bottom: 1.5rem;
`;

export const H1 = styled.h1`
  margin: 0px;
`;

export const H2 = styled.h2`
  margin: 0px;
  margin-bottom: 1rem;
`;

export const AddIcon = styled.div`
  position: relative;

  display: flex;
  justify-content: center;
  align-items: center;

  padding: 0.5rem;

  font-size: 1.5rem;

  border-radius: 50%;

  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.colors.optionsMenu.trigger.hoverBackground};
  }
`;

export const Subscriptions = styled.div`
  ${(props) =>
    props.layout === "GRID" &&
    css`
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(408px, 1fr));
      gap: 1rem;

      @media ${(props) => props.theme.devices.md} {
        gap: 1.25rem;
      }
    `}

  ${(props) =>
    props.layout === "LIST" &&
    css`
      /* padding: 0.5rem 0; */
      border-radius: 0.25rem;
      background: ${(props) => props.theme.colors.subscription.card.background};
    `}
`;

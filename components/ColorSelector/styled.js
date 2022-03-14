import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;

  border-radius: 0.75rem;
`;

export const Circle = styled.div`
  width: ${(props) => (props.small ? "1rem" : "2rem")};
  height: ${(props) => (props.small ? "1rem" : "2rem")};

  border-radius: 50%;
  background-color: ${(props) => props.color};

  opacity: ${(props) => (props.selected ? 1 : 0.3)};
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
    opacity: 1;
  }
`;

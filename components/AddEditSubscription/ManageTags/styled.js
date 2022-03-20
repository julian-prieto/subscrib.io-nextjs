import styled from "styled-components";

export const TagsContainer = styled.div`
  border-radius: 0.25rem;
  background-color: ${(props) => props.theme.colors.input.background};
`;

export const TagsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 0 0.5rem;

  border-top-left-radius: 0.25rem;
  border-top-right-radius: 0.25rem;
  background-color: ${(props) => props.theme.colors.input.labelBackground};
`;

export const TagsLabel = styled.label`
  display: block;
  padding: 0.5rem 0.5rem;
`;

export const TagsAddIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 0.75rem;

  border-radius: 50%;
  cursor: pointer;

  transform: ${(props) => (props.isOpen ? "rotate(45deg)" : "rotate(0)")};
  transition: transform 0.1s ease-out;
`;

export const TagsList = styled.div`
  display: flex;
  gap: 0.25rem;
  flex-wrap: wrap;
  padding: 1rem;
`;

export const TagOptions = styled.ul`
  list-style: none;
  padding: 0 1rem;
  font-size: 0.875rem;

  & > * + * {
    margin-top: 0.25rem;
  }
`;

export const TagOptionItem = styled.li`
  display: flex;
  flex-wrap: nowrap;
`;
export const TagOptionItemLabel = styled.label`
  cursor: pointer;
`;

export const TagOptionItemLabelTitle = styled.span`
  margin-left: 0.25rem;
`;

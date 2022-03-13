import styled from "styled-components";

export const H1 = styled.h1`
  margin: 0px;
`;

export const H2 = styled.h2`
  margin: 0px;
`;

export const Card = styled.div`
  margin-top: 2rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border-radius: 0.75rem;
  background-color: ${(props) => props.theme.colors.card.background};
  box-shadow: 2px 2px 4px 0px rgba(0, 0, 0, 0.1);
`;

export const TagList = styled.div`
  display: flex;
  gap: 0.25rem;
  flex-wrap: wrap;
`;

export const Form = styled.form``;

export const Actions = styled.div`
  display: flex;
  gap: 1rem;

  margin-top: 1rem;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
`;

import styled from "styled-components";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useSummary } from "../hooks";
import { Card } from "ui";

ChartJS.register(ArcElement, Tooltip, Legend);

const Charts = (props) => {
  const { charts } = useSummary({ costFrequency: "MONTHLY" });

  if (!charts) {
    return null;
  }

  return (
    <Wrapper {...props}>
      <ChartWrapper>
        <ChartTitle>Expenses by Credit Card</ChartTitle>
        <Doughnut data={charts.byCreditCard} />
      </ChartWrapper>
      <ChartWrapper>
        <ChartTitle>Expenses by Tag</ChartTitle>
        <Doughnut data={charts.byTag} />
      </ChartWrapper>
    </Wrapper>
  );
};

/********************* 
  STYLED COMPONENTS 
*********************/

const Wrapper = styled.div`
  display: grid;
  grid-template-rows: auto;
  gap: 2rem;
  justify-items: center;

  @media ${(props) => props.theme.devices.md} {
    grid-template-columns: auto auto;
  }
`;
const ChartTitle = styled.div`
  text-align: center;
`;
const ChartWrapper = styled(Card)`
  width: 100%;

  @media ${(props) => props.theme.devices.md} {
    width: 32rem;
  }
`;

export default Charts;

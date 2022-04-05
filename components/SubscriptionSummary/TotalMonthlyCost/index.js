import styled from "styled-components";
import { Card } from "ui";
import { useSummary } from "../hooks";
import { CURRENCY_SIGNS } from "utils";

const TotalMonthlyCost = (props) => {
  const { totalMonthlyCost } = useSummary({ costFrequency: "MONTHLY" });

  if (!totalMonthlyCost) {
    return null;
  }

  return (
    <Card {...props}>
      <Wrapper>
        <Title>Total monthly cost</Title>
        <Value>
          {CURRENCY_SIGNS[totalMonthlyCost.currency]} {totalMonthlyCost.value}
        </Value>
      </Wrapper>
    </Card>
  );
};

/********************* 
  STYLED COMPONENTS 
*********************/

const Wrapper = styled.div`
  display: grid;

  gap: 1rem;
`;

const Title = styled.span`
  font-size: 1.5rem;
  font-weight: 700;
`;

const Value = styled.div`
  font-size: 3rem;
  font-weight: 500;
`;

export default TotalMonthlyCost;

import { useState } from "react";
import styled from "styled-components";
import Table from "./Table";
import Charts from "./Charts";
import TotalMonthlyCost from "./TotalMonthlyCost";
import Hello from "./Hello";

const SubscriptionSummary = () => {
  // const [costFrequency, setCostFrequency] = useState("MONTHLY");

  return (
    <Grid>
      <Hello />
      <TotalMonthlyCost />
      <Table />
      {/* <Charts /> */}
    </Grid>
  );
};

/********************* 
  STYLED COMPONENTS 
*********************/

const H1 = styled.h1`
  margin: 0px;
`;

const Grid = styled.div`
  display: grid;
  gap: 1rem;

  grid-template-columns: 1fr;
  grid-template-rows: auto;

  @media ${(props) => props.theme.devices.md} {
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  }
`;

export default SubscriptionSummary;

import { useQuery } from "@apollo/client";
import { CreditCard } from "components";
import { GET_CREDIT_CARDS } from "graphql/queries";
import { useAuth } from "hooks";
import { Card, H1, Grid } from "./styled";

const AddEditCreditCard = () => {
  const { user } = useAuth();

  const { data: dataQuery, loading: loadingQuery } = useQuery(GET_CREDIT_CARDS, { skip: !user });

  return (
    <Card>
      <H1>CreditCards</H1>
      {loadingQuery && "Loading Credit Cards..."}
      <Grid>
        {dataQuery?.creditCards?.map((creditCard) => (
          <CreditCard key={creditCard.id} creditCard={creditCard} />
        ))}
      </Grid>
    </Card>
  );
};

export default AddEditCreditCard;

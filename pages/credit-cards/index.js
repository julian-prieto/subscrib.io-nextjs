import Head from "next/head";
import { AddEditCreditCard } from "components";
import { useAuth } from "hooks";

const CreditCards = () => {
  const { user } = useAuth();

  return (
    <>
      <Head>
        <title>Subscrib.io - Credit Cards</title>
        <meta name="description" content="Subscrib.io - Manage your credit cards" />
      </Head>
      {user ? <AddEditCreditCard /> : "Login to manage your credit cards"}
    </>
  );
};

export default CreditCards;

import Head from "next/head";
import { AddEditCreditCard } from "components";
import { useAuth } from "hooks";

const CreditCards = () => {
  const { user, LoginButton } = useAuth();

  return (
    <>
      <Head>
        <title>Subscrib.io - Credit Cards</title>
        <meta name="description" content="Subscrib.io - Manage your credit cards" />
      </Head>
      {user ? (
        <AddEditCreditCard />
      ) : (
        <div style={{ display: "flex", gap: "2rem", flexDirection: "column", alignItems: "center" }}>
          <div>Login to see your dashboard</div>
          <LoginButton />
        </div>
      )}
    </>
  );
};

export default CreditCards;

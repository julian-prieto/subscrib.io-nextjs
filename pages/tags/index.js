import Head from "next/head";
import { AddEditCreditCard } from "components";
import { useAuth } from "hooks";

const Tags = () => {
  const { user } = useAuth();

  return (
    <>
      <Head>
        <title>Subscrib.io - Tags</title>
        <meta name="description" content="Subscrib.io - Manage your tags" />
      </Head>
      {user ? <AddEditCreditCard /> : "Login to manage your tags"}
    </>
  );
};

export default Tags;

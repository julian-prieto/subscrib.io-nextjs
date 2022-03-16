import Head from "next/head";
import { AddEditTag } from "components";
import { useAuth } from "hooks";

const Tags = () => {
  const { user, LoginButton } = useAuth();

  return (
    <>
      <Head>
        <title>Subscrib.io - Tags</title>
        <meta name="description" content="Subscrib.io - Manage your tags" />
      </Head>
      {user ? (
        <AddEditTag />
      ) : (
        <div style={{ display: "flex", gap: "2rem", flexDirection: "column", alignItems: "center" }}>
          <div>Login to see your dashboard</div>
          <LoginButton />
        </div>
      )}
    </>
  );
};

export default Tags;

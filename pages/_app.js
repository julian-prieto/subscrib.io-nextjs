import { ApolloProvider } from "@apollo/client";
import { graphqlClient } from "graphql/client";
import { AppProvider } from "context";
import { Layout } from "ui";

const client = graphqlClient();

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <AppProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AppProvider>
    </ApolloProvider>
  );
}

export default MyApp;

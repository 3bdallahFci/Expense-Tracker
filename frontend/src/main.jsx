import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { GridBackgroundDemo } from "./components/ui/GridBackground.jsx";
import { ApolloClient, HttpLink, InMemoryCache, gql } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";

const client = new ApolloClient({
  link: new HttpLink({ uri: "http://localhost:4000/graphql",credentials:"include" }),
  cache: new InMemoryCache(),
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <GridBackgroundDemo>
        <ApolloProvider client={client}>
          <App />
        </ApolloProvider>
      </GridBackgroundDemo>
    </BrowserRouter>
  </StrictMode>,
);

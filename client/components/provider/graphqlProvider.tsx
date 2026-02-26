"use client"

import { globalFragment } from "@/lib/api/graphql/fragments";
import store from "@/store/store";
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { createFragmentRegistry } from "@apollo/client/cache";
import { SetContextLink } from "@apollo/client/link/context";
import { ApolloProvider } from "@apollo/client/react";


const authLink = new SetContextLink(({ headers }) => {
    // get the authentication token from redux store if it exists
    const state = store.getState();
    const token = state.auth.access_token;

    
    // return the headers to the context so httpLink can read them
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
        },
    };
});
const httpLink = new HttpLink({
    uri: process.env.NEXT_PUBLIC_BASE_GRAPHQL_URL || "http://localhost:80/graphql",
    credentials: "include",

})

const client = new ApolloClient({
    cache: new InMemoryCache({
        fragments:createFragmentRegistry(globalFragment),
    }),
    link: authLink.concat(httpLink),
    // Enable Apollo DevTools in development
    connectToDevTools: process.env.NODE_ENV === "development",
})

function GraphqlProvider({ children }: { children: React.ReactNode }) {
  
    return (
        <ApolloProvider client={client}>
            {children}
        </ApolloProvider>
    )
}

export default GraphqlProvider
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

export const client = new ApolloClient({
  link: new HttpLink({
    uri: process.env.ERXES_API_URL,
    credentials: "include",
    headers: {
      "x-app-token": process.env.ERXES_APP_TOKEN || "",
    },
  }),
  cache: new InMemoryCache(),
});

// import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

// export const client = new ApolloClient({
//   link: new HttpLink({
//     uri: process.env.NEXT_PUBLIC_ERXES_API_URL,
//     credentials: "include",
//     headers: {
//       "x-app-token": process.env.NEXT_PUBLIC_ERXES_APP_TOKEN || "",
//     },
//   }),
//   cache: new InMemoryCache(),
// });

import ReactDOM from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import './style.css'
const cache = new InMemoryCache();
import { Steps, Hints } from 'intro.js-react';

const client = new ApolloClient({
  uri: "http://localhost:9000",
  cache: cache,
  headers:{
    authorization  : localStorage.getItem('userToken') || null
    }
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </BrowserRouter>
);

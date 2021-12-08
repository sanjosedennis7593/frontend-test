import { BrowserRouter as Router } from "react-router-dom";
import {
  ApolloProvider
} from "@apollo/client";

import './App.css';

import AppRoutes from "./routes";

import Client from '@app/graphql/server';



function App() {
  return (
    <ApolloProvider client={Client}>
      <Router>
        <AppRoutes />
      </Router>
    </ApolloProvider>

  );
}

export default App;

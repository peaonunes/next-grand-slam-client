import { useQuery, useSubscription, useMutation } from "@apollo/react-hooks";
import { ApolloProvider } from "react-apollo";
import * as React from "react";
import gql from "graphql-tag";

import { client } from "./client";
import "./styles.css";
import { PieChart } from "./PieChart";

const QUERY = gql`
  query {
    scoreboard {
      id
      name
      votes
    }
  }
`;

const MUTATION = gql`
  mutation vote($id: ID!) {
    vote(id: $id) {
      id
      name
    }
  }
`;

const SUBSCRIPTION = gql`
  subscription {
    scoreboard {
      id
      name
      votes
    }
  }
`;

function Scoreboard() {
  const { loading, error, data } = useQuery(QUERY);
  const [vote] = useMutation(MUTATION);

  if (error) return <span>Eeeps.</span>;
  if (loading) return <p>Loading options...</p>;

  return (
    <div className="content">
      <div className="options">
        {data.scoreboard.map((board: any, index: number) => (
          <button
            key={index}
            onClick={() => vote({ variables: { id: board.id } })}
          >
            {board.name}
          </button>
        ))}
      </div>
      <br />
      <div className="chart">
        <Results initalData={data} />
      </div>
    </div>
  );
}

function Results({ initalData }) {
  const { data, error } = useSubscription(SUBSCRIPTION);
  if (error) return <span>Eeeps.</span>;
  const values = data?.scoreboard || initalData.scoreboard;

  return <PieChart values={values} />;
}

export default function App() {
  return (
    <ApolloProvider client={client}>
      <main className="App">
        <Scoreboard />
      </main>
    </ApolloProvider>
  );
}

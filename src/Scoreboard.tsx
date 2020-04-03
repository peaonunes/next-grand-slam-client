import { useQuery, useSubscription, useMutation } from '@apollo/react-hooks';
import createPersistedState from 'use-persisted-state';
import * as React from 'react';
import gql from 'graphql-tag';

import { PieChart } from './PieChart';
import { IScoreboard } from './types';

const useVote = createPersistedState('voted');

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
  const [voted, setVote] = useVote();
  const { loading, error, data } = useQuery(QUERY);
  const [vote] = useMutation(MUTATION);

  const handleClick = (id: string): void => {
    vote({ variables: { id } }).then(() => setVote(id));
  };

  if (error) return <h1>Eeeps.</h1>;
  if (loading) return <p>Loading options...</p>;

  return (
    <div className="content">
      <div className="message">
        {!voted && <p>Where should I go next?</p>}
        {!!voted && <p>Thanks for voting!</p>}
      </div>
      {!voted && (
        <div className="options">
          {data.scoreboard.map((board: IScoreboard, index: number) => (
            <button
              key={index}
              style={{ color: board.id === '0' ? '#9FB641' : '#5A91D3' }}
              onClick={() => handleClick(board.id)}
            >
              {board.name}
            </button>
          ))}
        </div>
      )}
      <div className="chart">
        <Results initalData={data} />
      </div>
    </div>
  );
}

interface DataReponse {
  scoreboard: IScoreboard[];
}

interface ResultsProps {
  initalData: DataReponse;
}

function Results({ initalData }: ResultsProps) {
  const { data, error } = useSubscription(SUBSCRIPTION);

  if (error) return <h1>Eeeps.</h1>;

  let values = initalData.scoreboard;

  if (!!data) {
    values = data.scoreboard;
  }

  return <PieChart values={values} />;
}

export { Scoreboard };

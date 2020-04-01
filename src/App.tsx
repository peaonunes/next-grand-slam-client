import { ApolloProvider } from 'react-apollo';
import * as React from 'react';

import { Scoreboard } from './Scoreboard';
import { client } from './client';
import './styles.css';

export default function App() {
  return (
    <ApolloProvider client={client}>
      <main className="App">
        <h1>
          Next Grand Slam{' '}
          <span role="img" aria-label="tennis ball">
            🎾
          </span>
        </h1>
        <Scoreboard />
      </main>
    </ApolloProvider>
  );
}

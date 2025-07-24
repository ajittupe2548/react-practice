import React, { useState } from 'react';
import { ApolloProvider } from '@apollo/client';
import client from './apollo/client';
import CountryList from './components/CountryList';
import SearchAndFilter from './components/SearchAndFilter';
import './App.css';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedContinent, setSelectedContinent] = useState('');

  return (
    <ApolloProvider client={client}>
      <div className="App">
        <header className="App-header">
          <h1>🚀 GraphQL Countries Example</h1>
          <p>Custom GraphQL server with countries data</p>
        </header>

        <main className="App-main">
          <SearchAndFilter
            searchTerm={searchTerm}
            selectedContinent={selectedContinent}
            onSearchChange={setSearchTerm}
            onContinentChange={setSelectedContinent}
          />

          <CountryList
            searchTerm={searchTerm}
            selectedContinent={selectedContinent}
          />
        </main>

        <footer className="App-footer">
          <p>
            Built with React & GraphQL | Custom Apollo Server
          </p>
        </footer>
      </div>
    </ApolloProvider>
  );
}

export default App;
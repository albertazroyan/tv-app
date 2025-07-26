import React from 'react';
import { AppProviders } from '@app/providers';
import { AppRouter } from '@app/routing';
import './App.css';

function App() {
  return (
    <AppProviders>
      <AppRouter />
    </AppProviders>
  );
}

export default App;

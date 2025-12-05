import React from 'react';
import TransactionTable from './components/TransactionTable';
import './App.css'; 

function App() {
  return (
    <div className="app-container">
      {/* POS Title */}
      <header className="pos-header">
        <h1>Turah Rae Global Ventures</h1>
        <p className="pos-tagline">Elegance in Every Transaction</p>
      </header>

      {/* Render the Transaction Table component */}
      <main className="transaction-table-container">
        <TransactionTable />
      </main>
    </div>
  );
}

export default App;

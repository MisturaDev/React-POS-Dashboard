import React from 'react';
import TransactionTable from './components/TransactionTable';

function App() {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Turah Rae POS Dashboard</h1>

      {/* Render the Transaction Table component */}
      <TransactionTable />
    </div>
  );
}

export default App;

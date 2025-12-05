import React, { useState } from 'react';

const TransactionTable = () => {
  const [transactions, setTransactions] = useState([
    { id: 1, posCharges: 300, type: 'Deposit', amount: 12000, charges: 100, notes: 'Customer A' },
    { id: 2, posCharges: 400, type: 'Withdraw', amount: 20400, charges: 150, notes: 'Customer B' },
    { id: 3, posCharges: 100, type: 'Withdraw', amount: 1600, charges: 50, notes: 'Customer C' },
  ]);

  const [formData, setFormData] = useState({
    posCharges: '',
    type: 'Deposit',
    amount: '',
    charges: '',
    notes: '',
  });

  // Handle form input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    const newTransaction = {
      id: transactions.length + 1,
      posCharges: Number(formData.posCharges),
      type: formData.type,
      amount: Number(formData.amount),
      charges: Number(formData.charges),
      notes: formData.notes,
    };

    setTransactions([...transactions, newTransaction]);

    // Clear form
    setFormData({ posCharges: '', type: 'Deposit', amount: '', charges: '', notes: '' });
  };

  return (
    <div style={{ marginTop: '20px' }}>
      <h2>Transactions</h2>

      {/* Form to add new transaction */}
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <input
          type="number"
          name="posCharges"
          placeholder="POS Charges"
          value={formData.posCharges}
          onChange={handleChange}
          required
          style={{ marginRight: '10px' }}
        />
        <select name="type" value={formData.type} onChange={handleChange} style={{ marginRight: '10px' }}>
          <option value="Deposit">Deposit</option>
          <option value="Withdraw">Withdraw</option>
          <option value="Airtime">Airtime</option>
          <option value="Data">Data</option>
          <option value="Pay Bills">Pay Bills</option>
        </select>
        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={formData.amount}
          onChange={handleChange}
          required
          style={{ marginRight: '10px' }}
        />
        <input
          type="number"
          name="charges"
          placeholder="Charges"
          value={formData.charges}
          onChange={handleChange}
          required
          style={{ marginRight: '10px' }}
        />
        <input
          type="text"
          name="notes"
          placeholder="Notes"
          value={formData.notes}
          onChange={handleChange}
          style={{ marginRight: '10px' }}
        />
        <button type="submit">Add Transaction</button>
      </form>

      {/* Transaction Table */}
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #ccc', textAlign: 'left' }}>
            <th>S/N</th>
            <th>POS Charges</th>
            <th>Transaction Type</th>
            <th>Amount</th>
            <th>Charges</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx, index) => (
            <tr key={tx.id} style={{ borderBottom: '1px solid #eee' }}>
              <td>{index + 1}</td>
              <td>{tx.posCharges.toLocaleString()}</td>
              <td>{tx.type}</td>
              <td>{tx.amount.toLocaleString()}</td>
              <td>{tx.charges.toLocaleString()}</td>
              <td>{tx.notes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;

import React, { useState } from 'react';
import './TransactionTable.css';

// Customer charge table
const customerChargeTable = [
  { min: 100, max: 1000, charge: 100 },
  { min: 1001, max: 5000, charge: 100 },
  { min: 5001, max: 10000, charge: 200 },
  { min: 10001, max: 15000, charge: 300 },
  { min: 15001, max: 20000, charge: 400 },
  { min: 20001, max: 25000, charge: 500 },
  { min: 25001, max: 30000, charge: 600 },
  { min: 30001, max: 35000, charge: 700 },
  { min: 35001, max: 40000, charge: 800 },
  { min: 40001, max: 45000, charge: 900 },
  { min: 45001, max: 50000, charge: 1000 },
  { min: 50001, max: 55000, charge: 1100 },
  { min: 55001, max: 60000, charge: 1200 },
  { min: 60001, max: 65000, charge: 1300 },
  { min: 65001, max: 70000, charge: 1400 },
  { min: 70001, max: 75000, charge: 1500 },
  { min: 75001, max: 80000, charge: 1600 },
  { min: 80001, max: 85000, charge: 1700 },
  { min: 85001, max: 90000, charge: 1800 },
  { min: 90001, max: 95000, charge: 1900 },
  { min: 95001, max: 100000, charge: 2000 },
];

// POS charge rules
const calculatePOSCharge = (type, amount) => {
  if (type === 'Deposit') return 20;
  if (type === 'Withdraw') {
    if (amount < 10000) return Math.ceil(amount * 0.005);
    if (amount >= 10000 && amount < 20000) return 50;
    if (amount >= 20000) return 100;
  }
  if (['Airtime', 'Data', 'Pay Bills'].includes(type)) return 50;
  return 0;
};

// Customer charge
const calculateCustomerCharge = (amount) => {
  const rule = customerChargeTable.find((r) => amount >= r.min && amount <= r.max);
  return rule ? rule.charge : 0;
};

const TransactionTable = () => {
  const [transactions, setTransactions] = useState([]);
  const [formData, setFormData] = useState({ type: 'Deposit', amount: '', notes: '' });

  // Editable balances
  const [openingBalance, setOpeningBalance] = useState(95000);
  const [walletBalance, setWalletBalance] = useState(30810.28);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const amount = Number(formData.amount);
    const posCharge = calculatePOSCharge(formData.type, amount);
    const customerCharge = calculateCustomerCharge(amount);

    const today = new Date();
    const formattedDate = `${today.getDate().toString().padStart(2, '0')}/${
      (today.getMonth() + 1).toString().padStart(2, '0')
    }/${today.getFullYear()}`;

    const newTransaction = {
      id: transactions.length + 1,
      date: formattedDate,
      type: formData.type,
      amount,
      posCharge,
      customerCharge,
      notes: formData.notes,
    };

    setTransactions([...transactions, newTransaction]);
    setFormData({ type: 'Deposit', amount: '', notes: '' });
  };

  const handleTableEdit = (id, field, value) => {
    setTransactions(transactions.map((tx) => 
      tx.id === id ? { ...tx, [field]: field === 'type' ? value : Number(value) || value } : tx
    ));
  };

  const handleDelete = (id) => setTransactions(transactions.filter((tx) => tx.id !== id));

  const totalDeposits = transactions.filter((tx) => tx.type === 'Deposit')
    .reduce((sum, tx) => sum + tx.amount, 0);

  const totalWithdrawals = transactions.filter((tx) => tx.type === 'Withdraw')
    .reduce((sum, tx) => sum + tx.amount, 0);

  const totalPOS = transactions.reduce((sum, tx) => sum + tx.posCharge, 0);
  const totalCustomer = transactions.reduce((sum, tx) => sum + tx.customerCharge, 0);

  const closingBalance = Number(openingBalance) + totalDeposits - totalWithdrawals - totalPOS;

  return (
    <div className="transaction-dashboard">
       {/* Balances */}
      <div className="balances">
        <label>
          Opening Balance: ₦
          <input type="number" value={openingBalance} onChange={(e) => setOpeningBalance(Number(e.target.value))} />
        </label>
        <label>
          Wallet Balance: ₦
          <input type="number" value={walletBalance} onChange={(e) => setWalletBalance(Number(e.target.value))} />
        </label>
        <div className="closing-balance">
          Closing Balance: ₦{closingBalance.toLocaleString()}
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="transaction-form">
        <select name="type" value={formData.type} onChange={handleChange}>
          <option value="Deposit">Deposit</option>
          <option value="Withdraw">Withdraw</option>
          <option value="Airtime">Airtime</option>
          <option value="Data">Data</option>
          <option value="Pay Bills">Pay Bills</option>
        </select>

        <input type="number" name="amount" placeholder="Amount" value={formData.amount} onChange={handleChange} required />
        <input type="text" name="notes" placeholder="Notes" value={formData.notes} onChange={handleChange} />
        <button type="submit">Add Transaction</button>
      </form>

      {/* Table */}
      <table className="transaction-table">
        <thead>
          <tr>
            <th>S/N</th>
            <th>Date</th>
            <th>Transaction Type</th>
            <th>Amount</th>
            <th>POS Charge</th>
            <th>Customer Charge</th>
            <th>Notes</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx, index) => (
            <tr key={tx.id}>
              <td>{index + 1}</td>
              <td>{tx.date}</td>
              <td>{tx.type}</td>
              <td><input type="number" value={tx.amount} onChange={(e) => handleTableEdit(tx.id, 'amount', e.target.value)} /></td>
              <td><input type="number" value={tx.posCharge} onChange={(e) => handleTableEdit(tx.id, 'posCharge', e.target.value)} /></td>
              <td><input type="number" value={tx.customerCharge} onChange={(e) => handleTableEdit(tx.id, 'customerCharge', e.target.value)} /></td>
              <td><input type="text" value={tx.notes} onChange={(e) => handleTableEdit(tx.id, 'notes', e.target.value)} /></td>
              <td><button onClick={() => handleDelete(tx.id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;

import React, { useState, useEffect } from 'react';
import { View, Transaction, GroceryItem } from './types';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import TransactionList from './components/TransactionList';
import AIForecast from './components/AIForecast';
import SupermarketList from './components/SupermarketList';
import GoalsView from './components/GoalsView';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.DASHBOARD);
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem('maneki_transactions');
    return saved ? JSON.parse(saved) : [];
  });
  const [groceryItems, setGroceryItems] = useState<GroceryItem[]>(() => {
    const saved = localStorage.getItem('maneki_groceries');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('maneki_transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('maneki_groceries', JSON.stringify(groceryItems));
  }, [groceryItems]);

  const addTransaction = (t: Omit<Transaction, 'id'>) => {
    const newT: Transaction = { ...t, id: crypto.randomUUID() };
    setTransactions(prev => [newT, ...prev]);
  };

  const deleteTransaction = (id: string) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  const addGroceryItem = (name: string, price: number) => {
    const newItem: GroceryItem = { id: crypto.randomUUID(), name, price, completed: false };
    setGroceryItems(prev => [...prev, newItem]);
  };

  const toggleGroceryItem = (id: string) => {
    setGroceryItems(prev => prev.map(item => item.id === id ? { ...item, completed: !item.completed } : item));
  };

  const removeGroceryItem = (id: string) => {
    setGroceryItems(prev => prev.filter(item => item.id !== id));
  };

  const convertGroceries = () => {
    const total = groceryItems.reduce((acc, i) => acc + i.price, 0);
    if (total > 0) {
      addTransaction({
        amount: total,
        description: 'Supermercado',
        category: 'Comida',
        date: new Date().toISOString().split('T')[0],
        type: 'expense'
      });
      setGroceryItems([]);
      setCurrentView(View.TRANSACTIONS);
    }
  };

  const renderContent = () => {
    switch (currentView) {
      case View.DASHBOARD: return <Dashboard transactions={transactions} />;
      case View.TRANSACTIONS: return <TransactionList transactions={transactions} onAdd={addTransaction} onDelete={deleteTransaction} />;
      case View.BUDGET: return <GoalsView transactions={transactions} />;
      case View.AI_FORECAST: return <AIForecast transactions={transactions} />;
      case View.SUPERMARKET: return <SupermarketList items={groceryItems} onAdd={addGroceryItem} onRemove={removeGroceryItem} onToggle={toggleGroceryItem} onConvert={convertGroceries} />;
      default: return <Dashboard transactions={transactions} />;
    }
  };

  return (
    <Layout activeView={currentView} setView={setCurrentView}>
      {renderContent()}
    </Layout>
  );
};

export default App;
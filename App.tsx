
import React, { useState, useEffect } from 'react';
import { View, Transaction, GroceryItem } from './types';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import TransactionList from './components/TransactionList';
import AIForecast from './components/AIForecast';
import SupermarketList from './components/SupermarketList';
import { ManekiNekoIcon, COLORS } from './constants';
import { getGoalAdvice } from './services/geminiService';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.DASHBOARD);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [groceryItems, setGroceryItems] = useState<GroceryItem[]>([]);
  const [aiAdvice, setAiAdvice] = useState<string>("");
  const [loadingAdvice, setLoadingAdvice] = useState<boolean>(false);

  useEffect(() => {
    const saved = localStorage.getItem('maneki_transactions');
    const savedGroceries = localStorage.getItem('maneki_groceries');
    if (saved) try { setTransactions(JSON.parse(saved)); } catch (e) {}
    if (savedGroceries) try { setGroceryItems(JSON.parse(savedGroceries)); } catch (e) {}
  }, []);

  useEffect(() => {
    localStorage.setItem('maneki_transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('maneki_groceries', JSON.stringify(groceryItems));
  }, [groceryItems]);

  useEffect(() => {
    if (currentView === View.BUDGET && transactions.length > 0 && !aiAdvice) {
      const fetchAdvice = async () => {
        setLoadingAdvice(true);
        const advice = await getGoalAdvice(transactions);
        setAiAdvice(advice);
        setLoadingAdvice(false);
      };
      fetchAdvice();
    }
  }, [currentView, transactions, aiAdvice]);

  const addTransaction = (t: Omit<Transaction, 'id'>) => {
    const newT: Transaction = {
      ...t,
      id: Math.random().toString(36).substr(2, 9),
    };
    setTransactions(prev => [newT, ...prev]);
    setAiAdvice("");
  };

  const deleteTransaction = (id: string) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  const addGroceryItem = (name: string, price: number) => {
    const newItem: GroceryItem = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      price,
      completed: false
    };
    setGroceryItems(prev => [...prev, newItem]);
  };

  const removeGroceryItem = (id: string) => {
    setGroceryItems(prev => prev.filter(item => item.id !== id));
  };

  const toggleGroceryItem = (id: string) => {
    setGroceryItems(prev => prev.map(item => item.id === id ? { ...item, completed: !item.completed } : item));
  };

  const convertGroceriesToTransaction = () => {
    const total = groceryItems.reduce((acc, item) => acc + item.price, 0);
    if (total <= 0) return;
    
    addTransaction({
      amount: total,
      description: 'Compra Supermercado',
      category: 'Comida',
      date: new Date().toISOString().split('T')[0],
      type: 'expense'
    });
    setGroceryItems([]);
    setCurrentView(View.TRANSACTIONS);
  };

  const renderContent = () => {
    switch (currentView) {
      case View.DASHBOARD:
        return <Dashboard transactions={transactions} />;
      case View.TRANSACTIONS:
        return (
          <div className="space-y-4">
             <button 
                onClick={() => setCurrentView(View.SUPERMARKET)}
                className="w-full brutalist-button bg-blue-400 py-3 text-xs mb-2"
              >
                + ABRIR LISTA DE SUPERMERCADO
              </button>
            <TransactionList 
              transactions={transactions} 
              onAdd={addTransaction} 
              onDelete={deleteTransaction} 
            />
          </div>
        );
      case View.SUPERMARKET:
        return (
          <SupermarketList 
            items={groceryItems}
            onAdd={addGroceryItem}
            onRemove={removeGroceryItem}
            onToggle={toggleGroceryItem}
            onConvertToTransaction={convertGroceriesToTransaction}
          />
        );
      case View.BUDGET:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-3xl font-black uppercase tracking-tighter">Metas</h2>
              <p className="text-xs font-bold uppercase tracking-widest bg-black text-white inline-block px-2 py-0.5 mt-2">Planes a futuro</p>
            </div>

            <div className="brutalist-card p-6 bg-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-16 h-16 bg-[#ffcc00] border-l-4 border-b-4 border-black -translate-y-8 translate-x-8 rotate-45"></div>
              <p className="text-[10px] font-black uppercase mb-2 text-gray-400">Sabiduría Zen (AI)</p>
              {loadingAdvice ? (
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 border-2 border-black border-t-transparent animate-spin rounded-full"></div>
                  <p className="font-bold text-sm uppercase tracking-tighter italic">Consultando al gato...</p>
                </div>
              ) : (
                <p className="font-bold text-lg leading-tight">
                  "{aiAdvice || "La constancia es el primer paso hacia la gran riqueza."}"
                </p>
              )}
            </div>

            <div className="space-y-4">
              <GoalCard title="Ahorro Viaje" current={2400} target={5000} color="#88cc44" />
              <GoalCard title="Nuevo Setup" current={800} target={1200} color="#5588ff" />
              <button className="w-full brutalist-button bg-white py-6 text-sm flex items-center justify-center gap-2">
                <span className="text-2xl">+</span> NUEVO OBJETIVO
              </button>
            </div>

            <div className="brutalist-card p-6 bg-pink-50 border-pink-500">
              <p className="text-[10px] font-black uppercase mb-2 text-pink-500">Consejo Maneki</p>
              <p className="font-bold text-lg leading-tight">
                "Cada moneda guardada es un paso más hacia la fortuna absoluta."
              </p>
            </div>
          </div>
        );
      case View.AI_FORECAST:
        return <AIForecast transactions={transactions} />;
      default:
        return <Dashboard transactions={transactions} />;
    }
  };

  return (
    <Layout activeView={currentView === View.SUPERMARKET ? View.TRANSACTIONS : currentView} setView={setCurrentView}>
      {renderContent()}
    </Layout>
  );
};

const GoalCard = ({ title, current, target, color }: { title: string, current: number, target: number, color: string }) => {
  const percentage = Math.min(100, (current / target) * 100);
  return (
    <div className={`brutalist-card p-6 bg-white transition-all hover:-rotate-1`}>
      <div className="flex justify-between items-start mb-4">
        <div>
           <h4 className="text-xl font-black uppercase tracking-tighter leading-none">{title}</h4>
           <span className="text-[10px] font-black text-gray-400">OBJETIVO: ${target}</span>
        </div>
        <div className="text-right"><p className="text-2xl font-black italic">${current}</p></div>
      </div>
      <div className="w-full h-8 bg-white border-4 border-black relative overflow-hidden">
        <div className="h-full border-r-4 border-black transition-all duration-1000" style={{ width: `${percentage}%`, backgroundColor: color }} />
        <span className="absolute inset-0 flex items-center justify-center font-black text-xs mix-blend-difference text-white">{percentage.toFixed(0)}%</span>
      </div>
    </div>
  );
};

export default App;

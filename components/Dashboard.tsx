
import React, { useState, useEffect } from 'react';
import { Transaction } from '../types';
import { ManekiNekoIcon, COLORS, CATEGORIES, WaveIcon, DarumaIcon } from '../constants';
import { BarChart, Bar, XAxis, ResponsiveContainer, Cell, Tooltip } from 'recharts';

interface DashboardProps {
  transactions: Transaction[];
}

const Dashboard: React.FC<DashboardProps> = ({ transactions }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const income = transactions
    .filter(t => t.type === 'income')
    .reduce((acc, t) => acc + t.amount, 0);
  
  const expenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => acc + t.amount, 0);

  const balance = income - expenses;

  const categoryData = CATEGORIES.map(cat => {
    const total = transactions
      .filter(t => t.type === 'expense' && t.category === cat)
      .reduce((acc, t) => acc + t.amount, 0);
    return { name: cat, value: total };
  }).filter(c => c.value > 0).sort((a, b) => b.value - a.value);

  return (
    <div className="space-y-6">
      {/* Hero */}
      <div className="brutalist-card p-6 flex flex-col items-center text-center relative overflow-hidden">
        {/* Central Cat Icon - Smaller as requested previously */}
        <div className="animate-bounce-subtle mb-4">
          <ManekiNekoIcon className="w-28 h-28" />
        </div>
        
        <h2 className="text-sm font-black uppercase tracking-widest mb-1">Tu Balance</h2>
        <div className="text-6xl font-black tracking-tighter">${balance.toLocaleString()}</div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className="brutalist-card p-4 bg-[#88cc44] relative overflow-hidden">
          <WaveIcon className="absolute -bottom-2 -right-2 opacity-20 w-16 h-16" />
          <span className="text-[10px] font-black uppercase">Ingresos</span>
          <p className="text-xl font-black">${income.toLocaleString()}</p>
        </div>
        <div className="brutalist-card p-4 bg-[#ff5588] relative overflow-hidden">
          <DarumaIcon className="absolute -bottom-2 -right-2 opacity-20 w-12 h-12" />
          <span className="text-[10px] font-black uppercase">Gastos</span>
          <p className="text-xl font-black">${expenses.toLocaleString()}</p>
        </div>
      </div>

      {/* Categories */}
      <div className="brutalist-card p-6 bg-white">
        <h3 className="text-lg font-black uppercase mb-4 border-b-4 border-black pb-2 flex items-center justify-between">
          Gastos por Tipo
          <WaveIcon className="w-5 h-5" />
        </h3>
        <div className="space-y-4">
          {categoryData.length === 0 ? (
            <p className="font-bold text-gray-400 italic">No hay datos todavía...</p>
          ) : (
            categoryData.map((cat, idx) => (
              <div key={cat.name} className="space-y-1">
                <div className="flex justify-between font-black text-xs uppercase">
                  <span>{cat.name}</span>
                  <span>${cat.value}</span>
                </div>
                <div className="h-4 w-full bg-white border-2 border-black">
                  <div 
                    className="h-full border-r-2 border-black" 
                    style={{ 
                      width: `${(cat.value / (expenses || 1)) * 100}%`,
                      backgroundColor: idx % 3 === 0 ? COLORS.green : idx % 3 === 1 ? COLORS.blue : COLORS.pink
                    }}
                  />
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Flow Chart con fix de Recharts */}
      {isMounted && categoryData.length > 0 && (
        <div className="brutalist-card p-6 bg-white">
           <h3 className="text-sm font-black uppercase mb-4">Marea de Gastos</h3>
           <div className="relative w-full h-[160px]">
              <ResponsiveContainer width="100%" height="100%" debounce={100}>
                <BarChart data={categoryData.slice(0, 5)} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                  <XAxis dataKey="name" hide />
                  <Tooltip 
                    cursor={{ fill: 'rgba(0,0,0,0.1)' }}
                    contentStyle={{ 
                      background: 'white', 
                      border: '3px solid black', 
                      boxShadow: '4px 4px 0 black',
                      fontWeight: 900,
                      fontSize: '10px',
                      borderRadius: '0px'
                    }}
                  />
                  <Bar dataKey="value" stroke="black" strokeWidth={3}>
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index % 2 === 0 ? COLORS.yellow : COLORS.blue} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
           </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;

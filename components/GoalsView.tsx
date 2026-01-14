import React, { useState, useEffect } from 'react';
import { Transaction } from '../types';
import { getQuickAdvice } from '../services/geminiService';
import { DarumaIcon } from '../constants';

const GoalsView: React.FC<{ transactions: Transaction[] }> = ({ transactions }) => {
  const [advice, setAdvice] = useState("Cargando sabiduría...");
  
  useEffect(() => {
    getQuickAdvice(transactions).then(setAdvice);
  }, [transactions]);

  return (
    <div className="space-y-6">
      <div className="brutalist-card p-6 bg-white relative">
        <div className="absolute -top-4 -right-2 bg-pink-500 text-white border-4 border-black px-2 py-1 font-black text-[10px] rotate-6">AI ZEN</div>
        <p className="font-black text-lg leading-tight italic">"{advice}"</p>
      </div>

      <div className="space-y-4">
        <GoalCard title="Viaje a Japón" current={1500} target={4000} color="#ff5588" />
        <GoalCard title="Fondo de Emergencia" current={800} target={1000} color="#88cc44" />
      </div>

      <div className="brutalist-card p-4 bg-white border-dashed">
        <button className="w-full font-black text-sm uppercase">+ Añadir Nueva Meta</button>
      </div>
    </div>
  );
};

const GoalCard = ({ title, current, target, color }: any) => {
  const pct = Math.min(100, (current/target)*100);
  return (
    <div className="brutalist-card p-4">
      <div className="flex justify-between items-end mb-2">
        <h4 className="font-black uppercase text-sm">{title}</h4>
        <span className="font-black text-xs">${current} / ${target}</span>
      </div>
      <div className="h-6 w-full border-4 border-black bg-white overflow-hidden">
        <div className="h-full border-r-4 border-black transition-all duration-1000" style={{ width: `${pct}%`, backgroundColor: color }}></div>
      </div>
    </div>
  );
};

export default GoalsView;
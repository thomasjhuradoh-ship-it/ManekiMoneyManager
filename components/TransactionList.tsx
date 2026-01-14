
import React, { useState } from 'react';
import { Transaction } from '../types';
import { CATEGORIES, COLORS, ManekiNekoIcon } from '../constants';

interface TransactionListProps {
  transactions: Transaction[];
  onAdd: (t: Omit<Transaction, 'id'>) => void;
  onDelete: (id: string) => void;
}

const TransactionList: React.FC<TransactionListProps> = ({ transactions, onAdd, onDelete }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState<Omit<Transaction, 'id'>>({
    amount: 0,
    description: '',
    category: CATEGORIES[0],
    date: new Date().toISOString().split('T')[0],
    type: 'expense'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.amount <= 0 || !formData.description) return;
    onAdd(formData);
    setIsAdding(false);
    setFormData({
        amount: 0,
        description: '',
        category: CATEGORIES[0],
        date: new Date().toISOString().split('T')[0],
        type: 'expense'
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end mb-4">
        <div>
          <h2 className="text-4xl font-black uppercase tracking-tighter leading-none">Gastos</h2>
          <p className="text-xs font-bold uppercase tracking-widest mt-1">Registro Detallado</p>
        </div>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className="brutalist-button bg-pink-400 py-3 px-6 text-xl"
        >
          {isAdding ? 'CANCELAR' : '+ NUEVO'}
        </button>
      </div>

      {isAdding && (
        <form onSubmit={handleSubmit} className="brutalist-card p-6 space-y-5 animate-in slide-in-from-top-4 duration-300 relative">
          <div className="absolute top-2 right-2 w-8 h-8 bg-yellow-400 border-4 border-black -rotate-12 z-0"></div>
          
          <div className="flex border-[5px] border-black relative z-10">
            <button 
              type="button"
              onClick={() => setFormData({...formData, type: 'expense'})}
              className={`flex-1 py-3 font-black uppercase text-sm ${formData.type === 'expense' ? 'bg-black text-white' : 'bg-white text-black'}`}
            >GASTO</button>
            <button 
              type="button"
              onClick={() => setFormData({...formData, type: 'income'})}
              className={`flex-1 py-3 font-black uppercase text-sm ${formData.type === 'income' ? 'bg-black text-white' : 'bg-white text-black'}`}
            >INGRESO</button>
          </div>
          
          <div className="space-y-1 relative z-10">
            <label className="text-[10px] font-black uppercase tracking-widest">Monto ($)</label>
            <input 
              type="number"
              placeholder="0.00"
              required
              value={formData.amount || ''}
              onChange={e => setFormData({...formData, amount: parseFloat(e.target.value)})}
              className="w-full bg-white border-[5px] border-black p-4 text-4xl font-black text-center focus:outline-none"
            />
          </div>

          <div className="space-y-1 relative z-10">
            <label className="text-[10px] font-black uppercase tracking-widest">Concepto</label>
            <input 
              type="text"
              placeholder="¿En qué se fue el dinero?"
              required
              value={formData.description}
              onChange={e => setFormData({...formData, description: e.target.value})}
              className="w-full bg-white border-[5px] border-black p-4 font-black uppercase placeholder:text-gray-300 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3 relative z-10">
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase tracking-widest">Categoría</label>
              <select 
                value={formData.category}
                onChange={e => setFormData({...formData, category: e.target.value})}
                className="w-full bg-white border-[5px] border-black p-3 font-black text-xs appearance-none focus:outline-none"
              >
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase tracking-widest">Fecha</label>
              <input 
                type="date"
                value={formData.date}
                onChange={e => setFormData({...formData, date: e.target.value})}
                className="w-full bg-white border-[5px] border-black p-3 font-black text-xs focus:outline-none"
              />
            </div>
          </div>

          <button type="submit" className="w-full brutalist-button bg-green-400 py-5 text-2xl relative z-10">
            GUARDAR REGISTRO
          </button>
        </form>
      )}

      <div className="space-y-5 pb-16">
        {transactions.length === 0 ? (
          <div className="brutalist-card p-12 text-center bg-white border-dashed border-[6px] flex flex-col items-center gap-6 overflow-hidden relative">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-yellow-400 rounded-full border-4 border-black opacity-10"></div>
            <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-pink-400 rounded-full border-4 border-black opacity-10"></div>
            
            <div className="relative group cursor-pointer" onClick={() => setIsAdding(true)}>
              <div className="absolute inset-0 bg-[#ffcc00] border-[4px] border-black rounded-full scale-110 -rotate-6 transition-transform group-hover:scale-125"></div>
              <ManekiNekoIcon className="w-32 h-32 relative z-10 animate-bounce-subtle" />
            </div>
            
            <div className="relative z-10">
              <h3 className="font-black text-2xl uppercase tracking-tighter leading-tight">¡Tu alcancía está vacía!</h3>
              <p className="text-[11px] font-black uppercase tracking-widest text-gray-400 mt-2 leading-tight">
                El Maneki Neko está esperando <br/> para atraer tu fortuna.
              </p>
            </div>

            <button 
              onClick={() => setIsAdding(true)}
              className="brutalist-button bg-yellow-400 text-xs py-3 px-8 relative z-10 hover:bg-black hover:text-white transition-colors"
            >
              ¡REGISTRAR PRIMER GASTO!
            </button>
          </div>
        ) : (
          transactions.sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map(t => (
            <div key={t.id} className="brutalist-card p-5 flex justify-between items-center group relative overflow-hidden">
              <div className={`absolute top-0 left-0 w-1 h-full ${t.type === 'income' ? 'bg-green-500' : 'bg-pink-500'}`}></div>
              <div className="flex items-center gap-5">
                <div className={`w-14 h-14 border-[5px] border-black flex items-center justify-center text-2xl font-black rotate-[-3deg] shadow-[4px_4px_0_black] ${t.type === 'income' ? 'bg-[#88cc44]' : 'bg-[#ff5588]'}`}>
                  {t.description.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="font-black text-xl leading-none uppercase tracking-tight">{t.description}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[9px] font-black uppercase bg-black text-white px-2 py-0.5">{t.category}</span>
                    <span className="text-[9px] font-bold text-gray-400 uppercase">{new Date(t.date).toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className={`text-2xl font-black italic tracking-tighter ${t.type === 'income' ? 'text-green-600' : 'text-black'}`}>
                  {t.type === 'income' ? '+' : '-'}${t.amount.toLocaleString()}
                </p>
                <button onClick={() => onDelete(t.id)} className="text-[9px] font-black uppercase text-red-500 hover:underline mt-1 bg-red-50 px-2 py-0.5 border-2 border-black">ELIMINAR</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TransactionList;

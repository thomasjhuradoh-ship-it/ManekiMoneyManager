
import React, { useState } from 'react';
import { GroceryItem } from '../types';
import { WaveIcon } from '../constants';

interface SupermarketListProps {
  items: GroceryItem[];
  onAdd: (name: string, price: number) => void;
  onRemove: (id: string) => void;
  onToggle: (id: string) => void;
  onConvertToTransaction: () => void;
}

const SupermarketList: React.FC<SupermarketListProps> = ({ items, onAdd, onRemove, onToggle, onConvertToTransaction }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price) return;
    onAdd(name, parseFloat(price));
    setName('');
    setPrice('');
  };

  const total = items.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-black uppercase tracking-tighter">Supermercado</h2>
          <p className="text-[10px] font-black uppercase bg-blue-500 text-white px-2 py-0.5 inline-block">Lista de Compras</p>
        </div>
        <div className="text-right">
          <p className="text-[10px] font-black uppercase">Total Estimado</p>
          <p className="text-2xl font-black italic">${total.toLocaleString()}</p>
        </div>
      </div>

      <form onSubmit={handleAdd} className="brutalist-card p-4 space-y-3 bg-white">
        <div className="grid grid-cols-2 gap-2">
          <input
            type="text"
            placeholder="Producto..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border-4 border-black p-2 font-bold uppercase text-xs focus:outline-none"
          />
          <input
            type="number"
            placeholder="Precio $"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="border-4 border-black p-2 font-bold text-xs focus:outline-none"
          />
        </div>
        <button type="submit" className="w-full brutalist-button bg-yellow-400 py-2 text-sm">
          AÑADIR A LISTA
        </button>
      </form>

      <div className="space-y-3">
        {items.length === 0 ? (
          <div className="brutalist-card p-10 text-center bg-gray-50 border-dashed border-4 opacity-50">
            <p className="font-black text-xs uppercase">La cesta está vacía</p>
          </div>
        ) : (
          items.map((item) => (
            <div key={item.id} className={`brutalist-card p-3 flex justify-between items-center transition-opacity ${item.completed ? 'opacity-50' : 'opacity-100'}`}>
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={item.completed}
                  onChange={() => onToggle(item.id)}
                  className="w-6 h-6 border-4 border-black checked:bg-black appearance-none cursor-pointer"
                />
                <div>
                  <p className={`font-black uppercase text-sm ${item.completed ? 'line-through' : ''}`}>{item.name}</p>
                  <p className="text-[10px] font-bold text-gray-500">${item.price}</p>
                </div>
              </div>
              <button onClick={() => onRemove(item.id)} className="text-red-500 font-black text-xl px-2">×</button>
            </div>
          ))
        )}
      </div>

      {items.length > 0 && (
        <button 
          onClick={onConvertToTransaction}
          className="w-full brutalist-button bg-green-400 py-4 flex items-center justify-center gap-2"
        >
          <WaveIcon className="w-5 h-5" />
          REGISTRAR COMO GASTO
        </button>
      )}
    </div>
  );
};

export default SupermarketList;

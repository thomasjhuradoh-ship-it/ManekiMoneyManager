
import React, { useState, useEffect } from 'react';
import { Transaction, Forecast } from '../types';
import { getFinancialForecast } from '../services/geminiService';
import { ManekiNekoIcon, COLORS, DarumaIcon } from '../constants';

interface AIForecastProps {
  transactions: Transaction[];
}

const AIForecast: React.FC<AIForecastProps> = ({ transactions }) => {
  const [forecast, setForecast] = useState<Forecast | null>(null);
  const [loading, setLoading] = useState(false);

  // Calculate current spend
  const now = new Date();
  const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  const weeklySpend = transactions
    .filter(t => t.type === 'expense' && new Date(t.date) >= startOfWeek)
    .reduce((acc, t) => acc + t.amount, 0);

  const monthlySpend = transactions
    .filter(t => t.type === 'expense' && new Date(t.date) >= startOfMonth)
    .reduce((acc, t) => acc + t.amount, 0);

  const fetchForecast = async () => {
    setLoading(true);
    const data = await getFinancialForecast(transactions);
    setForecast(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchForecast();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-black uppercase tracking-tighter">Perfil ZEN</h2>
        <p className="text-xs font-bold uppercase tracking-widest bg-black text-white inline-block px-2 py-0.5 mt-2">Visión y Resumen</p>
      </div>

      {/* Current Spend Section */}
      <div className="brutalist-card p-6 bg-white space-y-4">
        <div className="flex items-center gap-2 border-b-4 border-black pb-2 mb-2">
          <DarumaIcon className="w-5 h-5" />
          <h3 className="font-black text-xs uppercase">Resumen Actual</h3>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-[10px] font-black uppercase text-gray-400">Gastado esta semana</p>
            <p className="text-2xl font-black text-pink-500">${weeklySpend.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-[10px] font-black uppercase text-gray-400">Gastado este mes</p>
            <p className="text-2xl font-black text-pink-500">${monthlySpend.toLocaleString()}</p>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="brutalist-card bg-white p-20 flex flex-col items-center justify-center gap-4">
          <ManekiNekoIcon className="w-16 h-16 animate-bounce" />
          <p className="font-black uppercase text-xs">Consultando destino...</p>
        </div>
      ) : forecast ? (
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="brutalist-card p-6 bg-yellow-400 text-center">
              <p className="text-[10px] font-black uppercase mb-1">Futuro Próx. Semana</p>
              <p className="text-3xl font-black">${forecast.nextWeekEstimate.toFixed(0)}</p>
            </div>
            <div className="brutalist-card p-6 bg-yellow-400 text-center">
                <p className="text-[10px] font-black uppercase mb-1">Futuro Próx. Mes</p>
                <p className="text-3xl font-black">${forecast.nextMonthEstimate.toFixed(0)}</p>
            </div>
          </div>

          <div className="brutalist-card p-8 bg-white relative">
            <div className="absolute -top-4 -left-4 bg-blue-500 border-4 border-black p-2 rotate-[-5deg] font-black text-white text-xs uppercase">
              Sabiduría Maneki
            </div>
            <p className="text-xl font-bold italic leading-tight text-gray-900 mt-2">
              "{forecast.insights}"
            </p>
            
            <div className="mt-8 pt-6 border-t-4 border-black flex items-center justify-between">
              <span className="text-xs font-black uppercase">Nivel de Riesgo:</span>
              <div className={`px-4 py-2 border-4 border-black font-black uppercase text-xs ${
                forecast.riskLevel === 'low' ? 'bg-[#88cc44]' :
                forecast.riskLevel === 'medium' ? 'bg-orange-400' : 'bg-red-500 text-white'
              }`}>
                {forecast.riskLevel}
              </div>
            </div>
          </div>

          <button 
            onClick={fetchForecast}
            className="w-full brutalist-button bg-white py-4 text-xs"
          >
            RECALCULAR DESTINO
          </button>
        </div>
      ) : (
        <div className="text-center py-20">
          <button onClick={fetchForecast} className="font-black border-b-4 border-black uppercase">Reintentar</button>
        </div>
      )}
    </div>
  );
};

export default AIForecast;

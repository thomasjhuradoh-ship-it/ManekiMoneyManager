import React from 'react';
import { View } from '../types';
import { Home, List, Star, Sparkles, ShoppingCart } from 'lucide-react';
import { ManekiNekoIcon } from '../constants';

interface LayoutProps {
  children: React.ReactNode;
  activeView: View;
  setView: (view: View) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeView, setView }) => {
  return (
    <div className="min-h-screen flex flex-col max-w-md mx-auto bg-[#ffcc00] relative border-x-4 border-black shadow-[10px_0_0_black]">
      {/* Header */}
      <header className="safe-pt px-6 py-6 bg-white border-b-8 border-black flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <ManekiNekoIcon className="w-8 h-8" />
          <h1 className="text-xl font-black uppercase tracking-tighter">MANEKI</h1>
        </div>
        <button onClick={() => setView(View.SUPERMARKET)} className={`p-2 border-4 border-black ${activeView === View.SUPERMARKET ? 'bg-black text-white' : 'bg-blue-400'}`}>
          <ShoppingCart size={20} />
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-4 pb-32">
        {children}
      </main>

      {/* Navigation */}
      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[440px] bg-white border-t-8 border-black h-24 flex items-center justify-around px-4 safe-pb z-50">
        <NavBtn act={activeView === View.DASHBOARD} icon={<Home />} label="INICIO" onClick={() => setView(View.DASHBOARD)} color="#88cc44" />
        <NavBtn act={activeView === View.TRANSACTIONS} icon={<List />} label="GASTOS" onClick={() => setView(View.TRANSACTIONS)} color="#5588ff" />
        <NavBtn act={activeView === View.BUDGET} icon={<Star />} label="METAS" onClick={() => setView(View.BUDGET)} color="#ff5588" />
        <NavBtn act={activeView === View.AI_FORECAST} icon={<Sparkles />} label="ZEN" onClick={() => setView(View.AI_FORECAST)} color="#ffcc00" />
      </nav>
    </div>
  );
};

const NavBtn = ({ act, icon, label, onClick, color }: any) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center justify-center w-12 h-12 rounded-lg border-4 border-black transition-all ${act ? 'bg-black text-white -translate-y-1' : 'bg-white'}`}
    style={act ? { boxShadow: `3px 3px 0 ${color}` } : {}}
  >
    {icon}
    {act && <span className="text-[7px] font-black mt-0.5">{label}</span>}
  </button>
);

export default Layout;
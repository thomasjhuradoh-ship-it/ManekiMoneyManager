
import React from 'react';
import { View } from '../types';
import { ManekiNekoIcon, IconHome, IconList, IconStar, IconSparkles } from '../constants';

interface LayoutProps {
  children: React.ReactNode;
  activeView: View;
  setView: (view: View) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeView, setView }) => {
  return (
    <div className="min-h-screen flex flex-col max-w-md mx-auto relative bg-[#ffcc00] border-x-[8px] border-black shadow-[16px_0_0_black]">
      {/* Header */}
      <header className="px-6 py-6 bg-white border-b-[8px] border-black flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <ManekiNekoIcon className="w-12 h-12" />
          <h1 className="text-3xl font-black uppercase tracking-tighter leading-none">Maneki</h1>
        </div>
        <div className="w-12 h-12 rounded-full border-[6px] border-black bg-pink-400 flex items-center justify-center font-black text-xl">?</div>
      </header>

      {/* Main Area */}
      <main className="flex-1 overflow-y-auto pb-36 px-4 pt-6">
        {children}
      </main>

      {/* Bottom Nav */}
      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[92%] max-w-[360px] bg-white border-[8px] border-black shadow-[10px_10px_0_black] rounded-3xl h-24 flex items-center justify-around px-4 z-50">
        <NavItem 
          active={activeView === View.DASHBOARD} 
          onClick={() => setView(View.DASHBOARD)}
          label="INICIO"
          icon={<IconHome />}
          color="#88cc44"
        />
        <NavItem 
          active={activeView === View.TRANSACTIONS} 
          onClick={() => setView(View.TRANSACTIONS)}
          label="GASTOS"
          icon={<IconList />}
          color="#5588ff"
        />
        <NavItem 
          active={activeView === View.BUDGET} 
          onClick={() => setView(View.BUDGET)}
          label="METAS"
          icon={<IconStar />}
          color="#ff5588"
        />
        <NavItem 
          active={activeView === View.AI_FORECAST} 
          onClick={() => setView(View.AI_FORECAST)}
          label="ZEN"
          icon={<IconSparkles />}
          color="#ffcc00"
        />
      </nav>
    </div>
  );
};

const NavItem = ({ active, onClick, label, icon, color }: { active: boolean, onClick: () => void, label: string, icon: React.ReactNode, color: string }) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center justify-center w-16 h-16 rounded-2xl border-[5px] border-black transition-all ${active ? 'bg-black text-white -translate-y-4' : 'bg-white text-black hover:bg-gray-50'}`}
    style={active ? { boxShadow: `6px 6px 0 ${color}` } : {}}
  >
    {icon}
    <span className={`text-[9px] font-black uppercase mt-1 ${active ? 'block' : 'hidden'}`}>{label}</span>
  </button>
);

export default Layout;

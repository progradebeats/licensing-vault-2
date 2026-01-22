
import React from 'react';
import { Music, LayoutDashboard, Search, ShoppingBag } from 'lucide-react';

interface NavbarProps {
  onNavigate: (view: 'home' | 'admin' | 'about') => void;
  currentView: string;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate, currentView }) => {
  return (
    <nav className="sticky top-0 z-[60] glass border-b border-white/10 px-6 py-4 flex items-center justify-between">
      <div 
        className="flex items-center gap-2 cursor-pointer" 
        onClick={() => onNavigate('home')}
      >
        <div className="bg-purple-600 p-2 rounded-lg">
          <Music className="w-6 h-6 text-white" />
        </div>
        <span className="brand text-2xl font-bold tracking-tight">Sonic<span className="text-purple-500">Vault</span></span>
      </div>

      <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
        <button 
          onClick={() => onNavigate('home')}
          className={`hover:text-white transition-colors ${currentView === 'home' ? 'text-white' : ''}`}
        >
          Browse Music
        </button>
        <button className="hover:text-white transition-colors">Pricing</button>
        <button 
          onClick={() => onNavigate('about')}
          className={`hover:text-white transition-colors ${currentView === 'about' ? 'text-white' : ''}`}
        >
          About
        </button>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden sm:flex items-center bg-white/5 border border-white/10 rounded-full px-4 py-2 gap-2">
          <Search className="w-4 h-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search tracks..." 
            className="bg-transparent border-none outline-none text-sm w-40"
          />
        </div>
        <button 
          onClick={() => onNavigate('admin')}
          className={`p-2 rounded-full hover:bg-white/10 transition-colors ${currentView === 'admin' ? 'text-purple-500' : 'text-gray-400'}`}
          title="Admin Dashboard"
        >
          <LayoutDashboard className="w-5 h-5" />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;

import React from 'react';
import { Home, CheckSquare, Megaphone, Link as LinkIcon, Settings } from 'lucide-react';

export function Navigation({ activeTab, setActiveTab }) {
  const navItems = [
    { id: 'today', icon: Home, label: 'Today' },
    { id: 'tasks', icon: CheckSquare, label: 'Tasks' },
    { id: 'marketing', icon: Megaphone, label: 'Marketing' },
    { id: 'vault', icon: LinkIcon, label: 'Vault' },
    { id: 'settings', icon: Settings, label: 'Settings' }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 pb-safe z-50">
      <div className="flex justify-around items-center p-2">
        {navItems.map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`flex flex-col items-center justify-center w-16 h-14 rounded-xl transition-colors ${
              activeTab === id ? 'text-indigo-600' : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <Icon size={24} className={activeTab === id ? 'fill-indigo-50' : ''} />
            <span className="text-[10px] mt-1 font-medium">{label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}

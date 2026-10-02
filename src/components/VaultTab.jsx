import React from 'react';
import { ExternalLink, LineChart, Store, Camera, MapPin, Search } from 'lucide-react';

export function VaultTab() {
  const links = [
    { name: 'Meta Business Suite', url: 'https://business.facebook.com', icon: Camera, color: 'text-pink-600', bg: 'bg-pink-50' },
    { name: 'Google Analytics (GA4)', url: 'https://analytics.google.com', icon: LineChart, color: 'text-yellow-600', bg: 'bg-yellow-50' },
    { name: 'Google Business Profile', url: 'https://business.google.com', icon: MapPin, color: 'text-blue-600', bg: 'bg-blue-50' },
    { name: 'Search Console', url: 'https://search.google.com/search-console', icon: Search, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { name: 'Zomato Merchant', url: 'https://www.zomato.com/business', icon: Store, color: 'text-red-600', bg: 'bg-red-50' },
    { name: 'Swiggy Partner', url: 'https://partner.swiggy.com', icon: Store, color: 'text-orange-600', bg: 'bg-orange-50' },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold mb-4">Command Vault</h2>
      <p className="text-sm text-gray-500 mb-6">Quick access to all your operational dashboards.</p>

      <div className="grid grid-cols-2 gap-4">
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <a 
              key={link.name} 
              href={link.url} 
              target="_blank" 
              rel="noreferrer"
              className="bg-white p-4 rounded-xl shadow-sm border flex flex-col items-center text-center hover:border-indigo-300 transition-colors group"
            >
              <div className={`p-3 rounded-full mb-3 ${link.bg}`}>
                <Icon className={link.color} size={24} />
              </div>
              <span className="font-medium text-sm text-gray-800 group-hover:text-indigo-600 transition-colors">{link.name}</span>
              <ExternalLink size={14} className="text-gray-400 mt-2 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          );
        })}
      </div>
    </div>
  );
}

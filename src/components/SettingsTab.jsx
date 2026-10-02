import React, { useRef, useState } from 'react';
import { db } from '../db';
import { Download, Upload, ShieldCheck, RefreshCw } from 'lucide-react';

export function SettingsTab() {
  const fileInputRef = useRef(null);
  const [statusMsg, setStatusMsg] = useState('');

  const handleExport = async () => {
    try {
      const tasks = await db.tasks.toArray();
      const completions = await db.completions.toArray();
      const exportData = { tasks, completions, version: 1 };
      
      const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `kinster-backup-${new Date().toISOString().split('T')[0]}.json`;
      a.click();
      URL.revokeObjectURL(url);
      
      setStatusMsg('Export successful!');
      setTimeout(() => setStatusMsg(''), 3000);
    } catch (err) {
      console.error(err);
      setStatusMsg('Export failed.');
    }
  };

  const handleImport = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const data = JSON.parse(event.target.result);
        if (data.tasks && data.completions) {
          await db.transaction('rw', db.tasks, db.completions, async () => {
            await db.tasks.clear();
            await db.completions.clear();
            await db.tasks.bulkAdd(data.tasks);
            await db.completions.bulkAdd(data.completions);
          });
          setStatusMsg('Import successful! Data restored.');
        } else {
          setStatusMsg('Invalid backup file.');
        }
      } catch (err) {
        console.error(err);
        setStatusMsg('Import failed. Invalid format.');
      }
      setTimeout(() => setStatusMsg(''), 3000);
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold mb-4">Settings & Data Safety</h2>

      <div className="bg-white p-6 rounded-xl shadow-sm border">
        <div className="flex items-center gap-3 mb-4">
          <ShieldCheck className="text-green-600" />
          <h3 className="font-semibold text-lg">Local Backup</h3>
        </div>
        <p className="text-sm text-gray-500 mb-6">
          Your data is stored entirely on this device. Create backups to prevent data loss if you clear your browser cache.
        </p>

        <div className="space-y-3">
          <button 
            onClick={handleExport}
            className="flex items-center justify-center gap-2 w-full bg-indigo-50 text-indigo-700 py-3 rounded-xl font-medium hover:bg-indigo-100 transition-colors"
          >
            <Download size={18} />
            Export Backup (JSON)
          </button>

          <button 
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center justify-center gap-2 w-full bg-gray-50 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-100 transition-colors border border-gray-200"
          >
            <Upload size={18} />
            Import Backup
          </button>
          <input 
            type="file" 
            accept=".json" 
            ref={fileInputRef} 
            onChange={handleImport} 
            className="hidden" 
          />
        </div>
        {statusMsg && (
          <div className="mt-4 p-3 bg-green-50 text-green-700 rounded-lg text-sm text-center font-medium">
            {statusMsg}
          </div>
        )}
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold">App Version</h3>
            <p className="text-sm text-gray-500">Kinster PWA v1.0.0</p>
          </div>
          <button className="p-3 bg-gray-50 rounded-full text-gray-600 hover:bg-gray-100 transition-colors">
            <RefreshCw size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}

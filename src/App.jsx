import React, { useEffect, useState } from 'react';
import { db, initTasks } from './db';
import { useLiveQuery } from 'dexie-react-hooks';
import { CheckCircle, Circle, ArrowRight } from 'lucide-react';
import { Navigation } from './components/Navigation';
import { TasksTab } from './components/TasksTab';
import { MarketingTab } from './components/MarketingTab';
import { VaultTab } from './components/VaultTab';
import { SettingsTab } from './components/SettingsTab';

function App() {
  const [activeTab, setActiveTab] = useState('today');

  useEffect(() => {
    initTasks();
  }, []);

  const tasks = useLiveQuery(() => db.tasks.toArray());
  const completions = useLiveQuery(() => db.completions.toArray());

  const getTodayDateStr = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const isTaskCompletedToday = (taskId) => {
    const todayStr = getTodayDateStr();
    return completions?.some(c => c.task_id === taskId && c.date === todayStr && c.status === 'done');
  };

  const toggleTask = async (taskId) => {
    const todayStr = getTodayDateStr();
    const existing = await db.completions.where({ task_id: taskId, date: todayStr }).first();
    
    if (existing) {
      if (existing.status === 'done') {
        await db.completions.update(existing.id, { status: 'skipped' });
      } else {
        await db.completions.delete(existing.id);
      }
    } else {
      await db.completions.add({ task_id: taskId, date: todayStr, status: 'done' });
    }
  };

  const todayTasks = tasks?.filter(t => t.frequency === 'Daily') || [];
  const completedTodayCount = todayTasks.filter(t => isTaskCompletedToday(t.id)).length;
  const pulseScore = todayTasks.length > 0 ? Math.round((completedTodayCount / todayTasks.length) * 100) : 0;

  const renderTabContent = () => {
    switch (activeTab) {
      case 'today':
        return (
          <div>
            <div className="bg-white p-6 rounded-xl shadow-sm mb-6 border">
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Kinster Pulse</h2>
              <div className="flex items-end gap-2 mb-2">
                <span className="text-4xl font-bold text-indigo-600">{pulseScore}%</span>
                <span className="text-gray-500 mb-1">Completion</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: `${pulseScore}%` }}></div>
              </div>
            </div>

            <h2 className="text-lg font-bold mb-4">Today's Tasks</h2>
            <div className="space-y-3">
              {todayTasks.map(task => {
                const isDone = isTaskCompletedToday(task.id);
                return (
                  <div key={task.id} className="bg-white p-4 rounded-xl shadow-sm border flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <button onClick={() => toggleTask(task.id)} className="text-indigo-600 focus:outline-none">
                        {isDone ? <CheckCircle size={24} className="fill-indigo-100" /> : <Circle size={24} className="text-gray-300" />}
                      </button>
                      <div>
                        <p className={`font-medium ${isDone ? 'text-gray-400 line-through' : ''}`}>{task.title}</p>
                        <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-2 py-1 rounded-full uppercase tracking-wide">
                          {task.category}
                        </span>
                      </div>
                    </div>
                    {task.deepLink && (
                      <a href={task.deepLink} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-indigo-600">
                        <ArrowRight size={20} />
                      </a>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      case 'tasks':
        return <TasksTab />;
      case 'marketing':
        return <MarketingTab />;
      case 'vault':
        return <VaultTab />;
      case 'settings':
        return <SettingsTab />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 pb-24">
      <header className="bg-white p-4 shadow-sm border-b sticky top-0 z-10">
        <h1 className="text-xl font-bold text-center">Kinster Command Center</h1>
      </header>

      <main className="p-4 max-w-md mx-auto">
        {renderTabContent()}
      </main>

      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}

export default App;

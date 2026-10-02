import React, { useState } from 'react';
import { db } from '../db';
import { useLiveQuery } from 'dexie-react-hooks';
import { CheckCircle, Circle, ArrowRight, Plus } from 'lucide-react';

export function TasksTab() {
  const tasks = useLiveQuery(() => db.tasks.toArray());
  const completions = useLiveQuery(() => db.completions.toArray());
  const [filter, setFilter] = useState('All');

  const getTodayDateStr = () => new Date().toISOString().split('T')[0];

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

  const filteredTasks = tasks?.filter(t => filter === 'All' || t.frequency === filter) || [];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">All Tasks</h2>
        <button className="bg-indigo-600 text-white p-2 rounded-full hover:bg-indigo-700 transition-colors">
          <Plus size={20} />
        </button>
      </div>

      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {['All', 'Daily', 'Weekly', 'Monthly'].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              filter === f ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filteredTasks.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No tasks found.</p>
        ) : (
          filteredTasks.map(task => {
            const isDone = isTaskCompletedToday(task.id);
            return (
              <div key={task.id} className="bg-white p-4 rounded-xl shadow-sm border flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button onClick={() => toggleTask(task.id)} className="text-indigo-600 focus:outline-none">
                    {isDone ? <CheckCircle size={24} className="fill-indigo-100" /> : <Circle size={24} className="text-gray-300" />}
                  </button>
                  <div>
                    <p className={`font-medium ${isDone ? 'text-gray-400 line-through' : ''}`}>{task.title}</p>
                    <div className="flex gap-2 mt-1">
                      <span className="text-[10px] font-semibold text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full uppercase tracking-wide">
                        {task.category}
                      </span>
                      <span className="text-[10px] font-semibold text-indigo-500 bg-indigo-50 px-2 py-0.5 rounded-full uppercase tracking-wide">
                        {task.frequency}
                      </span>
                    </div>
                  </div>
                </div>
                {task.deepLink && (
                  <a href={task.deepLink} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-indigo-600">
                    <ArrowRight size={20} />
                  </a>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

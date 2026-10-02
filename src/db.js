import Dexie from 'dexie';

export const db = new Dexie('KinsterHubDB');

db.version(1).stores({
  tasks: '++id, title, category, frequency, impact',
  completions: '++id, task_id, date, status'
});

export const initTasks = async () => {
  const count = await db.tasks.count();
  if (count === 0) {
    await db.tasks.bulkAdd([
      { title: 'Open shop & lights', category: 'Operations', frequency: 'Daily', impact: 1 },
      { title: 'Check espresso machine & grinder', category: 'Operations', frequency: 'Daily', impact: 2 },
      { title: 'Reply to Google/Zomato Reviews', category: 'Marketing', frequency: 'Daily', impact: 3, deepLink: 'https://business.google.com' },
      { title: 'Post 1 Instagram Story', category: 'Marketing', frequency: 'Daily', impact: 2, deepLink: 'https://instagram.com' },
      { title: 'Post 1 GBP Update', category: 'Marketing', frequency: 'Weekly', impact: 2 },
      { title: 'Check GA4 & Search Console', category: 'Web', frequency: 'Weekly', impact: 1, deepLink: 'https://analytics.google.com' },
      { title: 'NAP Consistency Check', category: 'Local', frequency: 'Monthly', impact: 2 }
    ]);
  }
};

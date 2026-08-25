import React, { useState, useEffect } from 'react';
import Canvas3D from './components/Canvas3D';
import DataOverlay from './components/DataOverlay';

export default function App() {
  const [items, setItems] = useState([]);
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchItems = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/items');
      const data = await res.json();
      if (Array.isArray(data)) {
        setItems(data);
      }
    } catch (err) {
      console.error("Failed to connect to Tier 2 API", err);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const addItem = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    setLoading(true);
    try {
      await fetch('http://localhost:5000/api/items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: title })
      });
      setTitle('');
      fetchItems();
    } catch (err) {
      console.error("Failed to post entity", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen w-full flex flex-col items-center justify-between p-8 text-white select-none overflow-hidden font-sans">
      <Canvas3D active={items.length > 0} />

      <header className="w-full max-w-4xl backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-6 flex justify-between items-center shadow-2xl">
        <h1 className="text-xl font-bold tracking-widest bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          CORE // 3-TIER SYSTEM
        </h1>
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-xs uppercase tracking-wider text-slate-300">Live Architecture</span>
        </div>
      </header>

      <DataOverlay
        items={items}
        title={title}
        setTitle={setTitle}
        addItem={addItem}
        loading={loading}
      />

      <footer className="grid grid-cols-3 gap-4 w-full max-w-2xl text-center text-xs text-slate-400">
        <div className="p-3 border border-white/5 rounded-xl bg-white/5 backdrop-blur-sm">Tier 1: React 3D HUD</div>
        <div className="p-3 border border-white/5 rounded-xl bg-white/5 backdrop-blur-sm">Tier 2: Express Engine</div>
        <div className="p-3 border border-white/5 rounded-xl bg-white/5 backdrop-blur-sm">Tier 3: PostgreSQL</div>
      </footer>
    </main>
  );
}
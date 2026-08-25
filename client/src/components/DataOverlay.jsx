import React from 'react';

export default function DataOverlay({ items, title, setTitle, addItem, loading }) {
  return (
    <section className="w-full max-w-md backdrop-blur-xl bg-slate-900/40 border border-white/10 rounded-3xl p-8 shadow-2xl space-y-6">
      <form onSubmit={addItem} className="space-y-4">
        <label className="text-xs uppercase tracking-widest text-slate-400 font-semibold block">
          Store Data Entity
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Entity identifier..."
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-purple-500 text-sm text-white placeholder-slate-500 transition"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-5 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-xl text-sm font-semibold tracking-wide transition active:scale-95 shadow-lg shadow-purple-500/20 disabled:opacity-50"
          >
            {loading ? 'Syncing...' : 'Sync'}
          </button>
        </div>
      </form>

      <div className="space-y-2">
        <h2 className="text-xs uppercase tracking-widest text-slate-400 font-semibold">
          Live Database Records
        </h2>
        <div className="max-h-40 overflow-y-auto space-y-2 pr-1">
          {items.length === 0 ? (
            <p className="text-xs text-slate-500 italic">No records stored in Database Tier.</p>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center bg-white/5 border border-white/5 px-4 py-2 rounded-lg text-xs"
              >
                <span className="text-slate-200">{item.name}</span>
                <span className="text-[10px] text-slate-500">
                  {new Date(item.createdAt).toLocaleTimeString()}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
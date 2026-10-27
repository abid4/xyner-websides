import React, { useState, useEffect } from 'react';
import { Terminal, Copy, Check, Sparkles } from 'lucide-react';

const SNIPPETS = [
  {
    filename: 'offline-sync-engine.ts',
    lang: 'typescript',
    code: `// XYNER Local-First Engine
const commitOfflineTransaction = async (ticket: RetailTicket) => {
  const db = await SQLite.open("xyner_pos.db");
  await db.execute("INSERT INTO orders (id, total, status) VALUES (?, ?, ?)", [
    ticket.id,
    ticket.total,
    "OFFLINE_COMMITTED"
  ]);
  return { writeLatency: "0.04ms", dataLoss: "0.00%" };
};`,
  },
  {
    filename: 'crdt-reconciliation.ts',
    lang: 'typescript',
    code: `// Deterministic State Reconciler
export function reconcileMesh(localState: State, remoteState: State) {
  const merged = CRDT.merge(localState, remoteState);
  return {
    ticketsSynced: merged.count,
    conflictResolution: "CONVERGENT",
    syncedAt: new Date().toISOString()
  };
}`,
  },
  {
    filename: 'kds-thermal-driver.ts',
    lang: 'typescript',
    code: `// Mission-Critical Kitchen Dispatch
const dispatchKitchenOrder = async (order: KitchenOrder) => {
  const printer = await ThermalDriver.connectLAN("192.168.1.20");
  await printer.printTicket(order.items, { cut: true });
  return { status: "KITCHEN_NOTIFIED", printDelay: "12ms" };
};`,
  },
];

export const LiveCodeTerminal: React.FC = () => {
  const [snippetIndex, setSnippetIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [copied, setCopied] = useState(false);

  const currentSnippet = SNIPPETS[snippetIndex];
  const fullText = currentSnippet.code;

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (!isDeleting && displayedText.length < fullText.length) {
      // Typing phase
      timer = setTimeout(() => {
        setDisplayedText(fullText.slice(0, displayedText.length + 1));
      }, 28);
    } else if (!isDeleting && displayedText.length === fullText.length) {
      // Pause at full text
      timer = setTimeout(() => {
        setIsDeleting(true);
      }, 3200);
    } else if (isDeleting && displayedText.length > 0) {
      // Deleting phase
      timer = setTimeout(() => {
        setDisplayedText(fullText.slice(0, displayedText.length - 2));
      }, 12);
    } else if (isDeleting && displayedText.length === 0) {
      // Advance to next snippet
      setIsDeleting(false);
      setSnippetIndex((prev) => (prev + 1) % SNIPPETS.length);
    }

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, fullText]);

  const handleCopy = () => {
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-xl bg-[#08080a] border border-[#d4af37]/35 shadow-[0_0_30px_-8px_rgba(212,175,55,0.25)] overflow-hidden font-mono text-xs">
      {/* Terminal Titlebar */}
      <div className="flex items-center justify-between px-3.5 py-2.5 bg-[#121216] border-b border-[#d4af37]/20">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#eab308]" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
          </div>
          <span className="text-[11px] text-[#fef08a] flex items-center gap-1 ml-1.5 font-medium">
            <Terminal className="w-3 h-3 text-[#eab308]" />
            {currentSnippet.filename}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[10px] text-black bg-[#eab308] px-2 py-0.5 rounded font-extrabold hidden sm:inline">
            Live TypeScript
          </span>
          <button
            onClick={handleCopy}
            className="text-slate-400 hover:text-white p-1 rounded hover:bg-white/5 transition-colors cursor-pointer"
            aria-label="Copy code snippet"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Code Editor Body */}
      <div className="p-4 bg-[#08080a] overflow-x-auto min-h-[160px] text-[11px] sm:text-xs leading-relaxed">
        <pre className="text-slate-200 whitespace-pre font-mono">
          <code>
            {displayedText}
            <span className="inline-block w-2 h-4 bg-[#eab308] ml-0.5 align-middle animate-pulse" />
          </code>
        </pre>
      </div>

      {/* Terminal Status Footer */}
      <div className="px-3.5 py-1.5 bg-[#121216] border-t border-[#d4af37]/15 flex items-center justify-between text-[10px] text-slate-400">
        <div className="flex items-center gap-2">
          <span className="text-[#fef08a] flex items-center gap-1 font-medium">
            <Sparkles className="w-2.5 h-2.5 text-[#eab308]" />
            Compiling
          </span>
          <span>·</span>
          <span>UTF-8</span>
        </div>
        <div className="text-slate-400 font-mono">
          XYNER High-Throughput Core
        </div>
      </div>
    </div>
  );
};

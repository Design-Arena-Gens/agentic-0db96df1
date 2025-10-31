"use client";

import { useCallback, useMemo, useState } from "react";

const UI_TITLE = "Album Automation";

type LogEntry = {
  id: string;
  message: string;
  timestamp: string;
};

function formatTimestamp(date: Date) {
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
}

function createLogEntry(message: string): LogEntry {
  const id =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(16).slice(2)}`;

  return {
    id,
    message,
    timestamp: formatTimestamp(new Date()),
  };
}

export default function Home() {
  const [isOpen, setIsOpen] = useState(true);
  const [logs, setLogs] = useState<LogEntry[]>(() => [
    createLogEntry("UI panel is now visible."),
    createLogEntry("✅ Album Automation UI loaded."),
  ]);

  const panelClass = useMemo(
    () =>
      isOpen
        ? "flex w-full max-w-2xl flex-col gap-6 rounded-2xl border border-zinc-200 bg-white p-8 shadow-xl"
        : "flex w-full max-w-2xl flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 p-12 text-center shadow-inner",
    [isOpen],
  );

  const appendLog = useCallback((message: string) => {
    setLogs((prev) => [...prev, createLogEntry(message)]);
  }, []);

  const handleStart = () => {
    appendLog("Start button clicked. ScriptUI is working.");
    if (typeof window !== "undefined") {
      window.alert("Start button clicked. ScriptUI is working.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-100 via-white to-zinc-100 py-12">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-8 px-4">
        <header className="flex w-full items-center justify-between">
          <h1 className="text-3xl font-semibold text-zinc-900">{UI_TITLE}</h1>
          <button
            type="button"
            onClick={() => {
              setIsOpen(true);
              appendLog("Panel reopened.");
            }}
            className="rounded-full border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-700 shadow-sm transition hover:border-zinc-400 hover:text-zinc-900"
            disabled={isOpen}
          >
            Reopen Panel
          </button>
        </header>
        <div className={panelClass}>
          {isOpen ? (
            <>
              <div className="flex flex-col gap-2">
                <div className="text-lg font-medium text-zinc-900">{UI_TITLE}</div>
                <div className="text-sm text-zinc-500">Interactive web recreation of the ScriptUI panel.</div>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-zinc-100 px-4 py-3 text-sm font-medium text-zinc-800">
                <span>✅ ScriptUI Loaded!</span>
                <span className="text-xs font-normal text-zinc-500">Web adaptation ready</span>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={handleStart}
                  className="flex-1 rounded-lg bg-zinc-900 px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-zinc-800"
                >
                  Start Processing
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false);
                    appendLog("Panel hidden.");
                  }}
                  className="flex-1 rounded-lg border border-zinc-200 bg-white px-6 py-3 text-sm font-semibold text-zinc-700 shadow-sm transition hover:border-zinc-300 hover:text-zinc-900"
                >
                  Close
                </button>
              </div>
              <section className="flex flex-col gap-3">
                <div className="text-sm font-semibold text-zinc-700">Log</div>
                <div className="h-56 w-full overflow-auto rounded-lg border border-zinc-200 bg-zinc-50 p-4 text-sm leading-6 text-zinc-800">
                  {logs.length === 0 ? (
                    <p className="text-zinc-400">Logs will appear here.</p>
                  ) : (
                    <ul className="flex flex-col gap-2">
                      {logs.map((entry) => (
                        <li key={entry.id} className="whitespace-pre-wrap">
                          <span className="font-mono text-xs text-zinc-500">[{entry.timestamp}] </span>
                          {entry.message}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </section>
            </>
          ) : (
            <div className="flex flex-col items-center gap-4">
              <div className="text-lg font-medium text-zinc-700">Panel hidden</div>
              <p className="max-w-sm text-center text-sm text-zinc-500">
                The UI panel has been hidden. Use the Reopen Panel button above to show the interface again.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, X, Minus, Square, Send, CornerDownLeft } from 'lucide-react';
import { CLUB_META, ZONE_PROJECTS, ZONE_TEAM, ZONE_ABOUT } from '@/data/clubData';
import { audioManager } from '@/utils/audioManager';

const WELCOME_BANNER = [
  "   ___    ____   ________   __  ______ ",
  "  /   |  /  _/  / ____/ /  / / / / __ )",
  " / /| |  / /   / /   / /  / / / / __  |",
  "/ ___ |_/ /   / /___/ /__/ /_/ / /_/ / ",
  "/_/  |_/___/   \\____/_____/\\____/_____/  ",
  "AICLUB-OS [v2.4.0-compute-rel] (x86_64-cluster)",
  "Type 'help' to inspect available system commands. Press [~] or [ESC] to exit.",
  "----------------------------------------------------------------------",
];

const AVAILABLE_COMMANDS = [
  { cmd: 'help', desc: 'Display list of available terminal commands' },
  { cmd: 'projects', desc: 'Inspect open-source research projects and repositories' },
  { cmd: 'stats', desc: 'Display real-time cluster compute metrics and metrics summary' },
  { cmd: 'specs', desc: 'Print physical hardware cluster compute architecture' },
  { cmd: 'team', desc: 'List core lab leads, researchers, and faculty advisor' },
  { cmd: 'sound', desc: 'Control facility ambience (usage: sound on | sound off)' },
  { cmd: 'whoami', desc: 'Display your visitor terminal node session identifier' },
  { cmd: 'join', desc: 'Navigate to Zone 07 application dispatch' },
  { cmd: 'matrix', desc: 'Toggle ASCII neural matrix simulation stream' },
  { cmd: 'clear', desc: 'Clear the terminal output screen buffer' },
  { cmd: 'exit', desc: 'Close interactive CLI terminal window' },
];

/**
 * TerminalCLI
 * Retro-futuristic interactive UNIX-style terminal window.
 * Allows visitors to query real club data, toggle sound, explore projects, and run Easter eggs.
 */
export default function TerminalCLI({ isOpen, onClose, onNavigateToZone }) {
  const [history, setHistory] = useState([
    { type: 'banner', lines: WELCOME_BANNER },
    { type: 'system', text: "System check: ALL NODES OPERATIONAL. Ready for input." },
  ]);
  const [inputVal, setInputVal] = useState('');
  const [cmdHistory, setCmdHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [matrixActive, setMatrixActive] = useState(false);

  const inputRef = useRef(null);
  const endRef = useRef(null);

  // Focus input whenever opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 80);
    }
  }, [isOpen]);

  // Scroll to bottom on new output
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history, matrixActive]);

  // Matrix digital rain timer
  useEffect(() => {
    if (!matrixActive) return;
    const chars = '0123456789ABCDEF010101XYZ';
    const interval = setInterval(() => {
      let rain = '';
      for (let i = 0; i < 48; i++) {
        rain += chars[Math.floor(Math.random() * chars.length)] + (Math.random() > 0.8 ? ' ' : '');
      }
      setHistory((prev) => [...prev.slice(-30), { type: 'matrix', text: rain }]);
    }, 120);

    return () => clearInterval(interval);
  }, [matrixActive]);

  // Global keydown listeners: ESC and backtick
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === '`' || e.key === '~') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleCommand = (raw) => {
    const trimmed = raw.trim();
    if (!trimmed) return;

    audioManager.playBeep(1050, 0.05);

    // Record command history
    setCmdHistory((prev) => [...prev, trimmed]);
    setHistoryIndex(-1);

    const parts = trimmed.split(' ');
    const cmd = parts[0].toLowerCase();
    const arg = parts[1]?.toLowerCase();

    const newHistory = [...history, { type: 'input', text: trimmed }];

    switch (cmd) {
      case 'help':
        newHistory.push({
          type: 'help',
          commands: AVAILABLE_COMMANDS,
        });
        break;

      case 'projects':
        newHistory.push({
          type: 'projects',
          projects: ZONE_PROJECTS.projects,
        });
        break;

      case 'stats':
        newHistory.push({
          type: 'stats',
          stats: ZONE_ABOUT.stats,
        });
        break;

      case 'specs':
        newHistory.push({
          type: 'specs',
          lines: [
            "COMPUTE CLUSTER // HARDWARE SPECIFICATION:",
            "  * Accelerator Pod 01: 8x NVIDIA H100 80GB SXM5 (NVLink 900 GB/s)",
            "  * Workstation Pod 02: 12x NVIDIA RTX 4090 24GB (Edge Inference)",
            "  * Host Processors: Dual AMD EPYC 9654 (192 Cores, 384 Threads @ 3.55 GHz)",
            "  * System Memory: 1.5 TB DDR5-4800 ECC Registered",
            "  * Interconnect: NVIDIA Quantum-2 InfiniBand 400Gb/s Low-Latency Fabric",
            "  * Storage Pool: 120 TB NVMe PCIe Gen5 ZFS RAID-10 Scratch Storage",
            "  * Thermal Control: Direct-to-Chip Fluorochemical Liquid Closed-Loop",
          ],
        });
        break;

      case 'team':
        newHistory.push({
          type: 'team',
          members: ZONE_TEAM.members,
        });
        break;

      case 'sound':
        if (arg === 'on') {
          audioManager.setSoundEnabled(true);
          newHistory.push({ type: 'system', text: "Atmospheric server ambience enabled: [ON]" });
        } else if (arg === 'off') {
          audioManager.setSoundEnabled(false);
          newHistory.push({ type: 'system', text: "Atmospheric server ambience muted: [OFF]" });
        } else {
          const state = audioManager.toggleSound();
          newHistory.push({
            type: 'system',
            text: `Facility audio toggled: ${state ? '[ON]' : '[OFF]'}`,
          });
        }
        break;

      case 'whoami':
        newHistory.push({
          type: 'system',
          text: `NODE-SESSION // VISITOR_${Math.floor(1000 + Math.random() * 9000)} | TLS_1.3 | AUTH: GUEST_RESEARCHER | ACC: /facility/corridor/z01`,
        });
        break;

      case 'join':
        newHistory.push({
          type: 'system',
          text: "Navigating to Zone 07 Facility Application Gate...",
        });
        if (onNavigateToZone) {
          setTimeout(() => {
            onNavigateToZone(6);
            onClose();
          }, 600);
        }
        break;

      case 'matrix':
        setMatrixActive((prev) => !prev);
        newHistory.push({
          type: 'system',
          text: matrixActive ? "Matrix telemetry stream terminated." : "Matrix neural stream initiated...",
        });
        break;

      case 'clear':
        setHistory([]);
        setInputVal('');
        return;

      case 'exit':
      case 'quit':
        onClose();
        return;

      default:
        newHistory.push({
          type: 'error',
          text: `zsh: command not found: ${cmd}. Type 'help' for available commands.`,
        });
        break;
    }

    setHistory(newHistory);
    setInputVal('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleCommand(inputVal);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (cmdHistory.length > 0) {
        const nextIdx = historyIndex + 1;
        if (nextIdx < cmdHistory.length) {
          setHistoryIndex(nextIdx);
          setInputVal(cmdHistory[cmdHistory.length - 1 - nextIdx]);
        }
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIdx = historyIndex - 1;
        setHistoryIndex(nextIdx);
        setInputVal(cmdHistory[cmdHistory.length - 1 - nextIdx]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInputVal('');
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const current = inputVal.trim().toLowerCase();
      const match = AVAILABLE_COMMANDS.find((c) => c.cmd.startsWith(current));
      if (match) {
        setInputVal(match.cmd);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-graphite/80 backdrop-blur-md animate-fade-in pointer-events-auto">
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-3xl h-[80vh] max-h-[640px] rounded-2xl bg-[#121617]/95 border border-slate-struct/70 shadow-2xl flex flex-col overflow-hidden font-mono text-xs text-ivory/90 select-text"
      >
        {/* Terminal Header Bar */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-[#171B1C] border-b border-slate-struct/50 select-none shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-rose-500/80 cursor-pointer" onClick={onClose} />
              <span className="w-3 h-3 rounded-full bg-amber-500/80 cursor-pointer" onClick={onClose} />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 cursor-pointer" />
            </div>
            <div className="flex items-center gap-2 ml-2">
              <TerminalIcon className="w-3.5 h-3.5 text-sage" />
              <span className="text-[11px] font-semibold text-ivory/80 tracking-wide">
                AICLUB-OS // aiclub@facility-core:~
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-sage animate-ping" />
            <span className="text-[10px] text-sage font-bold uppercase hidden sm:inline">
              NODE_ALPHA: ONLINE
            </span>
            <button
              onClick={onClose}
              className="p-1 rounded text-slate-400 hover:text-ivory hover:bg-slate-struct/40 ml-2"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Terminal Screen Buffer */}
        <div
          onClick={() => inputRef.current?.focus()}
          className="flex-1 p-4 overflow-y-auto space-y-2.5 bg-[#101314]/90 text-[11px] leading-relaxed cursor-text"
        >
          {history.map((item, idx) => {
            if (item.type === 'banner') {
              return (
                <div key={idx} className="text-sage font-bold leading-tight select-none">
                  {item.lines.map((l, i) => (
                    <div key={i}>{l}</div>
                  ))}
                </div>
              );
            }

            if (item.type === 'input') {
              return (
                <div key={idx} className="flex items-center gap-2 text-ivory">
                  <span className="text-sage font-bold">aiclub@facility:~$</span>
                  <span className="text-ivory font-semibold">{item.text}</span>
                </div>
              );
            }

            if (item.type === 'help') {
              return (
                <div key={idx} className="p-2.5 rounded-lg bg-black/40 border border-slate-struct/30 space-y-1">
                  <div className="text-sage font-bold mb-1.5">// AVAILABLE SYSTEM COMMANDS:</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1">
                    {item.commands.map((c, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <span className="text-sage font-bold w-20 shrink-0">{c.cmd}</span>
                        <span className="text-slate-400">{c.desc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            }

            if (item.type === 'projects') {
              return (
                <div key={idx} className="p-3 rounded-lg bg-black/40 border border-slate-struct/30 space-y-2">
                  <div className="text-sage font-bold">// RESEARCH & OPEN-SOURCE REPOSITORIES:</div>
                  {item.projects.map((p, i) => (
                    <div key={i} className="border-b border-slate-struct/20 pb-1.5 last:border-0 last:pb-0">
                      <div className="flex items-center justify-between">
                        <span className="text-ivory font-bold">{p.title}</span>
                        <span className="text-sage text-[10px] font-semibold">{p.metrics}</span>
                      </div>
                      <div className="text-slate-400 text-[10px] mt-0.5">{p.description}</div>
                      <div className="text-sage/70 text-[9px] mt-0.5">Stack: {p.techStack.join(' • ')}</div>
                    </div>
                  ))}
                </div>
              );
            }

            if (item.type === 'stats') {
              return (
                <div key={idx} className="p-3 rounded-lg bg-black/40 border border-slate-struct/30 space-y-1.5">
                  <div className="text-sage font-bold">// REAL-TIME FACILITY TELEMETRY:</div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                    {item.stats.map((s, i) => (
                      <div key={i} className="p-2 rounded bg-charcoal/40 border border-slate-struct/20">
                        <div className="text-lg font-bold text-sage">{s.value}</div>
                        <div className="text-[10px] text-ivory/80 font-medium">{s.label}</div>
                        <div className="text-[9px] text-slate-400">{s.unit}</div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            }

            if (item.type === 'specs') {
              return (
                <div key={idx} className="p-3 rounded-lg bg-black/40 border border-slate-struct/30 space-y-1">
                  {item.lines.map((l, i) => (
                    <div key={i} className={i === 0 ? 'text-sage font-bold' : 'text-slate-300'}>
                      {l}
                    </div>
                  ))}
                </div>
              );
            }

            if (item.type === 'team') {
              return (
                <div key={idx} className="p-3 rounded-lg bg-black/40 border border-slate-struct/30 space-y-2">
                  <div className="text-sage font-bold">// CORE LAB RESEARCHERS & LEADS:</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {item.members.map((m, i) => (
                      <div key={i} className="p-2 rounded bg-charcoal/30 border border-slate-struct/20">
                        <div className="text-ivory font-bold">{m.name}</div>
                        <div className="text-sage text-[10px]">{m.role}</div>
                        <div className="text-slate-400 text-[9px]">{m.domain}</div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            }

            if (item.type === 'matrix') {
              return (
                <div key={idx} className="text-emerald-400 font-mono text-[10px] tracking-widest opacity-80">
                  {item.text}
                </div>
              );
            }

            if (item.type === 'error') {
              return (
                <div key={idx} className="text-rose-400">
                  {item.text}
                </div>
              );
            }

            return (
              <div key={idx} className="text-slate-300">
                {item.text}
              </div>
            );
          })}
          <div ref={endRef} />
        </div>

        {/* Input Bar */}
        <div className="flex items-center gap-2 px-4 py-3 bg-[#15191A] border-t border-slate-struct/50 shrink-0">
          <span className="text-sage font-bold text-xs select-none">aiclub@facility:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type 'help' or command..."
            className="flex-1 bg-transparent text-ivory outline-none border-none font-mono text-xs placeholder:text-slate-600 caret-sage"
            autoFocus
            spellCheck={false}
          />
          <button
            onClick={() => handleCommand(inputVal)}
            className="p-1.5 rounded-lg bg-sage/20 hover:bg-sage text-sage hover:text-graphite transition-colors cursor-pointer"
          >
            <CornerDownLeft className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}


'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, X, CornerDownLeft } from 'lucide-react';
import { getUpcomingEvents, getUpcomingDiscussions, getCuratedNews, getAllProjects, getTeamMembers } from '@/lib/contentSelectors';
import { RESEARCH_TRACKS, COMPUTE_SPECS } from '@/data/research';
import { CLUB_INFO } from '@/data/clubInfo';
import { audioManager } from '@/utils/audioManager';

const WELCOME_BANNER = [
  "   ___    ____   ________   __  ______ ",
  "  /   |  /  _/  / ____/ /  / / / / __ )",
  " / /| |  / /   / /   / /  / / / / __  |",
  "/ ___ |_/ /   / /___/ /__/ /_/ / /_/ / ",
  "/_/  |_/___/   \\____/_____/\\____/_____/  ",
  "AICLUB-OS [v2.8.0-signal-v2] (x86_64-cluster)",
  "Type 'help' to inspect available system commands. Press [~] or [ESC] to exit.",
  "----------------------------------------------------------------------",
];

const AVAILABLE_COMMANDS = [
  { cmd: 'help', desc: 'Display list of available terminal commands' },
  { cmd: 'events', desc: 'Display upcoming workshops, hackathons & operations' },
  { cmd: 'gd', desc: 'Display Group Discussions & reading circle schedules' },
  { cmd: 'news', desc: 'Display curated AI Radar breakthroughs & releases' },
  { cmd: 'projects', desc: 'Inspect open-source research projects and repositories' },
  { cmd: 'research', desc: 'Print cognitive tracks and hardware compute cluster specs' },
  { cmd: 'team', desc: 'List core lab leads, researchers, and faculty advisor' },
  { cmd: 'join', desc: 'Navigate directly to Section 09 recruitment intake' },
  { cmd: 'sound', desc: 'Control facility ambience (usage: sound on | sound off)' },
  { cmd: 'clear', desc: 'Clear the terminal output screen buffer' },
  { cmd: 'exit', desc: 'Close interactive CLI terminal window' },
];

/**
 * TerminalCLI
 * Interactive UNIX-style terminal window querying real club data and navigating sections.
 */
export default function TerminalCLI({ isOpen, onClose, onNavigateToSection }) {
  const [history, setHistory] = useState([
    { type: 'banner', lines: WELCOME_BANNER },
    { type: 'system', text: "System check: BDX-01 & ALL COMPUTE CLUSTERS OPERATIONAL. Ready for input." },
  ]);
  const [inputVal, setInputVal] = useState('');
  const [cmdHistory, setCmdHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const inputRef = useRef(null);
  const endRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 80);
    }
  }, [isOpen]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

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

      case 'events': {
        const events = getUpcomingEvents();
        newHistory.push({
          type: 'events',
          items: events,
        });
        if (onNavigateToSection && arg === 'go') {
          setTimeout(() => {
            onNavigateToSection('events', 'events');
            onClose();
          }, 400);
        }
        break;
      }

      case 'gd': {
        const gds = getUpcomingDiscussions();
        newHistory.push({
          type: 'gd',
          items: gds,
        });
        if (onNavigateToSection && arg === 'go') {
          setTimeout(() => {
            onNavigateToSection('discussions', 'discussions');
            onClose();
          }, 400);
        }
        break;
      }

      case 'news': {
        const news = getCuratedNews();
        newHistory.push({
          type: 'news',
          items: news,
        });
        if (onNavigateToSection && arg === 'go') {
          setTimeout(() => {
            onNavigateToSection('radar', 'radar');
            onClose();
          }, 400);
        }
        break;
      }

      case 'projects': {
        const projects = getAllProjects();
        newHistory.push({
          type: 'projects',
          items: projects,
        });
        if (onNavigateToSection && arg === 'go') {
          setTimeout(() => {
            onNavigateToSection('projects', 'projects');
            onClose();
          }, 400);
        }
        break;
      }

      case 'research': {
        newHistory.push({
          type: 'research',
          tracks: RESEARCH_TRACKS,
          specs: COMPUTE_SPECS,
        });
        break;
      }

      case 'team': {
        const members = getTeamMembers();
        newHistory.push({
          type: 'team',
          members: members,
        });
        if (onNavigateToSection && arg === 'go') {
          setTimeout(() => {
            onNavigateToSection('team', 'team');
            onClose();
          }, 400);
        }
        break;
      }

      case 'join': {
        newHistory.push({
          type: 'system',
          text: "Navigating to Section 09: Join the Network application gateway...",
        });
        if (onNavigateToSection) {
          setTimeout(() => {
            onNavigateToSection('join-network', 'join');
            onClose();
          }, 500);
        }
        break;
      }

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-graphite/80 backdrop-blur-md animate-fade-in pointer-events-auto font-mono text-xs text-ivory/90">
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-3xl h-[80vh] max-h-[640px] rounded-2xl bg-[#121617]/95 border border-slate-struct/70 shadow-2xl flex flex-col overflow-hidden select-text"
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
                AICLUB-OS // aiclub@signal-v2:~
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-sage animate-ping" />
            <span className="text-[10px] text-sage font-bold uppercase hidden sm:inline">
              SIGNAL_V2: ONLINE
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

            if (item.type === 'events') {
              return (
                <div key={idx} className="p-3 rounded-lg bg-black/40 border border-slate-struct/30 space-y-2">
                  <div className="text-sage font-bold">// UPCOMING OPERATIONS BOARD:</div>
                  {item.items.map((ev, i) => (
                    <div key={i} className="border-b border-slate-struct/20 pb-1.5 last:border-0 last:pb-0">
                      <div className="flex items-center justify-between">
                        <span className="text-ivory font-bold">{ev.title}</span>
                        <span className="text-sage text-[10px] font-semibold">{ev.category}</span>
                      </div>
                      <div className="text-slate-400 text-[10px]">{ev.date} • {ev.venue}</div>
                      <div className="text-slate-500 text-[10px]">{ev.description}</div>
                    </div>
                  ))}
                </div>
              );
            }

            if (item.type === 'gd') {
              return (
                <div key={idx} className="p-3 rounded-lg bg-black/40 border border-slate-struct/30 space-y-2">
                  <div className="text-sage font-bold">// DISCUSSION ROOM TOPICS:</div>
                  {item.items.map((gd, i) => (
                    <div key={i} className="border-b border-slate-struct/20 pb-1.5 last:border-0 last:pb-0">
                      <div className="flex items-center justify-between">
                        <span className="text-ivory font-bold">{gd.topic}</span>
                        <span className="text-sage text-[10px]">{gd.category}</span>
                      </div>
                      <div className="text-slate-400 text-[10px]">{gd.date} • Moderator: {gd.moderator}</div>
                      <div className="text-slate-500 text-[10px]">{gd.abstract}</div>
                    </div>
                  ))}
                </div>
              );
            }

            if (item.type === 'news') {
              return (
                <div key={idx} className="p-3 rounded-lg bg-black/40 border border-slate-struct/30 space-y-2">
                  <div className="text-sage font-bold">// AI RADAR VERIFIED DISPATCHES:</div>
                  {item.items.map((n, i) => (
                    <div key={i} className="border-b border-slate-struct/20 pb-1.5 last:border-0 last:pb-0">
                      <div className="text-ivory font-bold">{n.headline}</div>
                      <div className="text-slate-400 text-[10px]">{n.source} • {n.date}</div>
                      <div className="text-slate-500 text-[10px]">{n.summary}</div>
                    </div>
                  ))}
                </div>
              );
            }

            if (item.type === 'projects') {
              return (
                <div key={idx} className="p-3 rounded-lg bg-black/40 border border-slate-struct/30 space-y-2">
                  <div className="text-sage font-bold">// RESEARCH & OPEN-SOURCE REPOSITORIES:</div>
                  {item.items.map((p, i) => (
                    <div key={i} className="border-b border-slate-struct/20 pb-1.5 last:border-0 last:pb-0">
                      <div className="flex items-center justify-between">
                        <span className="text-ivory font-bold">{p.title}</span>
                        <span className="text-sage text-[10px] font-semibold">{p.category}</span>
                      </div>
                      <div className="text-slate-400 text-[10px] mt-0.5">{p.description}</div>
                      <div className="text-sage/70 text-[9px] mt-0.5">Stack: {p.technologies.join(' • ')}</div>
                    </div>
                  ))}
                </div>
              );
            }

            if (item.type === 'research') {
              return (
                <div key={idx} className="p-3 rounded-lg bg-black/40 border border-slate-struct/30 space-y-2">
                  <div className="text-sage font-bold">// COGNITIVE TRACKS & COMPUTE ARCHITECTURE:</div>
                  <div className="text-slate-300 text-[10px]">
                    Accelerators: {item.specs.accelerators}
                  </div>
                  <div className="text-slate-300 text-[10px]">
                    Host: {item.specs.hostProcessors}
                  </div>
                  <div className="text-slate-300 text-[10px]">
                    Interconnect: {item.specs.interconnect}
                  </div>
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
            placeholder="Type 'help' or command (e.g. 'events', 'gd', 'news', 'join')..."
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

'use client';

import React, { useEffect } from 'react';
import { X, Cpu, Zap, Activity, Thermometer, ShieldCheck, HardDrive } from 'lucide-react';
import { audioManager } from '@/utils/audioManager';

/**
 * ServerBladeModal
 * Real-time cluster compute node inspection modal.
 * Opens when the user clicks on the interactive server blade rack in Zone 02.
 */
export default function ServerBladeModal({ isOpen, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-graphite/80 backdrop-blur-md animate-fade-in pointer-events-auto">
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl rounded-2xl bg-charcoal/95 border border-white/10 shadow-glass-panel p-6 sm:p-8 text-ivory font-sans"
      >
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-white/10 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sage/15 border border-sage/40 flex items-center justify-center">
              <Cpu className="w-5 h-5 text-sage" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-sage animate-ping" />
                <h3 className="text-lg sm:text-xl font-sans font-bold tracking-tight text-ivory">
                  NODE ALPHA-01 // RACK 42U
                </h3>
              </div>
              <p className="text-xs text-sage/80 mt-0.5 font-sans font-medium">
                SXM5 Liquid-Cooled Autonomous Compute Blade
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              audioManager.playClick();
              onClose();
            }}
            className="p-1.5 rounded-full text-slate-400 hover:text-ivory hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Live Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6 font-sans">
          <div className="p-3.5 rounded-xl bg-graphite/60 border border-white/10">
            <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
              <Activity className="w-3.5 h-3.5 text-sage" />
              <span>GPU Util</span>
            </div>
            <div className="text-lg font-bold text-sage num-normal">94.2%</div>
            <div className="w-full bg-charcoal rounded-full h-1.5 mt-2 overflow-hidden">
              <div className="bg-sage h-1.5 rounded-full w-[94%]" />
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-graphite/60 border border-white/10">
            <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>Power Draw</span>
            </div>
            <div className="text-lg font-bold text-ivory num-normal">1,840 W</div>
            <div className="text-[10px] text-slate-400 mt-1 font-sans">96% Power Factor</div>
          </div>

          <div className="p-3.5 rounded-xl bg-graphite/60 border border-white/10">
            <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
              <Thermometer className="w-3.5 h-3.5 text-sage" />
              <span>Immersion</span>
            </div>
            <div className="text-lg font-bold text-sage num-normal">52°C</div>
            <div className="text-[10px] text-slate-400 mt-1 font-sans">Closed-Loop 4.2 L/m</div>
          </div>

          <div className="p-3.5 rounded-xl bg-graphite/60 border border-white/10">
            <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
              <HardDrive className="w-3.5 h-3.5 text-ivory/80" />
              <span>VRAM Pool</span>
            </div>
            <div className="text-lg font-bold text-ivory num-normal">320 GB</div>
            <div className="text-[10px] text-slate-400 mt-1 font-sans">HBM3 3.35 TB/s</div>
          </div>
        </div>

        {/* Detailed Hardware Breakdown */}
        <div className="space-y-3 mb-6 text-xs">
          <div className="flex items-center justify-between p-3 rounded-xl bg-graphite/40 border border-white/10 font-sans">
            <span className="text-slate-400 font-medium">Accelerators</span>
            <span className="font-semibold text-ivory">4x NVIDIA H100 80GB SXM5 + 4x RTX 4090 OC</span>
          </div>
          <div className="flex items-center justify-between p-3 rounded-xl bg-graphite/40 border border-white/10 font-sans">
            <span className="text-slate-400 font-medium">Host Processors</span>
            <span className="font-semibold text-ivory">Dual AMD EPYC 9654 (192 Cores, 384 Threads)</span>
          </div>
          <div className="flex items-center justify-between p-3 rounded-xl bg-graphite/40 border border-white/10 font-sans">
            <span className="text-slate-400 font-medium">Active Training Task</span>
            <span className="font-semibold text-sage">Distributed LoRA Fine-Tuning (Batch 512, step 14.8k)</span>
          </div>
          <div className="flex items-center justify-between p-3 rounded-xl bg-graphite/40 border border-white/10 font-sans">
            <span className="text-slate-400 font-medium">Cluster Uptime</span>
            <span className="font-semibold text-ivory num-normal">42 days, 18 hrs (99.98% SLA)</span>
          </div>
        </div>

        {/* Simulated Live Kernel Stream */}
        <div className="p-3 rounded-xl bg-black/60 border border-white/10 font-mono text-[11px] text-slate-300 space-y-1 mb-6 overflow-x-auto">
          <div className="text-slate-500">// Real-time cluster logging</div>
          <div>
            <span className="text-sage">[INFO]</span> <span className="text-ivory">rank_0:</span> epoch 14/50 | loss=0.0821 | grad_norm=0.42 | lr=1.4e-5
          </div>
          <div>
            <span className="text-sage">[INFO]</span> <span className="text-ivory">rank_1:</span> checkpoint_step_14800 saved to /archive/models/aiclub-7b
          </div>
          <div>
            <span className="text-sage">[INFO]</span> <span className="text-ivory">liquid_cooling:</span> pump flow rate nominal at 4.2 L/min
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-white/10">
          <div className="flex items-center gap-2 text-xs text-slate-400 font-sans font-medium">
            <ShieldCheck className="w-4 h-4 text-sage" />
            <span>Autonomous Health: All Nodes Green</span>
          </div>

          <button
            onClick={() => {
              audioManager.playClick();
              onClose();
            }}
            className="px-5 py-2 rounded-xl bg-sage hover:bg-sage-glow text-graphite font-sans font-semibold text-xs transition-all cursor-pointer uppercase tracking-wider"
          >
            DISMISS TELEMETRY
          </button>
        </div>
      </div>
    </div>
  );
}

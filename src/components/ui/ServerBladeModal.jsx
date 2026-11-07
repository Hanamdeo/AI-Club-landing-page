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
        className="w-full max-w-2xl rounded-xl bg-[#141819] border border-white/[0.12] shadow-2xl p-6 sm:p-7 text-ivory font-sans"
      >
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-white/[0.08] mb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-sage/10 border border-sage/30 flex items-center justify-center">
              <Cpu className="w-5 h-5 text-sage" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-sage animate-ping" />
                <h3 className="text-lg sm:text-xl font-bold tracking-tight text-ivory">
                  COMPUTE NODE ALPHA
                </h3>
              </div>
              <p className="text-xs text-ivory/60 mt-0.5 font-mono">
                High-Performance Student Compute Node
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              audioManager.playClick();
              onClose();
            }}
            className="p-1.5 rounded-lg text-ivory/60 hover:text-ivory hover:bg-white/[0.06] transition-colors btn-tactile cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Live Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-5 font-mono">
          <div className="p-3 rounded-lg bg-[#101415] border border-white/[0.06]">
            <div className="flex items-center gap-1.5 text-xs text-ivory/50 mb-1">
              <Activity className="w-3.5 h-3.5 text-sage" />
              <span>GPU Util</span>
            </div>
            <div className="text-base sm:text-lg font-bold text-sage">94.2%</div>
            <div className="w-full bg-white/[0.08] rounded-full h-1 mt-2 overflow-hidden">
              <div className="bg-sage h-1 rounded-full w-[94%]" />
            </div>
          </div>

          <div className="p-3 rounded-lg bg-[#101415] border border-white/[0.06]">
            <div className="flex items-center gap-1.5 text-xs text-ivory/50 mb-1">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>Power Draw</span>
            </div>
            <div className="text-base sm:text-lg font-bold text-ivory">1,840 W</div>
            <div className="text-[10px] text-ivory/40 mt-1">96% Power Factor</div>
          </div>

          <div className="p-3 rounded-lg bg-[#101415] border border-white/[0.06]">
            <div className="flex items-center gap-1.5 text-xs text-ivory/50 mb-1">
              <Thermometer className="w-3.5 h-3.5 text-sage" />
              <span>Immersion</span>
            </div>
            <div className="text-base sm:text-lg font-bold text-sage">52°C</div>
            <div className="text-[10px] text-ivory/40 mt-1">Closed-Loop 4.2 L/m</div>
          </div>

          <div className="p-3 rounded-lg bg-[#101415] border border-white/[0.06]">
            <div className="flex items-center gap-1.5 text-xs text-ivory/50 mb-1">
              <HardDrive className="w-3.5 h-3.5 text-ivory/70" />
              <span>VRAM Pool</span>
            </div>
            <div className="text-base sm:text-lg font-bold text-ivory">320 GB</div>
            <div className="text-[10px] text-ivory/40 mt-1">HBM3 3.35 TB/s</div>
          </div>
        </div>

        {/* Detailed Hardware Breakdown */}
        <div className="space-y-2 mb-5 text-xs font-mono">
          <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#101415] border border-white/[0.06]">
            <span className="text-ivory/50">Accelerators</span>
            <span className="font-medium text-ivory">4x NVIDIA H100 80GB SXM5 + 4x RTX 4090 OC</span>
          </div>
          <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#101415] border border-white/[0.06]">
            <span className="text-ivory/50">Host Processors</span>
            <span className="font-medium text-ivory">Dual AMD EPYC 9654 (192 Cores, 384 Threads)</span>
          </div>
          <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#101415] border border-white/[0.06]">
            <span className="text-ivory/50">Active Task</span>
            <span className="font-medium text-sage">Distributed LoRA Fine-Tuning (Batch 512, step 14.8k)</span>
          </div>
          <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#101415] border border-white/[0.06]">
            <span className="text-ivory/50">Cluster Uptime</span>
            <span className="font-medium text-ivory">42 days, 18 hrs (99.98% SLA)</span>
          </div>
        </div>

        {/* Simulated Live Kernel Stream */}
        <div className="p-3 rounded-lg bg-[#0C0F10] border border-white/[0.06] font-mono text-[11px] text-ivory/70 space-y-1 mb-5 overflow-x-auto">
          <div className="text-ivory/40">Real-time cluster logging</div>
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
        <div className="flex items-center justify-between pt-4 border-t border-white/[0.08]">
          <div className="flex items-center gap-2 text-xs font-mono text-ivory/60">
            <ShieldCheck className="w-4 h-4 text-sage" />
            <span>Autonomous Health: All Nodes Green</span>
          </div>

          <button
            onClick={() => {
              audioManager.playClick();
              onClose();
            }}
            className="px-4 py-2 rounded-lg bg-sage hover:bg-sage/90 text-graphite font-mono font-bold text-xs transition-all cursor-pointer uppercase tracking-wider btn-tactile shadow-sm"
          >
            DISMISS
          </button>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import { History, Mic, Sparkles, Image as ImageIcon } from 'lucide-react';

export default function ChatScreen() {
  return (
    <div class="h-full flex flex-col justify-between text-xs text-slate-200 bg-[#080B1A] p-3 pt-1.5 select-none overflow-hidden relative font-sans">
      {/* Background Deep Space Glow */}
      <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-950/40 via-[#080B1A] to-[#04060E] pointer-events-none"></div>

      {/* Top Bar */}
      <div class="relative z-10 space-y-2">
        <div class="flex items-center justify-between text-[10px] text-slate-400 border-b border-slate-800/80 pb-1.5">
          <button class="flex items-center gap-1 bg-slate-900/80 border border-slate-800 rounded-full px-2.5 py-0.5 text-slate-200 font-medium">
            <span class="text-xs font-bold">+</span> New chat
          </button>
          <History class="w-3.5 h-3.5 text-slate-400" />
        </div>

        {/* Chat History Messages */}
        <div class="space-y-3 pt-2">
          {/* User Message */}
          <div class="flex justify-end">
            <div class="bg-gradient-to-r from-purple-800 to-indigo-900 border border-purple-500/30 rounded-2xl rounded-tr-sm p-2.5 max-w-[210px] text-right shadow-md">
              <p class="text-[10px] font-medium text-white leading-snug">
                How does this affect tomorrow's training?
              </p>
              <span class="text-[7.5px] text-purple-300 font-mono block mt-1">5:17 AM</span>
            </div>
          </div>

          {/* Aurora AI Assistant Response Card */}
          <div class="bg-[#0F142B]/95 border border-purple-500/25 rounded-2xl p-3 shadow-xl backdrop-blur-md space-y-2">
            <p class="text-[9.5px] text-slate-200 leading-relaxed font-light">
              Tomorrow can be a normal training day, not a recovery-only day. Today's tennis was mostly easy effort, and your recovery is <strong class="text-white font-semibold">86/100</strong>, so you likely have room for your planned session; just don't treat today as proof you completed a hard conditioning workout. Keep tomorrow's workout structured, then add an easy walk if you want more movement without piling on fatigue.
            </p>

            <div class="flex items-center justify-between pt-1 border-t border-slate-800/60 text-[8px] text-slate-400">
              <span class="bg-slate-900 border border-slate-800 rounded-full px-2 py-0.5 text-purple-300 font-medium flex items-center gap-1">
                Based on <span class="text-[6px]">▼</span>
              </span>
              <span class="font-mono text-slate-500">5:17 AM</span>
            </div>
          </div>
        </div>

        {/* Quick Suggestion Pills */}
        <div class="flex gap-1.5 overflow-x-auto no-scrollbar pt-2">
          <button class="shrink-0 bg-[#0F142B] text-slate-300 text-[8.5px] px-2.5 py-1 rounded-full border border-slate-800">
            Should tomorrow be strength o...
          </button>
          <button class="shrink-0 bg-[#0F142B] text-slate-300 text-[8.5px] px-2.5 py-1 rounded-full border border-slate-800">
            How many step
          </button>
        </div>
      </div>

      {/* Input Field Bar */}
      <div class="relative z-10 space-y-1.5 mt-2">
        <p class="text-[7.5px] text-slate-500 text-center">
          AI-generated guidance, not medical advice. Confirm logs before saving.
        </p>

        <div class="bg-[#0A0E22] border border-purple-500/30 rounded-2xl p-2 px-3 flex items-center justify-between shadow-inner">
          <div class="flex items-center gap-2 text-slate-400 text-[9.5px]">
            <div class="w-5 h-5 rounded-lg bg-purple-500/20 text-purple-300 flex items-center justify-center">
              <ImageIcon class="w-3 h-3" />
            </div>
            <span>Ask about today's movement...</span>
          </div>
          <button class="w-5 h-5 rounded-full bg-purple-500/30 text-purple-200 flex items-center justify-center">
            <Mic class="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
}

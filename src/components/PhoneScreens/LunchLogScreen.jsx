import React from 'react';
import { History, Check, X, Image as ImageIcon, Mic } from 'lucide-react';

export default function LunchLogScreen() {
  return (
    <div class="h-full flex flex-col justify-between text-xs text-slate-200 bg-[#0A0D1B] p-3 pt-1.5 select-none overflow-hidden relative font-sans">
      {/* Background Faint Starfield & Nebula Glow */}
      <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/30 via-[#0A0D1B] to-[#04060E] pointer-events-none"></div>

      {/* Top Banner prompt */}
      <div class="relative z-10 space-y-2">
        <div class="flex items-center justify-between text-[10px] text-slate-400 border-b border-slate-800/80 pb-1.5">
          <span class="flex items-center gap-1.5 text-slate-300">
            <span class="text-xs">+</span>
            <span class="font-medium text-white">New chat</span>
          </span>
          <span class="text-[9.5px] text-slate-300 font-light">
            Save this to your Lunch log?
          </span>
          <History class="w-3.5 h-3.5 text-slate-300" />
        </div>

        {/* Draft Meal Card */}
        <div class="bg-gradient-to-b from-[#181E36]/90 to-[#101426]/95 border border-purple-500/30 rounded-2xl p-3 shadow-xl backdrop-blur-md relative overflow-hidden">
          <div class="text-[9px] uppercase tracking-wider font-semibold text-purple-300/80 mb-1">
            DRAFT MEAL
          </div>

          <h4 class="text-base font-bold text-white mb-2">
            Lunch – ~690 cal
          </h4>

          <p class="text-[10px] text-slate-300 leading-relaxed mb-2.5 font-light">
            Baked sweet potato, Tomato chilli, Mozzarella cheese, Black beans, Red pepper, Sour cream
          </p>

          <div class="text-[10.5px] font-mono font-bold text-purple-200 mb-3">
            P 26.0g – C 101.0g – F 21.0g
          </div>

          {/* Category selection buttons */}
          <div class="flex flex-wrap gap-1.5 mb-3">
            {['Breakfast', 'Lunch', 'Dinner', 'Snack', 'Drinks'].map((cat) => (
              <button
                key={cat}
                class={`text-[9.5px] px-3 py-1 rounded-full transition-all ${
                  cat === 'Lunch'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/50 font-semibold shadow-sm'
                    : 'bg-slate-900/80 text-slate-400 border border-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Ate at time bar */}
          <div class="flex items-center gap-2 text-[9.5px] text-slate-300 mb-3">
            <span class="flex items-center gap-1 text-cyan-400">
              <span class="w-3 h-3 rounded-full border border-cyan-400 flex items-center justify-center text-[7px]">🕒</span>
              Ate at
            </span>
            <span class="bg-[#090D1F] text-white font-mono px-3 py-1 rounded-xl border border-slate-700 text-xs font-bold">
              11:41 AM
            </span>
            <span class="bg-cyan-500/20 text-cyan-300 text-[9px] px-2.5 py-0.5 rounded-full font-medium border border-cyan-500/30">
              Now
            </span>
          </div>

          {/* Nutrition pills */}
          <div class="flex gap-2 mb-4">
            <span class="bg-slate-900/90 text-cyan-300 text-[9px] px-2.5 py-1 rounded-full border border-cyan-500/30">
              Caffeine 0mg
            </span>
            <span class="bg-slate-900/90 text-teal-300 text-[9px] px-2.5 py-1 rounded-full border border-teal-500/30">
              Hydration 0ml
            </span>
          </div>

          {/* Action buttons */}
          <div class="grid grid-cols-2 gap-2">
            <button class="flex items-center justify-center gap-1.5 bg-[#0D1224] hover:bg-slate-800 text-slate-200 py-2 rounded-xl text-[11px] font-medium border border-cyan-500/30">
              <X class="w-3.5 h-3.5 text-cyan-400" /> Cancel
            </button>
            <button class="flex items-center justify-center gap-1.5 bg-gradient-to-r from-purple-700 to-indigo-700 hover:from-purple-600 hover:to-indigo-600 text-white py-2 rounded-xl text-[11px] font-semibold border border-purple-400/40 shadow-md shadow-purple-950/50">
              <Check class="w-3.5 h-3.5" /> Log
            </button>
          </div>
        </div>

        {/* Quick Suggestion Pills */}
        <div class="flex gap-1.5 overflow-x-auto no-scrollbar py-0.5">
          <button class="shrink-0 bg-[#0E1328] text-slate-300 text-[9px] px-3 py-1.5 rounded-2xl border border-slate-800">
            What should I eat for dinner?
          </button>
          <button class="shrink-0 bg-[#0E1328] text-slate-300 text-[9px] px-3 py-1.5 rounded-2xl border border-slate-800">
            How are my calorie
          </button>
        </div>
      </div>

      {/* Input bar */}
      <div class="relative z-10 space-y-1 mt-2">
        <p class="text-[7.5px] text-slate-500 text-center">
          AI-generated guidance, not medical advice. Confirm logs before saving.
        </p>

        <div class="bg-[#090D1F] border border-purple-500/30 rounded-2xl p-2 px-3 flex items-center justify-between shadow-inner">
          <div class="flex items-center gap-2 text-slate-400 text-[9.5px]">
            <div class="w-5 h-5 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
              <ImageIcon class="w-3 h-3" />
            </div>
            <span>Log food, scan a meal, or ask why...</span>
          </div>
          <button class="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-300 flex items-center justify-center">
            <Mic class="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
}

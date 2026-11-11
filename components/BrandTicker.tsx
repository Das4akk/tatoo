'use client';

import React from 'react';

const ITEMS = [
  'АВТОРСКАЯ БОТАНИКА',
  'FINE LINE 0.20-0.25 MM',
  'СТЕРИЛЬНОСТЬ КЛАССА A',
  'АНАТОМИЧЕСКАЯ ПОСАДКА',
  'БЕЗ СИНЕВЫ И РАСПЛЫВАНИЯ',
  'ПРИВАТНЫЕ КАБИНЕТЫ',
  'СКАНДИНАВСКАЯ ЭСТЕТИКА',
  'ВЕГАНСКИЙ ГРАФИТОВЫЙ ПИГМЕНТ',
];

export default function BrandTicker() {
  return (
    <div className="py-4 bg-[#1C201D] text-[#FBFBFA] border-y border-[#333834] overflow-hidden select-none">
      <div className="flex w-max animate-marquee space-x-10 text-xs font-mono tracking-[0.25em] uppercase">
        {ITEMS.concat(ITEMS).map((item, index) => (
          <div key={index} className="flex items-center space-x-6">
            <span className="opacity-90">{item}</span>
            <span className="text-[#7F9A8A] opacity-60">•</span>
          </div>
        ))}
      </div>
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ANATOMY_ZONES, PORTFOLIO_ITEMS, AnatomyZone } from '@/lib/studioData';
import { Compass, Sparkles, Activity, ShieldAlert, Clock, ArrowRight } from 'lucide-react';

export default function AnatomyGuide() {
  const [selectedZoneId, setSelectedZoneId] = useState<string>('forearm');

  const currentZone = ANATOMY_ZONES.find((z) => z.id === selectedZoneId) || ANATOMY_ZONES[0];
  const matchedWork = PORTFOLIO_ITEMS.find((item) => item.id === currentZone.workPreviewId);

  const handleZoneSelect = (zone: AnatomyZone) => {
    setSelectedZoneId(zone.id);
  };

  const handleBookWithZone = () => {
    const bookingEl = document.getElementById('booking');
    if (bookingEl) {
      bookingEl.scrollIntoView({ behavior: 'smooth' });
      // Notify textarea or state if possible
      const textarea = document.querySelector('textarea[name="idea"]') as HTMLTextAreaElement | null;
      if (textarea) {
        textarea.value = `Интересует татуировка на зоне: ${currentZone.name} (${currentZone.latinName}). Стиль: ${currentZone.bestStyles.join(', ')}.`;
        textarea.dispatchEvent(new Event('input', { bubbles: true }));
      }
    }
  };

  return (
    <section id="anatomy" className="py-24 bg-[#FBFBFA]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-[#DCE2DA] text-[#56675C] text-xs uppercase tracking-widest font-mono mb-4">
            <Compass className="w-3.5 h-3.5 text-[#7F9A8A]" />
            Анатомический навигатор
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-[#1C201D] tracking-tight">
            Гид по расположению & карте ощущений
          </h2>
          <p className="mt-4 text-[#5A635B] text-base sm:text-lg leading-relaxed font-light">
            Каждая точка на теле обладает уникальной плотностью рецепторов, толщиной эпидермиса и биомеханикой. 
            Выберите зону, чтобы оценить порог чувствительности и рекомендации по стилям.
          </p>
        </div>

        {/* Zone Selector Buttons */}
        <div className="flex flex-wrap gap-2.5 mb-10 pb-2 border-b border-[#E6E8E2]">
          {ANATOMY_ZONES.map((zone) => {
            const isActive = zone.id === selectedZoneId;
            return (
              <button
                key={zone.id}
                type="button"
                onClick={() => handleZoneSelect(zone)}
                className={`px-5 py-3 text-xs sm:text-sm font-mono tracking-wider transition-all duration-200 border text-left flex items-center gap-2 ${
                  isActive
                    ? 'bg-[#1C201D] text-white border-[#1C201D] shadow-sm'
                    : 'bg-white text-[#5A635B] border-[#DCE2DA] hover:border-[#7F9A8A] hover:text-[#1C201D]'
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-[#7F9A8A]' : 'bg-[#DCE2DA]'}`} />
                <span>{zone.name}</span>
                <span className="text-[10px] opacity-60 hidden md:inline">({zone.painLabel})</span>
              </button>
            );
          })}
        </div>

        {/* Interactive Zone Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch bg-white border border-[#DCE2DA] p-6 sm:p-10 shadow-xs">
          {/* Left Column: Data & Specs */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono uppercase tracking-widest text-[#7F9A8A]">
                  Анатомическая область
                </span>
                <span className="text-xs font-mono italic text-[#8B9389]">
                  {currentZone.latinName}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-light text-[#1C201D] mb-4">
                {currentZone.name}
              </h3>

              <p className="text-sm sm:text-base text-[#5A635B] leading-relaxed mb-8">
                {currentZone.advice}
              </p>

              {/* Metrics Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {/* Pain Score */}
                <div className="p-4 bg-[#FBFBFA] border border-[#E6E8E2]">
                  <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#5A635B] mb-2">
                    <Activity className="w-4 h-4 text-[#7F9A8A]" />
                    Шкала ощущений
                  </div>
                  <div className="flex items-center gap-1.5 mb-1.5">
                    {[1, 2, 3, 4, 5].map((lvl) => (
                      <div
                        key={lvl}
                        className={`h-2.5 flex-1 rounded-xs transition-colors ${
                          lvl <= currentZone.painScore
                            ? currentZone.painScore >= 4
                              ? 'bg-amber-600'
                              : 'bg-[#7F9A8A]'
                            : 'bg-[#E6E8E2]'
                        }`}
                      />
                    ))}
                  </div>
                  <div className="text-xs text-[#1C201D] font-medium flex justify-between">
                    <span>{currentZone.painLabel}</span>
                    <span className="text-[#8B9389] font-mono">{currentZone.painScore} из 5</span>
                  </div>
                </div>

                {/* Healing Time */}
                <div className="p-4 bg-[#FBFBFA] border border-[#E6E8E2]">
                  <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#5A635B] mb-2">
                    <Clock className="w-4 h-4 text-[#7F9A8A]" />
                    Период эпителизации
                  </div>
                  <div className="text-xl font-light text-[#1C201D] mb-1">
                    {currentZone.healingDays}
                  </div>
                  <div className="text-xs text-[#8B9389]">
                    С пленкой Dermalize без корочек
                  </div>
                </div>

                {/* Needle spec */}
                <div className="p-4 bg-[#FBFBFA] border border-[#E6E8E2]">
                  <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#5A635B] mb-1">
                    <Sparkles className="w-4 h-4 text-[#7F9A8A]" />
                    Рекомендуемые иглы
                  </div>
                  <div className="text-sm font-medium text-[#1C201D]">
                    {currentZone.needleGauge}
                  </div>
                  <div className="text-[11px] text-[#8B9389] mt-0.5">
                    Стерильные лазерные картриджи
                  </div>
                </div>

                {/* Sun & Longevity */}
                <div className="p-4 bg-[#FBFBFA] border border-[#E6E8E2]">
                  <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#5A635B] mb-1">
                    <ShieldAlert className="w-4 h-4 text-[#7F9A8A]" />
                    Фоточувствительность к UV
                  </div>
                  <div className="text-sm font-medium text-[#1C201D]">
                    {currentZone.sunSensitivity}
                  </div>
                  <div className="text-[11px] text-[#8B9389] mt-0.5">
                    Рекомендуем SPF 50+ в сезон
                  </div>
                </div>
              </div>

              {/* Best Styles */}
              <div className="mb-6">
                <span className="text-xs font-mono uppercase tracking-wider text-[#8B9389] block mb-2">
                  Гармоничные стили для этой зоны:
                </span>
                <div className="flex flex-wrap gap-2">
                  {currentZone.bestStyles.map((style, i) => (
                    <span
                      key={i}
                      className="text-xs px-3 py-1 bg-[#F2F4F0] text-[#414E43] font-mono border border-[#DCE2DA]"
                    >
                      {style}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-[#E6E8E2]">
              <button
                type="button"
                onClick={handleBookWithZone}
                className="inline-flex items-center gap-3 px-6 py-3.5 bg-[#1C201D] text-white text-xs font-mono tracking-widest uppercase hover:bg-[#56675C] transition-colors"
              >
                <span>Обсудить эскиз на зону «{currentZone.name}»</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column: Actual Real Tattoo Photo on this Zone */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="relative aspect-[3/4] w-full border border-[#DCE2DA] overflow-hidden bg-[#F2F4F0] group">
              {matchedWork ? (
                <>
                  <Image
                    src={matchedWork.imageUrl}
                    alt={`${matchedWork.title} на зоне ${currentZone.name}`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />
                  
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1 text-[11px] font-mono text-[#1C201D] border border-black/10">
                    Пример работы студии
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <div className="text-xs font-mono text-[#7F9A8A] uppercase tracking-wider mb-1">
                      {matchedWork.styleName} • {matchedWork.artistName}
                    </div>
                    <div className="text-lg font-light tracking-wide">{matchedWork.title}</div>
                    <div className="text-xs text-white/80 font-mono mt-1">
                      Зона: {matchedWork.placement} • Время: {matchedWork.duration}
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex items-center justify-center h-full text-xs font-mono text-[#8B9389]">
                  Фото подготавливается
                </div>
              )}
            </div>
            <div className="text-center mt-3 text-[11px] font-mono text-[#8B9389]">
              Настоящая фотография работы студии Atelier Botanica
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

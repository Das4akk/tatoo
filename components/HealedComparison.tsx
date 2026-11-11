'use client';

import React, { useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import { ShieldCheck, Sparkles, MoveHorizontal, CheckCircle2 } from 'lucide-react';

export default function HealedComparison() {
  const [sliderPosition, setSliderPosition] = useState(50); // percentage 0 - 100
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const clampedPercentage = Math.min(Math.max((x / rect.width) * 100, 5), 95);
    setSliderPosition(clampedPercentage);
  }, []);

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging && e.buttons !== 1) return;
    handleMove(e.clientX);
  };

  return (
    <section className="py-24 bg-[#F4F4F0] border-y border-[#E6E8E2] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-[#DCE2DA] text-[#56675C] text-xs uppercase tracking-widest font-mono mb-4">
              <Sparkles className="w-3.5 h-3.5 text-[#7F9A8A]" />
              Стандарты долговечности
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-[#1C201D] tracking-tight">
              Свежая vs. Зажившая через 6 месяцев
            </h2>
            <p className="mt-3 text-[#5A635B] max-w-2xl text-base sm:text-lg leading-relaxed font-light">
              Главное опасение клиентов Fine Line — не расплывется ли тонкая линия со временем. 
              Потяните слайдер, чтобы увидеть реальную макросъемку пигмента в дерме.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-[#5A635B] bg-white px-4 py-2 border border-[#E6E8E2]">
            <MoveHorizontal className="w-4 h-4 text-[#7F9A8A]" />
            Передвигайте разделитель для сравнения
          </div>
        </div>

        {/* Interactive Comparison Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Slider Container */}
          <div className="lg:col-span-8">
            <div
              ref={containerRef}
              onMouseDown={() => setIsDragging(true)}
              onMouseUp={() => setIsDragging(false)}
              onMouseLeave={() => setIsDragging(false)}
              onMouseMove={handleMouseMove}
              onTouchMove={handleTouchMove}
              className="relative w-full aspect-[4/3] select-none overflow-hidden border border-[#DCE2DA] shadow-sm cursor-ew-resize bg-black"
            >
              {/* After: Healed (Base Image) */}
              <div className="absolute inset-0">
                <Image
                  src="/images/tattoo_macro_healed.jpg"
                  alt="Зажившая татуировка через 6 месяцев"
                  fill
                  sizes="(max-width: 1024px) 100vw, 66vw"
                  className="object-cover"
                  priority
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 right-4 bg-[#1C201D]/80 backdrop-blur-md text-white px-3 py-1.5 text-xs font-mono tracking-wider flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#7F9A8A]"></span>
                  6 месяцев спустя (Зажившая)
                </div>
                <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-md text-[#1C201D] text-xs px-3 py-1 font-mono border border-black/10">
                  Толщина линии: 0.28 мм • Без синевы
                </div>
              </div>

              {/* Before: Fresh (Clipped Top Layer) */}
              <div
                className="absolute inset-0 overflow-hidden"
                style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
              >
                <Image
                  src="/images/tattoo_macro_fresh.jpg"
                  alt="Свежая татуировка в день нанесения"
                  fill
                  sizes="(max-width: 1024px) 100vw, 66vw"
                  className="object-cover"
                  priority
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-[#1C201D] px-3 py-1.5 text-xs font-mono tracking-wider flex items-center gap-1.5 border border-[#DCE2DA]">
                  <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                  День 1 (После нанесения)
                </div>
                <div className="absolute bottom-4 left-4 bg-[#1C201D]/80 backdrop-blur-md text-white text-xs px-3 py-1 font-mono">
                  Естественный микрорумянец кожи
                </div>
              </div>

              {/* Divider Line */}
              <div
                className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_10px_rgba(0,0,0,0.5)] z-20 pointer-events-none"
                style={{ left: `${sliderPosition}%` }}
              >
                {/* Central Handle */}
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white text-[#1C201D] shadow-lg flex items-center justify-center border border-[#7F9A8A]">
                  <MoveHorizontal className="w-4 h-4 text-[#56675C]" />
                </div>
              </div>
            </div>

            {/* Quick Helper buttons */}
            <div className="flex items-center justify-between mt-3 text-xs font-mono text-[#5A635B]">
              <button
                type="button"
                onClick={() => setSliderPosition(90)}
                className="hover:text-[#1C201D] underline underline-offset-4 transition-colors"
              >
                Показать день сеанса
              </button>
              <span>Положение: {Math.round(sliderPosition)}%</span>
              <button
                type="button"
                onClick={() => setSliderPosition(10)}
                className="hover:text-[#1C201D] underline underline-offset-4 transition-colors"
              >
                Показать через полгода
              </button>
            </div>
          </div>

          {/* Technical Explanations Card */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white p-7 border border-[#DCE2DA] shadow-xs">
              <div className="flex items-center gap-3 text-[#56675C] mb-4">
                <ShieldCheck className="w-6 h-6 text-[#7F9A8A]" />
                <h3 className="text-lg font-medium text-[#1C201D]">Почему наши линии не текут?</h3>
              </div>

              <div className="space-y-4 text-sm text-[#5A635B] leading-relaxed">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#7F9A8A] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium text-[#1C201D] block">Глубина ровно 1.2 – 1.4 мм</span>
                    Игла входит в средний слой сосочковой дермы без повреждения подкожно-жировой клетчатки.
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#7F9A8A] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium text-[#1C201D] block">Углеродный микропигмент (США)</span>
                    Ультра-очищенный диспергированный уголь не дает синего или зеленого оттенка со временем.
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#7F9A8A] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium text-[#1C201D] block">Мембранные картриджи 0.20-0.25 мм</span>
                    Минимальная травматизация кожи гарантирует гладкое заживление без шрамов и рубцов.
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-[#E6E8E2]">
                <div className="text-xs font-mono text-[#5A635B] uppercase tracking-wider mb-2">Бесплатная коррекция</div>
                <p className="text-xs text-[#5A635B] leading-normal">
                  В течение 2 месяцев после первого сеанса мы бесплатно приглашаем вас на контрольный осмотр и микрокоррекцию при необходимости.
                </p>
              </div>
            </div>

            <div className="p-5 bg-[#EBF0E9] border border-[#CCD8C8] text-xs text-[#3C4A3F] leading-relaxed">
              <span className="font-semibold block mb-1">Совет мастера:</span>
              «Все работы на нашем сайте сфотографированы при естественном дневном свете без ретуши кожи и фильтров контрастности».
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

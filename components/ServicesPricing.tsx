'use client';

import React, { useState } from 'react';
import { SERVICES } from '@/lib/studioData';
import {
  STYLES,
  SIZES,
  TattooStyleId,
  TattooSizeId,
  calculateEstimate,
  formatPriceRange,
} from '@/lib/estimator';
import { Check, Clock, Sparkles, HelpCircle, ArrowRight, Sliders } from 'lucide-react';

interface ServicesPricingProps {
  onBookWithEstimate: (style: string, sizeDescription: string) => void;
}

export default function ServicesPricing({ onBookWithEstimate }: ServicesPricingProps) {
  // Interactive Estimator State
  const [selectedStyle, setSelectedStyle] = useState<TattooStyleId>('fine-line');
  const [selectedSize, setSelectedSize] = useState<TattooSizeId>('small');
  const [isCustomSketch, setIsCustomSketch] = useState(true);

  const estimate = calculateEstimate(selectedStyle, selectedSize, isCustomSketch);

  return (
    <section id="services" className="py-20 md:py-32 bg-[#FBFBFA] border-b border-[#E8E5DD]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-[#7F9A8A] font-semibold mb-2">
              Услуги и стоимость
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#1C201D] font-normal">
              Прозрачный подход к каждой работе
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#58615A] max-w-md font-light leading-relaxed">
            В стоимость сеанса всегда включены стерильные одноразовые расходники премиум-класса,
            индивидуальная подгонка эскиза и профессиональный заживляющий уход.
          </p>
        </div>

        {/* Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {SERVICES.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8E5DD] flex flex-col justify-between hover:shadow-sm transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between gap-4 mb-4">
                  <h3 className="font-serif text-xl text-[#1C201D] font-medium">
                    {service.title}
                  </h3>
                  <span className="px-3 py-1 rounded-full bg-[#FAF9F5] border border-[#E8E5DD] text-xs font-semibold text-[#1C201D] whitespace-nowrap">
                    {service.startingPrice}
                  </span>
                </div>

                <p className="text-xs text-[#58615A] leading-relaxed mb-6 font-light">
                  {service.description}
                </p>

                <div className="flex items-center gap-1.5 text-xs text-[#7F9A8A] font-medium mb-4">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Длительность: {service.approxDuration}</span>
                </div>

                <div className="space-y-2.5 pt-4 border-t border-[#F0ECE4]">
                  {service.includedFeatures.map((feat) => (
                    <div key={feat} className="flex items-start gap-2 text-xs text-[#58615A]">
                      <Check className="w-3.5 h-3.5 text-[#7F9A8A] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-[#F0ECE4]">
                <button
                  onClick={() =>
                    onBookWithEstimate(service.title, service.approxDuration)
                  }
                  type="button"
                  className="w-full py-2.5 rounded-full bg-[#F5F4F0] hover:bg-[#1C201D] text-[#1C201D] hover:text-white text-xs uppercase tracking-wider font-medium transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>Выбрать направление</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Tattoo Size & Style Estimator */}
        <div className="bg-[#F5F4F0] rounded-3xl p-6 sm:p-10 border border-[#E2DED5]">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-[#56675C] text-xs tracking-wider uppercase mb-3 font-medium">
              <Sliders className="w-3.5 h-3.5 text-[#7F9A8A]" />
              <span>Интерактивный расчет</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl text-[#1C201D] font-normal mb-2">
              Примерный ориентир стоимости и времени
            </h3>
            <p className="text-xs sm:text-sm text-[#58615A] font-light leading-relaxed">
              Выберите желаемое направление и размер эскиза, чтобы получить реалистичный ориентир перед записью.
              Точная сумма определяется мастером на консультации.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Controls */}
            <div className="lg:col-span-7 space-y-6">
              {/* Style selector */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#58615A] font-medium mb-3">
                  1. Желаемый художественный стиль
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {(Object.keys(STYLES) as TattooStyleId[]).map((styleKey) => {
                    const s = STYLES[styleKey];
                    const isSelected = selectedStyle === styleKey;
                    return (
                      <button
                        key={styleKey}
                        type="button"
                        onClick={() => setSelectedStyle(styleKey)}
                        className={`p-3 rounded-2xl text-left border transition-all text-xs ${
                          isSelected
                            ? 'bg-white border-[#7F9A8A] shadow-xs text-[#1C201D]'
                            : 'bg-[#FBFBFA] border-[#E8E5DD] text-[#58615A] hover:bg-white'
                        }`}
                      >
                        <span className="font-medium block mb-0.5">{s.name}</span>
                        <span className="text-[10px] text-[#838D85] block">{s.nameEn}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Size selector */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#58615A] font-medium mb-3">
                  2. Предполагаемый размер работы
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {(Object.keys(SIZES) as TattooSizeId[]).map((sizeKey) => {
                    const sz = SIZES[sizeKey];
                    const isSelected = selectedSize === sizeKey;
                    return (
                      <button
                        key={sizeKey}
                        type="button"
                        onClick={() => setSelectedSize(sizeKey)}
                        className={`p-3.5 rounded-2xl text-left border transition-all text-xs ${
                          isSelected
                            ? 'bg-white border-[#7F9A8A] shadow-xs text-[#1C201D]'
                            : 'bg-[#FBFBFA] border-[#E8E5DD] text-[#58615A] hover:bg-white'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium text-[#1C201D]">{sz.name}</span>
                          <span className="text-[11px] text-[#7F9A8A] font-mono">{sz.dimensions}</span>
                        </div>
                        <span className="text-[11px] text-[#838D85] block">
                          Рекомендуется: {sz.recommendedSessions === 1 ? '1 сеанс' : `${sz.recommendedSessions} сеанса`}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Custom Sketch checkbox */}
              <div className="pt-2">
                <label className="inline-flex items-center gap-3 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={isCustomSketch}
                    onChange={(e) => setIsCustomSketch(e.target.checked)}
                    className="w-4 h-4 rounded border-[#D8D4CA] text-[#7F9A8A] focus:ring-[#7F9A8A]"
                  />
                  <span className="text-xs text-[#1C201D]">
                    Нужна разработка индивидуального эскиза художником студии
                  </span>
                </label>
              </div>
            </div>

            {/* Calculated Estimate Box */}
            <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-[#E2DED5] shadow-xs flex flex-col justify-between h-full">
              <div>
                <div className="text-xs uppercase tracking-wider text-[#838D85] mb-2 font-medium">
                  Ориентировочный расчет
                </div>
                <div className="font-serif text-3xl sm:text-4xl text-[#1C201D] mb-4 font-normal">
                  {formatPriceRange(estimate.estimatedPriceMin, estimate.estimatedPriceMax)}
                </div>

                <div className="space-y-3 py-4 border-y border-[#F0ECE4] text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-[#838D85]">Стиль:</span>
                    <span className="font-medium text-[#1C201D]">
                      {STYLES[selectedStyle].name}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-[#838D85]">Размер:</span>
                    <span className="font-medium text-[#1C201D]">
                      {SIZES[selectedSize].name} ({SIZES[selectedSize].dimensions})
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-[#838D85]">Ориентировочное время:</span>
                    <span className="font-medium text-[#1C201D]">
                      ~ {estimate.estimatedHours} ч. ({estimate.sessions === 1 ? '1 сеанс' : `${estimate.sessions} сеанса`})
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-[#838D85]">Профессиональный уход:</span>
                    <span className="font-medium text-[#7F9A8A]">
                      {estimate.aftercareKitIncluded ? 'Включен в сеанс' : 'Доступен в студии'}
                    </span>
                  </div>
                </div>

                <p className="text-[11px] text-[#838D85] leading-relaxed mt-4 font-light">
                  * Итоговая стоимость может варьироваться в зависимости от плотности детализации и зоны нанесения (например, ребра требуют более медленного темпа).
                </p>
              </div>

              <div className="pt-6">
                <button
                  type="button"
                  onClick={() =>
                    onBookWithEstimate(
                      STYLES[selectedStyle].name,
                      `${SIZES[selectedSize].name} (${SIZES[selectedSize].dimensions})`
                    )
                  }
                  className="w-full py-3.5 rounded-full bg-[#1C201D] hover:bg-[#56675C] text-white text-xs uppercase tracking-wider font-medium transition-colors flex items-center justify-center gap-2"
                >
                  <span>Записаться с этими параметрами</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

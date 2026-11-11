'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { PORTFOLIO_ITEMS, PortfolioItem } from '@/lib/studioData';
import { X, Clock, MapPin, User, Sparkles, ArrowRight, Eye, ShieldCheck } from 'lucide-react';

interface PortfolioProps {
  onSelectWorkForBooking: (item: PortfolioItem) => void;
}

type FilterKey = 'all' | PortfolioItem['style'];

export default function Portfolio({ onSelectWorkForBooking }: PortfolioProps) {
  const [activeFilter, setActiveFilter] = useState<FilterKey>('all');
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);

  const filterTabs: { key: FilterKey; label: string }[] = [
    { key: 'all', label: 'Все работы' },
    { key: 'botanical', label: 'Ботаника' },
    { key: 'fine-line', label: 'Fine Line' },
    { key: 'minimalism', label: 'Минимализм' },
    { key: 'ornamental', label: 'Орнаментал' },
    { key: 'blackwork', label: 'Графика' },
    { key: 'japanese', label: 'Японские мотивы' },
    { key: 'abstract', label: 'Абстракция' },
  ];

  const filteredItems =
    activeFilter === 'all'
      ? PORTFOLIO_ITEMS
      : PORTFOLIO_ITEMS.filter((item) => item.style === activeFilter);

  return (
    <section id="portfolio" className="py-24 sm:py-32 bg-[#FBFBFA] border-b border-[#E6E8E2]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-[#DCE2DA] text-[#56675C] text-xs uppercase tracking-widest font-mono mb-4">
              <Sparkles className="w-3.5 h-3.5 text-[#7F9A8A]" />
              Архив избранных работ
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-[#1C201D] tracking-tight">
              Галерея воплощенных замыслов
            </h2>
          </div>
          <div className="max-w-md lg:border-l lg:border-[#DCE2DA] lg:pl-8">
            <p className="text-sm sm:text-base text-[#5A635B] font-light leading-relaxed">
              Каждый проект создается в единственном экземпляре без тиражирования. 
              Съемка сделана при мягком естественном свете без ретуши текстуры кожи.
            </p>
          </div>
        </div>

        {/* Filter Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-12 scrollbar-none" role="tablist">
          {filterTabs.map((tab) => {
            const isActive = activeFilter === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveFilter(tab.key)}
                role="tab"
                aria-selected={isActive}
                type="button"
                className={`px-4 py-2.5 text-xs font-mono uppercase tracking-wider transition-all duration-200 shrink-0 border ${
                  isActive
                    ? 'bg-[#1C201D] text-white border-[#1C201D] shadow-xs'
                    : 'bg-white border-[#DCE2DA] text-[#5A635B] hover:border-[#7F9A8A] hover:text-[#1C201D]'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Editorial Masonry / Asymmetric Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {filteredItems.map((item, index) => {
            const isFeatured = index === 0 || index === 4;
            const itemNumber = String(index + 1).padStart(2, '0');

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelectedItem(item)}
                className={`group relative text-left w-full overflow-hidden bg-[#F2F4F0] border border-[#DCE2DA] cursor-pointer transition-all duration-300 hover:border-[#7F9A8A] hover:shadow-lg focus:outline-none focus:ring-1 focus:ring-[#7F9A8A] ${
                  isFeatured ? 'aspect-[3/4.4]' : 'aspect-[3/4]'
                }`}
                aria-label={`Открыть деталь работы: ${item.title}`}
              >
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />

                {/* Subtle scrim gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1C201D]/80 via-[#1C201D]/20 to-transparent opacity-60 group-hover:opacity-85 transition-opacity duration-300" />

                {/* Top Number & Tag */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                  <span className="px-2.5 py-1 bg-white/90 backdrop-blur-md text-[10px] font-mono uppercase tracking-wider text-[#1C201D] border border-black/5">
                    {item.styleName}
                  </span>
                  <span className="font-mono text-xs text-white/90 px-2 py-0.5 bg-[#1C201D]/50 backdrop-blur-md">
                    {itemNumber}
                  </span>
                </div>

                {/* Hover Quick Action Indicator */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="px-4 py-2 bg-white/95 text-[#1C201D] text-xs font-mono tracking-wider flex items-center gap-2 border border-[#7F9A8A]">
                    <Eye className="w-3.5 h-3.5 text-[#56675C]" />
                    <span>Рассмотреть детали</span>
                  </div>
                </div>

                {/* Bottom Content */}
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="text-base sm:text-lg font-light tracking-wide mb-1 leading-snug">
                    {item.title}
                  </h3>
                  <div className="flex items-center justify-between text-xs font-mono text-white/75 pt-1 border-t border-white/15">
                    <span>{item.artistName}</span>
                    <span>{item.placement}</span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Lightbox / High-Detail Modal */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-50 bg-[#1C201D]/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200"
          onClick={() => setSelectedItem(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-work-title"
        >
          <div
            className="bg-[#FBFBFA] max-w-4xl w-full overflow-hidden border border-[#DCE2DA] shadow-2xl relative flex flex-col md:flex-row max-h-[92vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 z-20 w-10 h-10 bg-white/90 hover:bg-[#1C201D] hover:text-white text-[#1C201D] border border-[#DCE2DA] flex items-center justify-center transition-colors"
              aria-label="Закрыть просмотр"
              type="button"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left Image Pane */}
            <div className="relative w-full md:w-1/2 aspect-[3/4] md:aspect-auto min-h-[320px] md:min-h-[520px] bg-[#E8EAE6]">
              <Image
                src={selectedItem.imageUrl}
                alt={selectedItem.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-center"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-3 left-3 bg-[#1C201D]/75 backdrop-blur-md text-white text-[10px] font-mono px-2.5 py-1">
                Естественный дневной свет без фильтров
              </div>
            </div>

            {/* Right Details Pane */}
            <div className="w-full md:w-1/2 p-6 sm:p-10 flex flex-col justify-between overflow-y-auto">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#F2F4F0] border border-[#DCE2DA] text-[#56675C] text-xs font-mono uppercase tracking-wider mb-5">
                  <Sparkles className="w-3.5 h-3.5 text-[#7F9A8A]" />
                  <span>{selectedItem.styleName}</span>
                </div>

                <h3
                  id="modal-work-title"
                  className="text-2xl sm:text-3xl font-light text-[#1C201D] mb-4 tracking-tight"
                >
                  {selectedItem.title}
                </h3>

                <p className="text-sm text-[#5A635B] leading-relaxed mb-6 font-light">
                  {selectedItem.description}
                </p>

                {/* Technical Specifications */}
                <div className="space-y-3.5 py-5 border-y border-[#E6E8E2] text-xs font-mono">
                  <div className="flex items-center justify-between">
                    <span className="text-[#8B9389] flex items-center gap-2">
                      <User className="w-3.5 h-3.5 text-[#7F9A8A]" /> Мастер
                    </span>
                    <span className="text-[#1C201D] font-medium">
                      {selectedItem.artistName}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-[#8B9389] flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-[#7F9A8A]" /> Анатомическая зона
                    </span>
                    <span className="text-[#1C201D] font-medium">
                      {selectedItem.placement}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-[#8B9389] flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-[#7F9A8A]" /> Время сеанса
                    </span>
                    <span className="text-[#1C201D] font-medium">
                      {selectedItem.duration}
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[#8B9389] flex items-center gap-2">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#7F9A8A]" /> Пигмент & Иглы
                    </span>
                    <span className="text-[#56675C]">
                      Carbon Black USA • 1RL 0.25mm
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-6">
                <button
                  onClick={() => {
                    onSelectWorkForBooking(selectedItem);
                    setSelectedItem(null);
                  }}
                  type="button"
                  className="w-full py-4 bg-[#1C201D] text-white text-xs font-mono uppercase tracking-widest hover:bg-[#56675C] transition-colors flex items-center justify-center gap-3"
                >
                  <span>Записаться на схожую работу</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

'use client';

import React, { useState } from 'react';
import StudioMap from './StudioMap';
import {
  Phone,
  Mail,
  Clock,
  MapPin,
  Send,
  Sparkles,
  MessageCircle,
  HelpCircle,
  Loader2,
} from 'lucide-react';

export default function ContactsSection() {
  const [conciergeQuery, setConciergeQuery] = useState('');
  const [conciergeAnswer, setConciergeAnswer] = useState<string | null>(null);
  const [isLoadingConcierge, setIsLoadingConcierge] = useState(false);

  const sampleQuestions = [
    'Как быстрее дойти от метро Невский Проспект?',
    'Где лучше припарковать автомобиль?',
    'Как подготовиться к сеансу татуировки?',
  ];

  const handleAskConcierge = async (queryText: string) => {
    const q = queryText || conciergeQuery;
    if (!q.trim()) return;

    setIsLoadingConcierge(true);
    setConciergeAnswer(null);

    try {
      const res = await fetch('/api/concierge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: q }),
      });
      const data = await res.json();
      setConciergeAnswer(data.answer || 'Будем рады проконсультировать вас по телефону: +7 (812) 429-18-90.');
    } catch (err) {
      setConciergeAnswer(
        'Студия ATELIER BOTANICA расположена по адресу: Санкт-Петербург, ул. Большая Конюшенная, 19/8. Вход через арку с коваными воротами, домофон 14B, 2 этаж. Ждем вас ежедневно с 11:00 до 21:00 по предварительной записи.'
      );
    } finally {
      setIsLoadingConcierge(false);
    }
  };

  return (
    <section id="contacts" className="py-20 md:py-32 bg-[#FBFBFA]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-[#7F9A8A] font-semibold mb-2">
              Локация и визит
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#1C201D] font-normal">
              В сердце исторического Петербурга
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#58615A] max-w-md font-light leading-relaxed">
            Тихий двор-особняк в двух шагах от Спаса на Крови и ДЛТ. Уединенная камерная атмосфера без уличной суеты.
          </p>
        </div>

        {/* Studio Info Details Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {/* Address */}
          <div className="bg-white p-6 rounded-2xl border border-[#E8E5DD] flex flex-col justify-between">
            <div>
              <div className="w-9 h-9 rounded-xl bg-[#EBF1ED] flex items-center justify-center text-[#56675C] mb-4">
                <MapPin className="w-4 h-4" />
              </div>
              <span className="text-[10px] uppercase tracking-wider text-[#838D85] block mb-1">
                Адрес студии
              </span>
              <div className="text-sm font-medium text-[#1C201D] leading-snug">
                Санкт-Петербург, ул. Большая Конюшенная, 19/8
              </div>
            </div>
            <div className="text-xs text-[#58615A] pt-4 mt-4 border-t border-[#F0ECE4]">
              м. Невский Проспект (4 мин)
            </div>
          </div>

          {/* Working Hours */}
          <div className="bg-white p-6 rounded-2xl border border-[#E8E5DD] flex flex-col justify-between">
            <div>
              <div className="w-9 h-9 rounded-xl bg-[#EBF1ED] flex items-center justify-center text-[#56675C] mb-4">
                <Clock className="w-4 h-4" />
              </div>
              <span className="text-[10px] uppercase tracking-wider text-[#838D85] block mb-1">
                Часы работы
              </span>
              <div className="text-sm font-medium text-[#1C201D] leading-snug">
                Ежедневно с 11:00 до 21:00
              </div>
            </div>
            <div className="text-xs text-[#58615A] pt-4 mt-4 border-t border-[#F0ECE4]">
              Строго по предварительной записи
            </div>
          </div>

          {/* Phone */}
          <div className="bg-white p-6 rounded-2xl border border-[#E8E5DD] flex flex-col justify-between">
            <div>
              <div className="w-9 h-9 rounded-xl bg-[#EBF1ED] flex items-center justify-center text-[#56675C] mb-4">
                <Phone className="w-4 h-4" />
              </div>
              <span className="text-[10px] uppercase tracking-wider text-[#838D85] block mb-1">
                Телефон и WhatsApp
              </span>
              <a
                href="tel:+78124291890"
                className="text-sm font-medium text-[#1C201D] hover:text-[#7F9A8A] transition-colors leading-snug block"
              >
                +7 (812) 429-18-90
              </a>
            </div>
            <div className="text-xs text-[#58615A] pt-4 mt-4 border-t border-[#F0ECE4]">
              Звонки принимаются с 10:00 до 22:00
            </div>
          </div>

          {/* Telegram & Social */}
          <div className="bg-white p-6 rounded-2xl border border-[#E8E5DD] flex flex-col justify-between">
            <div>
              <div className="w-9 h-9 rounded-xl bg-[#EBF1ED] flex items-center justify-center text-[#56675C] mb-4">
                <MessageCircle className="w-4 h-4" />
              </div>
              <span className="text-[10px] uppercase tracking-wider text-[#838D85] block mb-1">
                Telegram канал & Бот
              </span>
              <a
                href="https://t.me"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-[#1C201D] hover:text-[#7F9A8A] transition-colors leading-snug block"
              >
                @atelier_botanica
              </a>
            </div>
            <div className="text-xs text-[#58615A] pt-4 mt-4 border-t border-[#F0ECE4]">
              Быстрая связь и свежие эскизы
            </div>
          </div>
        </div>

        {/* Embedded Interactive Map */}
        <div className="mb-14">
          <StudioMap />
        </div>

        {/* AI Studio Route Concierge & Visit Guide with Grounding */}
        <div className="bg-[#FAF9F5] rounded-3xl p-6 sm:p-8 border border-[#E8E5DD]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBF1ED] text-[#4F6355] text-[11px] uppercase tracking-wider mb-2 font-medium">
                <Sparkles className="w-3.5 h-3.5 text-[#7F9A8A]" />
                <span>Гид по визиту & Локация</span>
              </div>
              <h3 className="font-serif text-xl sm:text-2xl text-[#1C201D] font-normal">
                Консьерж Atelier Botanica
              </h3>
            </div>
            <span className="text-xs text-[#838D85]">
              Быстрые ответы по маршруту, парковке и подготовке к сеансу
            </span>
          </div>

          {/* Quick preset questions */}
          <div className="flex flex-wrap gap-2 mb-4">
            {sampleQuestions.map((q) => (
              <button
                key={q}
                type="button"
                onClick={() => {
                  setConciergeQuery(q);
                  handleAskConcierge(q);
                }}
                className="px-3.5 py-1.5 rounded-full bg-white border border-[#E0DCD3] hover:border-[#7F9A8A] text-xs text-[#58615A] hover:text-[#1C201D] transition-colors"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Query input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAskConcierge(conciergeQuery);
            }}
            className="flex gap-2"
          >
            <input
              type="text"
              value={conciergeQuery}
              onChange={(e) => setConciergeQuery(e.target.value)}
              placeholder="Задайте вопрос о локации или визите в студию..."
              className="flex-1 px-4 py-2.5 rounded-xl bg-white border border-[#E0DCD3] text-xs text-[#1C201D] focus:outline-none focus:ring-1 focus:ring-[#7F9A8A]"
            />
            <button
              type="submit"
              disabled={isLoadingConcierge || !conciergeQuery.trim()}
              className="px-5 py-2.5 rounded-xl bg-[#1C201D] text-white text-xs uppercase tracking-wider font-medium hover:bg-[#56675C] disabled:opacity-50 transition-colors flex items-center gap-2"
            >
              {isLoadingConcierge ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Send className="w-3.5 h-3.5 text-[#DCE7E1]" />
              )}
              <span>Спросить</span>
            </button>
          </form>

          {/* Concierge Response Box */}
          {conciergeAnswer && (
            <div className="mt-4 p-4 rounded-2xl bg-white border border-[#E8E5DD] text-xs text-[#2D312E] leading-relaxed animate-in fade-in duration-200">
              <div className="font-medium text-[#7F9A8A] mb-1 flex items-center gap-1.5">
                <Sparkles className="w-3 h-3" />
                <span>Ответ консьержа:</span>
              </div>
              <p>{conciergeAnswer}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

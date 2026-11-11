'use client';

import React from 'react';
import { ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#1C201D] text-[#E5E0D8] pt-16 pb-12 border-t border-[#2D312E]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-14 border-b border-[#2D312E]">
          {/* Studio Brand Column */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex flex-col">
              <span className="font-serif tracking-[0.18em] text-xl font-normal text-white uppercase">
                Atelier Botanica
              </span>
              <span className="text-[10px] tracking-[0.24em] text-[#8FA89B] uppercase">
                Premium Tattoo Atelier
              </span>
            </div>
            <p className="text-xs text-[#A8A49C] leading-relaxed max-w-sm font-light">
              Камерная студия художественной татуировки в Санкт-Петербурге.
              Тонкие линии, авторская ботаника, орнаментал и уважительное отношение к телу.
            </p>
            <div className="text-[11px] text-[#7A827C]">
              Медицинская стерилизация • Индивидуальные эскизы • Приватные залы
            </div>
          </div>

          {/* Navigation Column */}
          <div className="md:col-span-3 space-y-3 text-xs">
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#8FA89B] font-medium block">
              Разделы
            </span>
            <ul className="space-y-2 text-[#C8C4BC]">
              <li>
                <a href="#hero" className="hover:text-white transition-colors">Главная</a>
              </li>
              <li>
                <a href="#portfolio" className="hover:text-white transition-colors">Наши работы</a>
              </li>
              <li>
                <a href="#about" className="hover:text-white transition-colors">О студии</a>
              </li>
              <li>
                <a href="#artists" className="hover:text-white transition-colors">Мастера</a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">Услуги и цены</a>
              </li>
              <li>
                <a href="#contacts" className="hover:text-white transition-colors">Контакты и карта</a>
              </li>
            </ul>
          </div>

          {/* Contacts & Hours Column */}
          <div className="md:col-span-4 space-y-3 text-xs">
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#8FA89B] font-medium block">
              Студия в Петербурге
            </span>
            <p className="text-[#C8C4BC] leading-relaxed">
              ул. Большая Конюшенная, 19/8<br />
              Вход в арку, домофон 14B, 2 этаж
            </p>
            <p className="text-[#A8A49C]">
              Ежедневно с 11:00 до 21:00<br />
              Тел: +7 (812) 429-18-90
            </p>
            <div className="pt-2">
              <a
                href="#booking"
                className="inline-block px-4 py-2 rounded-full bg-[#2A302B] hover:bg-[#39423B] text-white text-[11px] uppercase tracking-wider font-medium transition-colors"
              >
                Онлайн-запись
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Credits & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#7A827C]">
          <div>
            © {new Date().getFullYear()} Atelier Botanica. Все права защищены. Сайт разработан для демонстрации премиального портфолио.
          </div>

          <button
            onClick={scrollToTop}
            type="button"
            className="flex items-center gap-1.5 text-[#A8A49C] hover:text-white transition-colors"
            aria-label="Вернуться к началу страницы"
          >
            <span>Наверх</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}

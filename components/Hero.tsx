'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowDownRight, ShieldCheck, Sparkles, Feather } from 'lucide-react';

interface HeroProps {
  onBookClick: () => void;
  onExploreClick: () => void;
}

export default function Hero({ onBookClick, onExploreClick }: HeroProps) {
  return (
    <section
      id="hero"
      className="relative pt-28 sm:pt-36 pb-16 md:pb-24 overflow-hidden border-b border-[#E8E5DD]"
    >
      {/* Background ambient tint */}
      <div className="absolute top-0 right-0 w-[55vw] h-[55vw] max-w-[650px] max-h-[650px] bg-[#EEF3F0] rounded-full blur-3xl -z-10 opacity-70 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column — Editorial Typography & CTA */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Studio Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EBF1ED] border border-[#D5E1D9] text-[#4F6355] text-xs tracking-wider uppercase mb-6 self-start">
              <span className="w-1.5 h-1.5 rounded-full bg-[#7F9A8A]" />
              <span>Бутик-студия художественной татуировки</span>
            </div>

            {/* Expressive Editorial Headline */}
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#1C201D] leading-[1.12] tracking-tight font-normal mb-6">
              Искусство тонких линий,{' '}
              <span className="italic font-light text-[#56675C]">
                созданное в гармонии
              </span>{' '}
              с вашим телом
            </h1>

            {/* Studio Philosophy Text */}
            <p className="text-sm sm:text-base text-[#58615A] leading-relaxed max-w-xl mb-8 font-light">
              Камерное пространство в историческом центре Петербурга. Мы создаем
              авторские татуировки в эстетике скандинавского минимализма,
              ботанической иллюстрации и деликатного орнаментала. Каждый эскиз
              разрабатывается индивидуально и существует в единственном экземпляре.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 mb-12">
              <button
                onClick={onBookClick}
                type="button"
                className="px-8 py-4 bg-[#1C201D] text-white text-xs font-mono uppercase tracking-widest hover:bg-[#56675C] transition-all duration-200 shadow-sm flex items-center gap-3"
              >
                <span>Записаться на сеанс</span>
                <ArrowDownRight className="w-4 h-4 text-[#DCE7E1]" />
              </button>

              <button
                onClick={onExploreClick}
                type="button"
                className="px-7 py-4 bg-white border border-[#DCE2DA] text-[#1C201D] text-xs font-mono uppercase tracking-widest hover:bg-[#F2F4F0] hover:border-[#7F9A8A] transition-all duration-200"
              >
                Смотреть работы
              </button>
            </div>

            {/* Key Studio Trust Credentials */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 pt-8 border-t border-[#E6E8E2] text-xs text-[#5A635B]">
              <div className="flex items-start gap-3">
                <ShieldCheck className="w-4 h-4 text-[#7F9A8A] shrink-0 mt-0.5" />
                <div>
                  <span className="font-medium text-[#1C201D] block">
                    Medical Grade
                  </span>
                  <span className="text-[#8B9389] text-[11px] leading-tight block mt-0.5">
                    Автоклав Melag B-класса & одноразовые иглы
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Sparkles className="w-4 h-4 text-[#7F9A8A] shrink-0 mt-0.5" />
                <div>
                  <span className="font-medium text-[#1C201D] block">
                    Авторский дизайн
                  </span>
                  <span className="text-[#8B9389] text-[11px] leading-tight block mt-0.5">
                    Уникальный эскиз под анатомию тела
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Feather className="w-4 h-4 text-[#7F9A8A] shrink-0 mt-0.5" />
                <div>
                  <span className="font-medium text-[#1C201D] block">
                    Fine Line 0.20 mm
                  </span>
                  <span className="text-[#8B9389] text-[11px] leading-tight block mt-0.5">
                    Не травмирует дерму, заживает за 5 дней
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column — Professional Editorial Tattoo Photography */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-[500px] lg:max-w-none">
              {/* Outer decorative card frame */}
              <div className="relative aspect-[4/5] overflow-hidden bg-[#E8E5DD] border border-[#DCE2DA] shadow-md">
                <Image
                  src="/images/hero_atelier_process.jpg"
                  alt="Процесс нанесения деликатной татуировки в Atelier Botanica"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover object-center transform hover:scale-[1.02] transition-transform duration-700 ease-out"
                  referrerPolicy="no-referrer"
                />

                {/* Subtle soft gradient scrim at bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1C201D]/75 via-transparent to-transparent pointer-events-none" />

                {/* Floating caption badge inside photo */}
                <div className="absolute bottom-5 left-5 right-5 p-4 bg-white/95 backdrop-blur-md border border-white/50 text-xs">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-[#7F9A8A] font-semibold block">
                        Editorial Studio
                      </span>
                      <span className="font-light text-[#1C201D] text-sm tracking-wide">
                        «Каждая линия на коже — продолжение вашей природы»
                      </span>
                    </div>
                    <span className="text-[11px] font-mono text-[#8B9389] hidden sm:block">
                      Est. 2021
                    </span>
                  </div>
                </div>
              </div>

              {/* Accent Floating Badge */}
              <div className="absolute -top-3 -right-3 bg-white border border-[#DCE2DA] py-2 px-3.5 shadow-xs text-xs font-mono text-[#56675C] hidden sm:flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#7F9A8A] animate-pulse" />
                <span>Приватные кабинеты</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

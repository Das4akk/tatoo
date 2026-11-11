'use client';

import React from 'react';
import Image from 'next/image';
import { Droplet, Heart, Shield, CheckCircle2 } from 'lucide-react';

export default function AboutStudio() {
  return (
    <section id="about" className="py-20 md:py-32 bg-[#FBFBFA] border-b border-[#E8E5DD]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Editorial Subheader */}
        <div className="text-xs uppercase tracking-[0.2em] text-[#7F9A8A] font-semibold mb-3">
          Философия пространства
        </div>

        {/* Editorial Title */}
        <div className="max-w-3xl mb-16">
          <h2 className="font-serif text-3xl sm:text-5xl text-[#1C201D] font-normal leading-[1.2]">
            Мы верим, что татуировка — это осознанный диалог между формой, телом и смыслом.
          </h2>
        </div>

        {/* Magazine Spread Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column — Studio Interior Image */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[3/4] rounded-3xl overflow-hidden bg-[#E8E5DD] border border-[#E0DCD3] shadow-md">
              <Image
                src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=85"
                alt="Интерьер студии Atelier Botanica в историческом центре Санкт-Петербурга"
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover object-center"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-5 left-5 right-5 text-white text-xs">
                <span className="font-serif text-base block font-normal">
                  Atelier Botanica, Санкт-Петербург
                </span>
                <span className="text-white/80 text-[11px]">
                  Исторический особняк на Большой Конюшенной
                </span>
              </div>
            </div>

            {/* Quote Callout */}
            <div className="mt-6 p-5 rounded-2xl bg-[#F5F4F0] border border-[#E8E5DD] text-xs text-[#58615A] italic leading-relaxed">
              «Татуировка не должна спорить с фигурой. Она должна ложиться на кожу так, словно была там всегда.»
            </div>
          </div>

          {/* Right Column — Narrative & The Three Pillars */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-8">
            <div className="space-y-4 text-sm sm:text-base text-[#58615A] leading-relaxed font-light">
              <p>
                Atelier Botanica родилась из стремления переосмыслить опыт посещения тату-студии.
                Мы отказались от шумных открытых залов, стереотипной брутальности и конвейерного подхода.
                Вместо этого мы создали камерное арт-пространство в эстетике скандинавского уюта
                и ботанической чистоты.
              </p>
              <p>
                Каждый сеанс проходит в закрытом приватном кабинете, где мастер работает
                только с вами. Здесь тепло, пахнет натуральным кедром и свежезаваренным чаем,
                а естественный свет из высоких арочных окон позволяет идеально чувствовать полутона и микротени.
              </p>
            </div>

            {/* Three Fundamental Standards */}
            <div className="space-y-5 pt-4">
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-[#E8E5DD]">
                <div className="w-10 h-10 rounded-xl bg-[#EBF1ED] flex items-center justify-center shrink-0 text-[#56675C]">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-base text-[#1C201D] mb-1 font-medium">
                    Бескомпромиссная стерильность
                  </h3>
                  <p className="text-xs text-[#58615A] leading-relaxed">
                    Трехступенчатая обработка инструментов в медицинском автоклаве B-класса (Melag, Германия).
                    Используются только сертифицированные одноразовые модули Kwadron и Cheyenne.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-[#E8E5DD]">
                <div className="w-10 h-10 rounded-xl bg-[#EBF1ED] flex items-center justify-center shrink-0 text-[#56675C]">
                  <Heart className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-base text-[#1C201D] mb-1 font-medium">
                    Эмпатия и бережный подход
                  </h3>
                  <p className="text-xs text-[#58615A] leading-relaxed">
                    Мы никогда не торопим вас на примерке эскиза. Пробуем несколько размеров
                    и положений трансфера, наносим мягкую гипоаллергенную анестезию при необходимости
                    и сопровождаем процесс заживления до полного восстановления.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-[#E8E5DD]">
                <div className="w-10 h-10 rounded-xl bg-[#EBF1ED] flex items-center justify-center shrink-0 text-[#56675C]">
                  <Droplet className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-base text-[#1C201D] mb-1 font-medium">
                    Органические веганские пигменты
                  </h3>
                  <p className="text-xs text-[#58615A] leading-relaxed">
                    Работаем премиальными чернилами мировых брендов (World Famous, Dynamic, Kuro Sumi).
                    Они сохраняют чистый оттенок без выцветания в синеву или зелень с годами.
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Summary Highlights */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs text-[#1C201D]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#7F9A8A]" />
                <span>Приватные кабинеты</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#7F9A8A]" />
                <span>Чайная карта и напитки</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#7F9A8A]" />
                <span>Бесплатная примерка</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

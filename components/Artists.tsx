'use client';

import React from 'react';
import Image from 'next/image';
import { ARTISTS, Artist } from '@/lib/studioData';
import { ArrowUpRight, Award, Sparkles } from 'lucide-react';

interface ArtistsProps {
  onSelectArtistForBooking: (artist: Artist) => void;
}

export default function Artists({ onSelectArtistForBooking }: ArtistsProps) {
  return (
    <section id="artists" className="py-20 md:py-28 bg-[#FAF9F6] border-b border-[#E8E5DD]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-[#7F9A8A] font-semibold mb-2">
              Резиденты студии
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#1C201D] font-normal">
              Мастера авторского стиля
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#58615A] max-w-md font-light leading-relaxed">
            Художники с академическим образованием и собственным узнаваемым почерком.
            Каждый мастер ведет клиента от первой беседы до финального заживления.
          </p>
        </div>

        {/* Master Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {ARTISTS.map((artist) => (
            <div
              key={artist.id}
              className="bg-white rounded-3xl overflow-hidden border border-[#E8E5DD] flex flex-col justify-between hover:shadow-md transition-all duration-300 group"
            >
              <div>
                {/* Master Portrait */}
                <div className="relative aspect-[4/5] bg-[#E5E1D8] overflow-hidden">
                  <Image
                    src={artist.avatarUrl}
                    alt={`Тату-мастер ${artist.name}`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover object-center group-hover:scale-103 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                  
                  {/* Experience Badge */}
                  <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-[10px] text-[#1C201D] font-medium flex items-center gap-1">
                    <Award className="w-3 h-3 text-[#7F9A8A]" />
                    <span>{artist.experience}</span>
                  </div>
                </div>

                {/* Master Info */}
                <div className="p-5 sm:p-6 space-y-3">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#7F9A8A] font-medium block mb-1">
                      {artist.role}
                    </span>
                    <h3 className="font-serif text-xl text-[#1C201D] font-medium">
                      {artist.name}
                    </h3>
                    <div className="text-xs text-[#56675C] font-normal mt-0.5">
                      {artist.specialization}
                    </div>
                  </div>

                  <p className="text-xs text-[#58615A] leading-relaxed font-light">
                    {artist.bio}
                  </p>

                  {/* Styles Badges */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {artist.styles.map((s) => (
                      <span
                        key={s}
                        className="px-2 py-0.5 rounded-md bg-[#F5F4F0] text-[10px] text-[#58615A]"
                      >
                        {s}
                      </span>
                    ))}
                  </div>

                  {/* Master Note Quote */}
                  <div className="pt-2 text-[11px] text-[#838D85] italic border-t border-[#F0ECE4]">
                    «{artist.signatureNote}»
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-5 sm:p-6 pt-0">
                <button
                  onClick={() => onSelectArtistForBooking(artist)}
                  type="button"
                  className="w-full py-2.5 rounded-full border border-[#DCD8CE] text-[#1C201D] text-xs uppercase tracking-wider font-medium hover:bg-[#1C201D] hover:text-white hover:border-[#1C201D] transition-all duration-200 flex items-center justify-center gap-1.5"
                >
                  <span>Записаться к мастеру</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

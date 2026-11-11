'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Portfolio from '@/components/Portfolio';
import AboutStudio from '@/components/AboutStudio';
import Artists from '@/components/Artists';
import ServicesPricing from '@/components/ServicesPricing';
import BrandTicker from '@/components/BrandTicker';
import HealedComparison from '@/components/HealedComparison';
import AnatomyGuide from '@/components/AnatomyGuide';
import BookingSection, { BookingPrefill } from '@/components/BookingSection';
import ContactsSection from '@/components/ContactsSection';
import Footer from '@/components/Footer';
import { PortfolioItem, Artist } from '@/lib/studioData';

export default function HomePage() {
  const [bookingPrefill, setBookingPrefill] = useState<BookingPrefill | undefined>(undefined);

  const scrollToBooking = () => {
    const el = document.getElementById('booking');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToPortfolio = () => {
    const el = document.getElementById('portfolio');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectWork = (work: PortfolioItem) => {
    setBookingPrefill({
      styleName: work.styleName,
      artistId: work.artistId,
      comment: `Хочу похожую работу как «${work.title}» (${work.placement})`,
    });
    scrollToBooking();
  };

  const handleSelectArtist = (artist: Artist) => {
    setBookingPrefill({
      artistId: artist.id,
      styleName: artist.styles[0],
      comment: `Запись к мастеру ${artist.name}`,
    });
    scrollToBooking();
  };

  const handleBookWithEstimate = (style: string, sizeDescription: string) => {
    setBookingPrefill({
      styleName: style,
      comment: `Расчет по калькулятору: направление «${style}», размер «${sizeDescription}»`,
    });
    scrollToBooking();
  };

  return (
    <div className="min-h-screen bg-[#FBFBFA] text-[#1C201D] font-sans selection:bg-[#DCE7E1] selection:text-[#1C201D]">
      {/* Fixed Header */}
      <Header onBookClick={scrollToBooking} />

      {/* Main Flow */}
      <main>
        {/* 1. Hero Screen */}
        <Hero
          onBookClick={scrollToBooking}
          onExploreClick={scrollToPortfolio}
        />

        {/* 2. Editorial Brand Values Ticker */}
        <BrandTicker />

        {/* 3. Portfolio Gallery with Lightbox */}
        <Portfolio onSelectWorkForBooking={handleSelectWork} />

        {/* 4. Interactive Fresh vs Healed 6-Month Slider */}
        <HealedComparison />

        {/* 5. Interactive Anatomy & Pain Navigator */}
        <AnatomyGuide />

        {/* 6. About Studio & Scandinavian Atmosphere */}
        <AboutStudio />

        {/* 7. Resident Artists */}
        <Artists onSelectArtistForBooking={handleSelectArtist} />

        {/* 8. Services, Packages & Price Estimator */}
        <ServicesPricing onBookWithEstimate={handleBookWithEstimate} />

        {/* 9. Online Booking Section */}
        <BookingSection
          prefill={bookingPrefill}
          onClearPrefill={() => setBookingPrefill(undefined)}
        />

        {/* 10. Contacts, Map & AI Concierge */}
        <ContactsSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

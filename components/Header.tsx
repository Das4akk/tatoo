'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

interface HeaderProps {
  onBookClick: () => void;
}

export default function Header({ onBookClick }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Главная', href: '#hero' },
    { label: 'Работы', href: '#portfolio' },
    { label: 'О студии', href: '#about' },
    { label: 'Карта тела & Боль', href: '#anatomy' },
    { label: 'Мастера', href: '#artists' },
    { label: 'Услуги & Цены', href: '#services' },
    { label: 'Контакты', href: '#contacts' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#FBFBFA]/95 backdrop-blur-md border-b border-[#E6E8E2] py-3.5 shadow-xs'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between">
        {/* Brand Mark */}
        <a
          href="#hero"
          className="group flex flex-col focus:outline-none"
          aria-label="ATELIER BOTANICA — На главную"
        >
          <span className="font-light tracking-[0.2em] text-lg sm:text-xl text-[#1C201D] group-hover:text-[#56675C] transition-colors uppercase">
            Atelier Botanica
          </span>
          <span className="text-[10px] tracking-[0.28em] text-[#838D85] uppercase -mt-0.5 font-mono">
            Tattoo Studio & Atelier
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav
          className="hidden xl:flex items-center gap-6 2xl:gap-8 text-xs font-mono tracking-wider text-[#5A635B]"
          aria-label="Основная навигация"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="whitespace-nowrap hover:text-[#1C201D] transition-colors py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#7F9A8A] hover:after:w-full after:transition-all after:duration-200"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-5">
          <a
            href="tel:+78124291890"
            className="whitespace-nowrap text-xs font-mono text-[#5A635B] hover:text-[#1C201D] tracking-wider transition-colors hidden sm:block"
          >
            +7 (812) 429-18-90
          </a>
          <button
            onClick={onBookClick}
            type="button"
            className="whitespace-nowrap inline-flex items-center gap-2 px-5 py-2.5 bg-[#1C201D] text-white text-xs font-mono tracking-widest uppercase hover:bg-[#56675C] transition-all duration-200"
          >
            <span>Записаться</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#DCE7E1]" />
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex md:hidden items-center gap-3">
          <button
            onClick={onBookClick}
            type="button"
            className="px-3.5 py-1.5 rounded-full bg-[#1C201D] text-white text-[11px] uppercase tracking-wider font-medium"
          >
            Запись
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            type="button"
            className="p-2 text-[#1C201D] hover:text-[#56675C] focus:outline-none"
            aria-label={mobileMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FBFBFA] border-b border-[#E8E5DD] px-6 py-6 shadow-xl animate-in slide-in-from-top duration-200">
          <nav className="flex flex-col space-y-4 text-sm text-[#1C201D]" aria-label="Мобильная навигация">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 border-b border-[#F0ECE4] text-[#2D312E] hover:text-[#7F9A8A] transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-3 flex flex-col gap-3">
              <a
                href="tel:+78124291890"
                className="text-xs text-[#58615A] tracking-wider"
              >
                Тел: +7 (812) 429-18-90
              </a>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onBookClick();
                }}
                type="button"
                className="w-full py-3 rounded-full bg-[#1C201D] text-white text-xs uppercase tracking-wider font-medium hover:bg-[#56675C] transition-colors text-center"
              >
                Записаться на сеанс
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

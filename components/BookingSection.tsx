'use client';

import React, { useState, useEffect } from 'react';
import { ARTISTS } from '@/lib/studioData';
import { STYLES, validateBookingForm, TattooStyleId } from '@/lib/estimator';
import {
  Calendar,
  Send,
  CheckCircle2,
  Image as ImageIcon,
  X,
  Copy,
  Check,
  Sparkles,
} from 'lucide-react';

export interface BookingPrefill {
  styleName?: string;
  artistId?: string;
  comment?: string;
}

interface BookingSectionProps {
  prefill?: BookingPrefill;
  onClearPrefill?: () => void;
}

export default function BookingSection({
  prefill,
  onClearPrefill,
}: BookingSectionProps) {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('fine-line');
  const [selectedArtist, setSelectedArtist] = useState('any');
  const [preferredDate, setPreferredDate] = useState('');
  const [comment, setComment] = useState('');
  const [sketchFile, setSketchFile] = useState<string | null>(null);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submittedBooking, setSubmittedBooking] = useState<any | null>(null);
  const [isCopied, setIsCopied] = useState(false);

  // Apply prefill if passed from portfolio or artist card
  useEffect(() => {
    if (prefill) {
      queueMicrotask(() => {
        if (prefill.styleName) {
          const found = Object.keys(STYLES).find(
            (k) =>
              STYLES[k as TattooStyleId].name.toLowerCase() ===
              prefill.styleName?.toLowerCase()
          );
          if (found) setSelectedStyle(found);
        }
        if (prefill.artistId) {
          setSelectedArtist(prefill.artistId);
        }
        if (prefill.comment) {
          setComment((prev) => (prev ? `${prev}\n${prefill.comment}` : prefill.comment || ''));
        }
      });
    }
  }, [prefill]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setSketchFile(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const validation = validateBookingForm({
      name,
      contact,
      style: selectedStyle,
      masterId: selectedArtist,
      date: preferredDate,
      comment,
    });

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setErrors({});

    const bookingRef = `AT-${Math.floor(100000 + Math.random() * 900000)}`;
    const styleLabel = STYLES[selectedStyle as TattooStyleId]?.name || selectedStyle;
    const artistLabel =
      selectedArtist === 'any'
        ? 'Свободный мастер'
        : ARTISTS.find((a) => a.id === selectedArtist)?.name || selectedArtist;

    setSubmittedBooking({
      ref: bookingRef,
      name,
      contact,
      style: styleLabel,
      artist: artistLabel,
      date: preferredDate || 'Ближайшая свободная дата',
      comment,
      hasSketch: !!sketchFile,
      timestamp: new Date().toLocaleDateString('ru-RU', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }),
    });
  };

  const handleCopySummary = () => {
    if (!submittedBooking) return;
    const summary = `Запись в Atelier Botanica\nНомер заявки: ${submittedBooking.ref}\nИмя: ${submittedBooking.name}\nКонтакт: ${submittedBooking.contact}\nНаправление: ${submittedBooking.style}\nМастер: ${submittedBooking.artist}\nДата: ${submittedBooking.date}`;
    navigator.clipboard.writeText(summary);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleReset = () => {
    setName('');
    setContact('');
    setSelectedStyle('fine-line');
    setSelectedArtist('any');
    setPreferredDate('');
    setComment('');
    setSketchFile(null);
    setSubmittedBooking(null);
    if (onClearPrefill) onClearPrefill();
  };

  return (
    <section id="booking" className="py-20 md:py-32 bg-[#FAF9F6] border-b border-[#E8E5DD]">
      <div className="max-w-4xl mx-auto px-5 sm:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBF1ED] text-[#4F6355] text-xs uppercase tracking-wider mb-3 font-medium">
            <Sparkles className="w-3.5 h-3.5 text-[#7F9A8A]" />
            <span>Индивидуальный сеанс</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl text-[#1C201D] font-normal mb-4">
            Забронировать время в студии
          </h2>
          <p className="text-xs sm:text-sm text-[#58615A] font-light leading-relaxed">
            Заполните короткую форму. Мы свяжемся с вами в Telegram или по телефону в течение 15 минут,
            чтобы обсудить идею, рассчитать точный тайминг и согласовать удобный день.
          </p>
        </div>

        {/* Prefill Banner */}
        {prefill && (prefill.styleName || prefill.artistId) && (
          <div className="mb-6 p-4 rounded-2xl bg-[#EBF1ED] border border-[#D5E1D9] flex items-center justify-between text-xs text-[#4F6355]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#7F9A8A]" />
              <span>
                Применены параметры из каталога: <strong>{prefill.styleName || ''}</strong>
                {prefill.artistId && ` (мастер: ${ARTISTS.find((a) => a.id === prefill.artistId)?.name})`}
              </span>
            </div>
            {onClearPrefill && (
              <button
                type="button"
                onClick={onClearPrefill}
                className="text-[#647E6F] hover:text-[#1C201D] font-medium"
              >
                Сбросить
              </button>
            )}
          </div>
        )}

        {/* Main Booking Form Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E8E5DD] shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Name */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#58615A] font-medium mb-1.5">
                  Ваше имя *
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Как к вам обращаться"
                  className={`w-full px-4 py-3 rounded-xl bg-[#FAF9F5] border text-xs text-[#1C201D] focus:outline-none focus:ring-1 focus:ring-[#7F9A8A] transition-colors ${
                    errors.name ? 'border-red-400 bg-red-50/30' : 'border-[#E8E5DD]'
                  }`}
                />
                {errors.name && (
                  <p className="text-[11px] text-red-500 mt-1">{errors.name}</p>
                )}
              </div>

              {/* Contact */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#58615A] font-medium mb-1.5">
                  Телефон или Telegram *
                </label>
                <input
                  type="text"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  placeholder="+7 (999) 000-00-00 или @username"
                  className={`w-full px-4 py-3 rounded-xl bg-[#FAF9F5] border text-xs text-[#1C201D] focus:outline-none focus:ring-1 focus:ring-[#7F9A8A] transition-colors ${
                    errors.contact ? 'border-red-400 bg-red-50/30' : 'border-[#E8E5DD]'
                  }`}
                />
                {errors.contact && (
                  <p className="text-[11px] text-red-500 mt-1">{errors.contact}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {/* Style Selection */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#58615A] font-medium mb-1.5">
                  Направление тату *
                </label>
                <select
                  value={selectedStyle}
                  onChange={(e) => setSelectedStyle(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#FAF9F5] border border-[#E8E5DD] text-xs text-[#1C201D] focus:outline-none focus:ring-1 focus:ring-[#7F9A8A]"
                >
                  {(Object.keys(STYLES) as TattooStyleId[]).map((key) => (
                    <option key={key} value={key}>
                      {STYLES[key].name} ({STYLES[key].nameEn})
                    </option>
                  ))}
                </select>
              </div>

              {/* Artist Selection */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#58615A] font-medium mb-1.5">
                  Предпочитаемый мастер
                </label>
                <select
                  value={selectedArtist}
                  onChange={(e) => setSelectedArtist(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#FAF9F5] border border-[#E8E5DD] text-xs text-[#1C201D] focus:outline-none focus:ring-1 focus:ring-[#7F9A8A]"
                >
                  <option value="any">Любой свободный мастер студии</option>
                  {ARTISTS.map((artist) => (
                    <option key={artist.id} value={artist.id}>
                      {artist.name} ({artist.styles[0]})
                    </option>
                  ))}
                </select>
              </div>

              {/* Preferred Date */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#58615A] font-medium mb-1.5">
                  Желаемая дата
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-[#FAF9F5] border border-[#E8E5DD] text-xs text-[#1C201D] focus:outline-none focus:ring-1 focus:ring-[#7F9A8A]"
                  />
                </div>
              </div>
            </div>

            {/* Idea Description */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#58615A] font-medium mb-1.5">
                Описание идеи или пожелания по расположению
              </label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={3}
                placeholder="Расскажите о вашей задумке, примерном размере и месте на теле (например: веточка лаванды на ключице, около 7 см)..."
                className="w-full px-4 py-3 rounded-xl bg-[#FAF9F5] border border-[#E8E5DD] text-xs text-[#1C201D] focus:outline-none focus:ring-1 focus:ring-[#7F9A8A] resize-none"
              />
            </div>

            {/* Optional Sketch / Photo Attachment */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#58615A] font-medium mb-1.5">
                Прикрепить референс или фото (необязательно)
              </label>
              {sketchFile ? (
                <div className="flex items-center gap-4 p-3 rounded-xl bg-[#F5F4F0] border border-[#E8E5DD]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={sketchFile}
                    alt="Прикрепленный референс"
                    className="w-12 h-12 object-cover rounded-lg border border-[#D8D4CA]"
                  />
                  <div className="text-xs text-[#1C201D] font-medium">
                    Изображение прикреплено к заявке
                  </div>
                  <button
                    type="button"
                    onClick={() => setSketchFile(null)}
                    className="ml-auto text-xs text-red-500 hover:text-red-700 p-1"
                    aria-label="Удалить прикрепленный файл"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <label className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-dashed border-[#D8D4CA] hover:border-[#7F9A8A] bg-[#FAF9F5] hover:bg-white text-xs text-[#58615A] cursor-pointer transition-colors">
                  <ImageIcon className="w-4 h-4 text-[#7F9A8A]" />
                  <span>Нажмите, чтобы загрузить файл с эскизом или примером</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
              )}
            </div>

            {/* Submit Action */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-4 rounded-full bg-[#1C201D] hover:bg-[#56675C] text-white text-xs sm:text-sm uppercase tracking-wider font-medium transition-all duration-200 active:scale-98 shadow-sm flex items-center justify-center gap-2"
              >
                <span>Отправить заявку на сеанс</span>
                <Send className="w-4 h-4 text-[#DCE7E1]" />
              </button>
              <p className="text-[11px] text-[#838D85] text-center mt-3 font-light">
                Нажимая кнопку, вы подтверждаете согласие на обработку контактных данных студией Atelier Botanica.
              </p>
            </div>
          </form>
        </div>
      </div>

      {/* Confirmation Modal */}
      {submittedBooking && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-[#FBFBFA] rounded-3xl max-w-lg w-full p-6 sm:p-8 border border-[#DCD8CE] shadow-2xl relative">
            <button
              onClick={() => setSubmittedBooking(null)}
              className="absolute top-5 right-5 text-[#838D85] hover:text-[#1C201D]"
              aria-label="Закрыть окно подтверждения"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-12 h-12 rounded-2xl bg-[#EBF1ED] text-[#4F6355] flex items-center justify-center mb-5">
              <CheckCircle2 className="w-6 h-6 text-[#7F9A8A]" />
            </div>

            <div className="text-xs uppercase tracking-wider text-[#7F9A8A] font-semibold mb-1">
              Заявка успешно зарегистрирована
            </div>
            <h3 className="font-serif text-2xl text-[#1C201D] mb-3 font-normal">
              Благодарим за доверие, {submittedBooking.name}
            </h3>

            <p className="text-xs text-[#58615A] leading-relaxed mb-6 font-light">
              Администратор студии свяжется с вами по контакту <strong>{submittedBooking.contact}</strong> в
              течение 15 минут для финального подтверждения и подготовки к сеансу.
            </p>

            {/* Summary card */}
            <div className="bg-white rounded-2xl p-4 border border-[#E8E5DD] space-y-2 text-xs mb-6">
              <div className="flex justify-between">
                <span className="text-[#838D85]">Номер заявки:</span>
                <span className="font-mono font-medium text-[#1C201D]">
                  {submittedBooking.ref}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#838D85]">Направление:</span>
                <span className="font-medium text-[#1C201D]">
                  {submittedBooking.style}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#838D85]">Мастер:</span>
                <span className="font-medium text-[#1C201D]">
                  {submittedBooking.artist}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#838D85]">Дата:</span>
                <span className="font-medium text-[#1C201D]">
                  {submittedBooking.date}
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={handleCopySummary}
                className="flex-1 py-3 rounded-full border border-[#DCD8CE] text-xs uppercase tracking-wider font-medium text-[#1C201D] hover:bg-[#F5F4F0] transition-colors flex items-center justify-center gap-2"
              >
                {isCopied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#7F9A8A]" />
                    <span>Скопировано</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Скопировать данные</span>
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="flex-1 py-3 rounded-full bg-[#1C201D] text-white text-xs uppercase tracking-wider font-medium hover:bg-[#56675C] transition-colors"
              >
                Отлично
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

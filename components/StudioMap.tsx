'use client';

import React, { useState, useEffect } from 'react';
import { APIProvider, Map, AdvancedMarker, Pin } from '@vis.gl/react-google-maps';
import { MapPin, Navigation, ExternalLink, Edit3, Compass, Check, AlertCircle } from 'lucide-react';

export interface StudioLocation {
  name: string;
  address: string;
  city: string;
  metro: string;
  lat: number;
  lng: number;
  landmarkNote: string;
  hours: string;
  phone: string;
}

const DEFAULT_LOCATION: StudioLocation = {
  name: 'ATELIER BOTANICA',
  address: 'ул. Большая Конюшенная, 19/8',
  city: 'Санкт-Петербург',
  metro: 'м. Невский Проспект (4 мин пешком)',
  lat: 59.938784,
  lng: 30.323121,
  landmarkNote: 'Вход в арку с коваными воротами, домофон 14B, 2 этаж, пространство 204',
  hours: 'Ежедневно с 11:00 до 21:00 (по предварительной записи)',
  phone: '+7 (812) 429-18-90',
};

export default function StudioMap() {
  const [location, setLocation] = useState<StudioLocation>(DEFAULT_LOCATION);
  const [isEditing, setIsEditing] = useState(false);
  const [quotaExceeded, setQuotaExceeded] = useState(false);
  const [mapError, setMapError] = useState<string | null>(null);

  // Form edit states
  const [editAddress, setEditAddress] = useState(DEFAULT_LOCATION.address);
  const [editLat, setEditLat] = useState(DEFAULT_LOCATION.lat.toString());
  const [editLng, setEditLng] = useState(DEFAULT_LOCATION.lng.toString());
  const [editMetro, setEditMetro] = useState(DEFAULT_LOCATION.metro);

  // Listen for quota event per google-maps-platform skill
  useEffect(() => {
    const handleQuota = () => setQuotaExceeded(true);
    window.addEventListener('gmp-quota-exceeded', handleQuota);
    return () => window.removeEventListener('gmp-quota-exceeded', handleQuota);
  }, []);

  const handleSaveLocation = (e: React.FormEvent) => {
    e.preventDefault();
    const latNum = parseFloat(editLat);
    const lngNum = parseFloat(editLng);
    if (!isNaN(latNum) && !isNaN(lngNum) && editAddress.trim()) {
      setLocation((prev) => ({
        ...prev,
        address: editAddress.trim(),
        metro: editMetro.trim(),
        lat: latNum,
        lng: lngNum,
      }));
      setIsEditing(false);
    }
  };

  const apiKey =
    process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ||
    process.env.GOOGLE_MAPS_API_KEY ||
    '';

  const yandexRouteUrl = `https://yandex.ru/maps/?rtext=~${location.lat},${location.lng}&rtt=auto`;
  const googleRouteUrl = `https://www.google.com/maps/dir/?api=1&destination=${location.lat},${location.lng}`;
  const dgisRouteUrl = `https://2gis.ru/routeSearch/rsType/car/to/${location.lng},${location.lat}`;

  return (
    <div className="relative w-full rounded-2xl overflow-hidden border border-[#E8E5DD] bg-white shadow-sm">
      {/* Demo Location Notice */}
      <div className="bg-[#FAF9F5] border-b border-[#E8E5DD] px-5 py-3 flex flex-wrap items-center justify-between gap-3 text-xs text-[#58615A]">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-[#7F9A8A]" />
          <span className="font-medium text-[#1C201D]">Демонстрационные координаты:</span>
          <span>{location.city}, {location.address}</span>
          <span className="text-[#838D85]">({location.lat.toFixed(4)}, {location.lng.toFixed(4)})</span>
        </div>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="inline-flex items-center gap-1.5 text-[#56675C] hover:text-[#1C201D] font-medium transition-colors"
          type="button"
          aria-label="Настроить адрес и координаты"
        >
          <Edit3 className="w-3.5 h-3.5" />
          <span>{isEditing ? 'Скрыть настройку' : 'Изменить адрес'}</span>
        </button>
      </div>

      {/* Quota defense banner per google-maps-platform skill */}
      {quotaExceeded && (
        <div className="bg-amber-50 border-b border-amber-200 text-amber-900 px-4 py-2.5 text-xs text-center">
          <span>
            Google Maps Platform quota reached. If you are the app owner, visit{' '}
            <a
              href="https://developers.google.com/maps/ai/ai-studio?utm_campaign=gmp_mcp_codeassist_v1_aistudio#quota_exceeded_errors"
              target="_blank"
              rel="noopener noreferrer"
              className="underline font-semibold text-amber-950 hover:text-amber-800"
            >
              maps developer site
            </a>{' '}
            for instructions to update your account.
          </span>
        </div>
      )}

      {/* Edit Form Modal/Drawer */}
      {isEditing && (
        <form
          onSubmit={handleSaveLocation}
          className="p-5 bg-[#F5F4F0] border-b border-[#E8E5DD] text-xs space-y-3 animate-in fade-in duration-200"
        >
          <div className="font-medium text-[#1C201D] text-sm">
            Настройка локации для демонстрации клиенту
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            <div>
              <label className="block text-[#58615A] mb-1">Адрес студии</label>
              <input
                type="text"
                value={editAddress}
                onChange={(e) => setEditAddress(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-[#D8D4CA] rounded-lg text-xs text-[#1C201D] focus:outline-none focus:ring-1 focus:ring-[#7F9A8A]"
                placeholder="ул. Большая Конюшенная, 19"
              />
            </div>
            <div>
              <label className="block text-[#58615A] mb-1">Ориентир / Метро</label>
              <input
                type="text"
                value={editMetro}
                onChange={(e) => setEditMetro(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-[#D8D4CA] rounded-lg text-xs text-[#1C201D] focus:outline-none focus:ring-1 focus:ring-[#7F9A8A]"
                placeholder="м. Невский Проспект"
              />
            </div>
            <div>
              <label className="block text-[#58615A] mb-1">Широта (Lat)</label>
              <input
                type="text"
                value={editLat}
                onChange={(e) => setEditLat(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-[#D8D4CA] rounded-lg text-xs text-[#1C201D] focus:outline-none focus:ring-1 focus:ring-[#7F9A8A]"
                placeholder="59.938784"
              />
            </div>
            <div>
              <label className="block text-[#58615A] mb-1">Долгота (Lng)</label>
              <input
                type="text"
                value={editLng}
                onChange={(e) => setEditLng(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-[#D8D4CA] rounded-lg text-xs text-[#1C201D] focus:outline-none focus:ring-1 focus:ring-[#7F9A8A]"
                placeholder="30.323121"
              />
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={() => {
                setLocation(DEFAULT_LOCATION);
                setEditAddress(DEFAULT_LOCATION.address);
                setEditLat(DEFAULT_LOCATION.lat.toString());
                setEditLng(DEFAULT_LOCATION.lng.toString());
                setEditMetro(DEFAULT_LOCATION.metro);
                setIsEditing(false);
              }}
              className="px-3 py-1.5 rounded-lg border border-[#D8D4CA] text-[#58615A] hover:bg-white transition-colors"
            >
              Сброс
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-[#7F9A8A] text-white hover:bg-[#647E6F] font-medium transition-colors"
            >
              <Check className="w-3.5 h-3.5" />
              Применить координаты
            </button>
          </div>
        </form>
      )}

      {/* Map Canvas */}
      <div className="relative w-full h-[400px] md:h-[480px] bg-[#EFECE6]">
        {apiKey ? (
          <APIProvider apiKey={apiKey} onError={(e) => setMapError(String(e))}>
            <Map
              defaultCenter={{ lat: location.lat, lng: location.lng }}
              center={{ lat: location.lat, lng: location.lng }}
              defaultZoom={16}
              mapId="DEMO_MAP_ID"
              internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
              gestureHandling="cooperative"
              disableDefaultUI={false}
              zoomControl={true}
              streetViewControl={false}
              mapTypeControl={false}
              className="w-full h-full"
            >
              <AdvancedMarker position={{ lat: location.lat, lng: location.lng }}>
                <Pin
                  background="#7F9A8A"
                  borderColor="#586B5F"
                  glyphColor="#FFFFFF"
                  scale={1.2}
                />
              </AdvancedMarker>
            </Map>
          </APIProvider>
        ) : (
          /* High-fidelity interactive embedded map iframe fallback */
          <div className="w-full h-full relative">
            <iframe
              title="Интерактивная карта студии Atelier Botanica"
              src={`https://www.openstreetmap.org/export/embed.html?bbox=${location.lng - 0.005}%2C${location.lat - 0.003}%2C${location.lng + 0.005}%2C${location.lat + 0.003}&layer=mapnik&marker=${location.lat}%2C${location.lng}`}
              className="w-full h-full border-0 filter contrast-[0.96] saturate-[0.85]"
              loading="lazy"
            />
            {/* Custom pin overlay badge */}
            <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-xl border border-[#E8E5DD] shadow-sm max-w-xs text-xs pointer-events-none">
              <div className="font-medium text-[#1C201D] flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#7F9A8A]" />
                ATELIER BOTANICA
              </div>
              <div className="text-[#58615A] mt-0.5">{location.address}</div>
            </div>
          </div>
        )}

        {/* Floating Route Action Bar */}
        <div className="absolute bottom-4 left-4 right-4 md:left-6 md:right-auto bg-white/95 backdrop-blur-md border border-[#E8E5DD] p-3 rounded-xl shadow-lg flex flex-wrap items-center gap-2 text-xs">
          <span className="font-medium text-[#1C201D] hidden sm:inline mr-1">
            Построить маршрут:
          </span>
          <a
            href={yandexRouteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#F5F4F0] hover:bg-[#EAE7DF] text-[#1C201D] font-medium transition-colors"
          >
            <Navigation className="w-3.5 h-3.5 text-[#E64646]" />
            Яндекс Карты
            <ExternalLink className="w-3 h-3 text-[#838D85]" />
          </a>
          <a
            href={googleRouteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#F5F4F0] hover:bg-[#EAE7DF] text-[#1C201D] font-medium transition-colors"
          >
            <Compass className="w-3.5 h-3.5 text-[#34A853]" />
            Google Maps
            <ExternalLink className="w-3 h-3 text-[#838D85]" />
          </a>
          <a
            href={dgisRouteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#F5F4F0] hover:bg-[#EAE7DF] text-[#1C201D] font-medium transition-colors"
          >
            <MapPin className="w-3.5 h-3.5 text-[#00A0E3]" />
            2ГИС
            <ExternalLink className="w-3 h-3 text-[#838D85]" />
          </a>
        </div>
      </div>

      {/* Landmark & Visiting details */}
      <div className="p-5 md:p-6 bg-white grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-[#58615A]">
        <div>
          <span className="text-[#838D85] uppercase tracking-wider block mb-1">
            Пешком от метро
          </span>
          <div className="text-[#1C201D] font-medium">{location.metro}</div>
        </div>
        <div>
          <span className="text-[#838D85] uppercase tracking-wider block mb-1">
            Как нас найти
          </span>
          <div className="text-[#1C201D] font-medium">{location.landmarkNote}</div>
        </div>
        <div>
          <span className="text-[#838D85] uppercase tracking-wider block mb-1">
            Парковка
          </span>
          <div className="text-[#1C201D] font-medium">
            Городская платная парковка на Большой Конюшенной и Волынском переулке.
          </div>
        </div>
      </div>
    </div>
  );
}

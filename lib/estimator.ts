export type TattooStyleId =
  | 'fine-line'
  | 'botanical'
  | 'minimalism'
  | 'blackwork'
  | 'ornamental'
  | 'japanese'
  | 'abstract';

export type TattooSizeId = 'micro' | 'small' | 'medium' | 'large' | 'project';

export interface StyleOption {
  id: TattooStyleId;
  name: string;
  nameEn: string;
  factor: number;
  description: string;
}

export interface SizeOption {
  id: TattooSizeId;
  name: string;
  dimensions: string;
  basePrice: number;
  baseHours: number;
  recommendedSessions: number;
}

export const STYLES: Record<TattooStyleId, StyleOption> = {
  'fine-line': {
    id: 'fine-line',
    name: 'Тонкие линии',
    nameEn: 'Fine Line',
    factor: 1.0,
    description: 'Изящные микролинии, ювелирная детализация и невесомая эстетика.',
  },
  botanical: {
    id: 'botanical',
    name: 'Ботаника',
    nameEn: 'Botanical',
    factor: 1.1,
    description: 'Флористика, ветви, травы и природные формы с мягкой растушевкой.',
  },
  minimalism: {
    id: 'minimalism',
    name: 'Минимализм',
    nameEn: 'Minimalism',
    factor: 0.95,
    description: 'Лаконичные символы, контуры, микротату и чистые силуэты.',
  },
  blackwork: {
    id: 'blackwork',
    name: 'Мягкий блэкворк',
    nameEn: 'Soft Blackwork',
    factor: 1.15,
    description: 'Глубокие пигменты, контрастные тени и бархатные заливки.',
  },
  ornamental: {
    id: 'ornamental',
    name: 'Орнаментал',
    nameEn: 'Ornamental',
    factor: 1.25,
    description: 'Анатомическая геометрия, мандалы и узоры по линиям тела.',
  },
  japanese: {
    id: 'japanese',
    name: 'Японские мотивы',
    nameEn: 'Japanese Touch',
    factor: 1.3,
    description: 'Волны, хризантемы, карпы и современная интерпретация традиций.',
  },
  abstract: {
    id: 'abstract',
    name: 'Абстракция',
    nameEn: 'Abstract Art',
    factor: 1.1,
    description: 'Свободные штрихи, каллиграфия и уникальный арт-дизайн.',
  },
};

export const SIZES: Record<TattooSizeId, SizeOption> = {
  micro: {
    id: 'micro',
    name: 'Миниатюра',
    dimensions: 'до 5 см',
    basePrice: 8000,
    baseHours: 1.5,
    recommendedSessions: 1,
  },
  small: {
    id: 'small',
    name: 'Небольшая',
    dimensions: '5 – 10 см',
    basePrice: 14000,
    baseHours: 2.5,
    recommendedSessions: 1,
  },
  medium: {
    id: 'medium',
    name: 'Средняя',
    dimensions: '10 – 18 см',
    basePrice: 22000,
    baseHours: 4.0,
    recommendedSessions: 1,
  },
  large: {
    id: 'large',
    name: 'Крупная',
    dimensions: '18 – 28 см',
    basePrice: 34000,
    baseHours: 5.5,
    recommendedSessions: 1,
  },
  project: {
    id: 'project',
    name: 'Масштабный проект',
    dimensions: 'от 30 см (рукав / спина)',
    basePrice: 50000,
    baseHours: 12.0,
    recommendedSessions: 2,
  },
};

export interface EstimateResult {
  estimatedPriceMin: number;
  estimatedPriceMax: number;
  estimatedHours: number;
  sessions: number;
  consultationIncluded: boolean;
  aftercareKitIncluded: boolean;
}

export function calculateEstimate(
  styleId: TattooStyleId,
  sizeId: TattooSizeId,
  isCustomSketch: boolean = true
): EstimateResult {
  const style = STYLES[styleId] || STYLES['fine-line'];
  const size = SIZES[sizeId] || SIZES.small;

  const sketchMultiplier = isCustomSketch ? 1.08 : 1.0;
  const rawBase = size.basePrice * style.factor * sketchMultiplier;

  // Round to closest 500 for elegance
  const minPrice = Math.round((rawBase * 0.95) / 500) * 500;
  const maxPrice = Math.round((rawBase * 1.15) / 500) * 500;
  const hours = Math.round(size.baseHours * style.factor * 10) / 10;

  return {
    estimatedPriceMin: minPrice,
    estimatedPriceMax: maxPrice,
    estimatedHours: hours,
    sessions: size.recommendedSessions,
    consultationIncluded: true,
    aftercareKitIncluded: minPrice >= 12000,
  };
}

export interface BookingData {
  name: string;
  contact: string;
  style: string;
  masterId?: string;
  date?: string;
  comment?: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export function validateBookingForm(data: Partial<BookingData>): ValidationResult {
  const errors: Record<string, string> = {};

  const trimmedName = (data.name || '').trim();
  if (!trimmedName) {
    errors.name = 'Пожалуйста, укажите ваше имя';
  } else if (trimmedName.length < 2) {
    errors.name = 'Имя должно содержать не менее 2 символов';
  }

  const trimmedContact = (data.contact || '').trim();
  if (!trimmedContact) {
    errors.contact = 'Укажите телефон или Telegram для связи';
  } else {
    // Validate phone or telegram handle
    const isTelegram = /^@[a-zA-Z0-9_]{4,}$/.test(trimmedContact);
    const isPhone = /^[+]?[0-9\s\-()]{7,20}$/.test(trimmedContact);
    if (!isTelegram && !isPhone && trimmedContact.length < 5) {
      errors.contact = 'Введите корректный номер телефона или ник в Telegram (@username)';
    }
  }

  if (!data.style) {
    errors.style = 'Выберите желаемый стиль или направление';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export function formatPriceRange(min: number, max: number): string {
  const fmt = (n: number) => n.toLocaleString('ru-RU');
  if (min === max) {
    return `${fmt(min)} ₽`;
  }
  return `${fmt(min)} – ${fmt(max)} ₽`;
}
